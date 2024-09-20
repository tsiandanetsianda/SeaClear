from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
import re
from pymongo import MongoClient
from datetime import datetime
from bson import json_util
import json
import random
from difflib import get_close_matches

app = Flask(__name__)
CORS(app)

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return json_util.default(obj)

app.json_encoder = CustomJSONEncoder

# MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['water_quality_db']
collection = db['beach_data']

def extract_data_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    data = []
    
    hardcoded_beaches = [
        "Bailey's Cottage Beach", "Bakoven Beach", "Beta Beach", "Big Bay Beach", "Bikini Beach",
        "Blaauwberg Beach", "Blue Waters Beach", "Broken Baths Beach", "Camps Bay Beach",
        "Cayman Beach", "Cemetery Beach", "Clifton 1st Beach", "Clifton 2nd Beach", "Clifton 3rd Beach",
        "Clifton 4th Beach", "Clovelly Beach", "Cosy Bay", "Dalebrook Beach", "Danger Beach",
        "Dappat se Gat Beach", "Dolphin Beach", "East Beach", "Fish Hoek Beach", "Fisherman's Beach",
        "Frank's Beach", "Glen Beach", "Glencairn Beach", "Gordon's Bay Beach", "Granger Bay Beach",
        "Harmony Park Beach", "Hendon Park Resort Beach", "Hout Bay Beach", "Kalk Bay Beach",
        "Klippies Bay Beach", "Kogel Bay Beach", "Llandudno Beach", "Long Beach, Kommetjie",
        "Long Beach, Simon's Town", "Macassar Beach", "Mackerel Beach", "Maiden's Cove Beach",
        "Melkbaai Beach", "Melkbosstrand Beach", "Miller's Point Beach", "Miller's Point Day Camp Area",
        "Milnerton Beach", "Milnerton Lagoon", "Milton Beach", "Misty Cliffs Beach", "Mnandi Beach",
        "Monwabisi Beach", "Mostertsbaai Beach", "Muizenberg Beach", "Nine Miles Beach", "Queen's Beach",
        "Rocklands Beach", "Rocky Beach", "Saunders' Rocks Beach", "Seaforth Beach", "Shelley Beach",
        "Silwerstroomstrand Beach", "Small Bay Beach", "Soetwater Beach", "Sonwabe Beach",
        "Spark's Bay Beach", "St James Beach", "Strand Beach", "Strandfontein Beach", "Sunrise Beach",
        "Sunset Beach, Gordon's Bay", "Sunset Beach, Milnerton", "Surfer's Corner Beach",
        "Table View Beach", "Three Anchor Bay Beach", "Water's Edge Beach", "Windmill Beach",
        "Wireless Road Beach", "Witsands Beach"
    ]
    
    sample_date = extract_sample_date(reader.pages[0].extract_text())
    
    pdf_beaches = {}
    for page in reader.pages:
        text = page.extract_text()
        matches = re.findall(r'([A-Za-z\s,\']+)\s+(\d+)\s+(\d+)\s+(\d+)', text)
        for match in matches:
            beach_name = match[0].strip()
            values = [int(match[1]), int(match[2]), int(match[3])]
            pdf_beaches[beach_name] = values
    
    # Match hardcoded beaches with PDF data
    for beach in hardcoded_beaches:
        closest_match = get_close_matches(beach, pdf_beaches.keys(), n=1, cutoff=0.6)
        if closest_match:
            matched_beach = closest_match[0]
            values = pdf_beaches[matched_beach]
            is_safe = assess_safety(values)
            
            beach_data = {
                'name': beach,
                'matched_name': matched_beach,
                'values': values,
                'date_uploaded': datetime.now(),
                'date_sampled': sample_date,
                'is_safe': is_safe
            }
            data.append(beach_data)
    
    return data



def assess_safety(values):
    max_value = max(values)
    if max_value <= 100:
        return "Excellent"
    elif max_value <= 200:
        return "Good"
    elif max_value <= 185:
        return "Sufficient"
    else:
        return "Poor"

def extract_sample_date(text):
    date_match = re.search(r'(\d{1,2}\s+[A-Za-z]{3}\s+\d{2,4})', text)
    if date_match:
        return datetime.strptime(date_match.group(1), '%d %b %y')
    return datetime.now()  # Fallback to current date if no date found

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
    beaches = list(collection.find({}, {'_id': 0, 'name': 1, 'is_safe': 1}))
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