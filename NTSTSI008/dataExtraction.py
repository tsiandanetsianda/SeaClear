from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
import re
from pymongo import MongoClient
from datetime import datetime
from bson import json_util
import json

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return json_util.default(obj)

app = Flask(__name__)
CORS(app)
app.json_encoder = CustomJSONEncoder

# MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['water_quality_db']
collection = db['beach_data']

def extract_data_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    data = []
    
    for page in reader.pages:
        text = page.extract_text()
        
        # Extract beach data using improved regex
        matches = re.findall(r'(\d+\.\s*[\w\s\'\(\)]+)(?:\s+((?:\d+|<1|\*|>150|>1500|>2419|ND|NYM|\✔)\s*)+)', text)
        
        for match in matches:
            beach_name = re.sub(r'^\d+\.\s*', '', match[0].strip())  # Remove leading number
            values = match[1].split()
            
            # Filter out any non-numeric or special values from the beach name
            beach_name = re.sub(r'\s+(?:\d+|<1|\*|>150|>1500|>2419|ND|NYM|\✔).*$', '', beach_name)
            
            enterococci_values = [parse_value(v) for v in values if v != '✔']
            is_safe = assess_safety(enterococci_values)
            
            beach_data = {
                'name': beach_name,
                'values': enterococci_values,
                'date_uploaded': datetime.now(),
                'date_sampled': extract_sample_date(text),
                'is_safe': is_safe
            }
            data.append(beach_data)
    
    return data

def parse_value(value):
    if value.isdigit():
        return int(value)
    elif value == '<1':
        return 0
    elif value in ['*', 'ND', 'NYM']:
        return None  # These values don't contribute to safety assessment
    elif value.startswith('>'):
        return int(value[1:])  # Convert '>150' to 150, etc.
    else:
        return None  # For any unexpected values

def assess_safety(values):
    numeric_values = [v for v in values if isinstance(v, (int, float))]
    if not numeric_values:
        return "Unknown"
    
    # Using the 90th percentile as per the guidelines
    percentile_90 = sorted(numeric_values)[int(len(numeric_values) * 0.9)]
    
    # Based on the "Sufficient" category in the guidelines
    # Enterococci count should be < 185 (90 percentile) for the water to be considered safe
    if percentile_90 < 185:
        return "Safe"
    else:
        return "Not Safe"

def extract_sample_date(text):
    # This function remains the same as before
    date_match = re.search(r'(\d{1,2}\s+[A-Za-z]{3}\s+\d{2})', text)
    if date_match:
        return datetime.strptime(date_match.group(1), '%d %b %y')
    return None

def extract_sample_date(text):
    date_match = re.search(r'(\d{1,2}\s+[A-Za-z]{3}\s+\d{2})', text)
    if date_match:
        # Convert to datetime object with time set to midnight
        return datetime.combine(datetime.strptime(date_match.group(1), '%d %b %y'), datetime.min.time())
    return None

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.pdf'):
        try:
            data = extract_data_from_pdf(file)
            
            if not data:
                return jsonify({'error': 'No valid data extracted from the PDF'}), 400
            
            # Insert data into MongoDB
            result = collection.insert_many(data)
            
            return jsonify({
                'message': f'Successfully uploaded and processed {len(data)} beach records',
                'inserted_ids': [str(id) for id in result.inserted_ids]
            }), 201
        except Exception as e:
            app.logger.error(f"Error during upload: {str(e)}", exc_info=True)
            return jsonify({'error': f'An error occurred: {str(e)}'}), 500
    else:
        return jsonify({'error': 'Invalid file format. Please upload a PDF.'}), 400

@app.route('/beaches', methods=['GET'])
def get_beaches():
    beaches = list(collection.find({}, {'_id': 0, 'name': 1}))
    return jsonify(beaches)

@app.route('/beach/<beach_name>', methods=['GET'])
def get_beach_data(beach_name):
    beach_data = collection.find_one({'name': beach_name}, {'_id': 0})
    if beach_data:
        return jsonify(beach_data)
    else:
        return jsonify({'error': 'Beach not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)