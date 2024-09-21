from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import urllib.parse
import re
import os
from flask import send_from_directory

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'your-secret-key'  # Change this to a random secret key

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

login_manager = LoginManager()
login_manager.init_app(app)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017')  # Replace with your MongoDB URI if needed
db = client['water_quality_db']
beach_collection = db['beach_data']
community_posts_collection = db['community_posts']
general_discussions_collection = db['general_discussions']  # New collection for storing general discussions
user_collection = db['users']  # Collection for storing user data
community_reports_collection = db['community_reports']  # Collection for community reports

# User class for Flask-Login
class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

# This should be replaced with a database in a real application
users = {
    'admin@example.com': {
        'password': generate_password_hash('admin_password')
    }
}

# Initialize general discussions collection
def initialize_general_discussions():
    existing_doc = general_discussions_collection.find_one({})
    if not existing_doc:
        general_discussions_collection.insert_one({
            'discussions': []
        })
    print("General discussions collection initialized.")

# Initialize community posts collection
def initialize_community_posts():
    beaches = list(beach_collection.find({}, {'name': 1}))
    for beach in beaches:
        existing_doc = community_posts_collection.find_one({'beach_name': beach['name']})
        if not existing_doc:
            community_posts_collection.insert_one({
                'beach_name': beach['name'],
                'posts': []
            })
    print("Community posts collection initialized.")

# Helper function to convert MongoDB document to JSON serializable format
def convert_document_to_serializable(doc):
    if isinstance(doc, list):
        return [convert_document_to_serializable(item) for item in doc]
    elif isinstance(doc, dict):
        return {k: convert_document_to_serializable(v) for k, v in doc.items()}
    elif isinstance(doc, ObjectId):
        return str(doc)
    else:
        return doc

@app.route('/uploads/<path:filename>')
def serve_uploaded_file(filename):
    uploads_dir = os.path.join(app.root_path, 'uploads')
    return send_from_directory(uploads_dir, filename)


# Authentication routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(f"Login attempt for email: {email}")
    if email in users and check_password_hash(users[email]['password'], password):
        user = User(email)
        login_user(user, remember=True)
        print(f"Login successful for email: {email}")
        return jsonify({
            "message": "Logged in successfully",
            "status": "success",
            "user": {
                "email": email,
                "isAdmin": True  # Assuming all users in the users dict are admins
            }
        }), 200
    print(f"Login failed for email: {email}")
    return jsonify({"message": "Invalid email or password", "status": "error"}), 401


@app.route('/uploads/<path:filename>')
def serve_file(filename):
    return send_from_directory('uploads', filename)


@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully", "status": "success"}), 200

@app.route('/api/check-auth')
def check_auth():
    if current_user.is_authenticated:
        return jsonify({"authenticated": True, "user": current_user.id}), 200
    return jsonify({"authenticated": False}), 200

@app.route('/api/beaches', methods=['GET'])
def get_beaches():
    beaches = list(beach_collection.find({}, {'_id': 0, 'name': 1, 'is_safe': 1, 'date_sampled': 1}))
    return jsonify(beaches)


@app.route('/api/beaches/<path:beach_name>', methods=['PUT'])
def update_beach_status(beach_name):
    data = request.json
    new_status = data.get('status')
    if not new_status:
        return jsonify({'error': 'Status is required'}), 400

    decoded_beach_name = urllib.parse.unquote(beach_name)
    result = beach_collection.update_one(
        {'name': decoded_beach_name},
        {'$set': {'is_safe': new_status}}
    )

    if result.modified_count == 0:
        return jsonify({'error': 'Beach not found or status not updated'}), 404

    return jsonify({'message': 'Beach status updated successfully'}), 200


@app.route('/api/beaches/<path:beach_name>')
def get_beach_data(beach_name):
    decoded_beach_name = urllib.parse.unquote(beach_name).replace('-', ' ')
    print(f"Fetching data for beach: {decoded_beach_name}")
    beach_data = beach_collection.find_one({'name': {'$regex': f'^{re.escape(decoded_beach_name)}$', '$options': 'i'}}, {'_id': 0})
    if beach_data:
        return jsonify(beach_data)
    return jsonify({'error': 'Beach not found'}), 404


@app.route('/api/community/report', methods=['POST'])
def submit_community_report():
    print("Received report submission")
    data = request.json  # Change this to get JSON data instead of form data
    
    # Get fields from JSON data
    name = data.get('name')
    contact = data.get('contact')
    beach = data.get('beach')
    description = data.get('description')
    action = data.get('action')

    print(f"Name: {name}, Contact: {contact}, Beach: {beach}, Description: {description}, Action: {action}")

    # Validate required fields
    if not name or not contact or not beach or not description or not action:
        return jsonify({"message": "All fields are required", "status": "error"}), 400

    # Prepare report data
    report = {
        'name': name,
        'contact': contact,
        'beach': beach,
        'description': description,
        'action': action,
        'submitted_at': datetime.now().isoformat(),
        'status': 'Pending'
    }

    try:
        # Insert report into MongoDB
        community_reports_collection.insert_one(report)
        return jsonify({"message": "Report submitted successfully", "status": "success"}), 201
    except Exception as e:
        print(f"Error submitting report: {e}")
        return jsonify({"message": "Error submitting report", "status": "error"}), 500

    try:
        # Insert report into MongoDB
        community_reports_collection.insert_one(report)
        return jsonify({"message": "Report submitted successfully", "status": "success"}), 201
    except Exception as e:
        print(f"Error submitting report: {e}")
        return jsonify({"message": "Error submitting report", "status": "error"}), 500

@app.route('/api/community/reports', methods=['GET'])
@login_required
def get_community_reports():
    try:
        reports = list(community_reports_collection.find({}, {'_id': 0}))
        return jsonify(reports), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Community posts routes
@app.route('/api/community/posts/<path:beach_name>', methods=['GET'])
def get_community_posts(beach_name):
    try:
        decoded_beach_name = urllib.parse.unquote(beach_name)
        beach_posts = community_posts_collection.find_one({'beach_name': decoded_beach_name})
        if beach_posts:
            approved_posts = [post for post in beach_posts.get('posts', []) if post.get('status') == 'approved']
            return jsonify([{
                'post_id': str(post['_id']),
                'content': post['content'],
                'author': post['author'],
                'created_at': post['created_at']
            } for post in approved_posts]), 200
        return jsonify([]), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while fetching community posts"}), 500
    
    
@app.route('/api/community/reports/<report_id>/status', methods=['PUT'])
@login_required
def update_report_status(report_id):
    data = request.json
    new_status = data.get('status')
    if not new_status:
        return jsonify({'error': 'Status is required'}), 400

    try:
        result = community_reports_collection.update_one(
            {'_id': ObjectId(report_id)},
            {'$set': {'status': new_status}}
        )
        if result.modified_count == 0:
            return jsonify({'error': 'Report not found or status not updated'}), 404
        return jsonify({'message': 'Report status updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/community/reports/<report_id>', methods=['DELETE'])
@login_required
def remove_report(report_id):
    try:
        result = community_reports_collection.delete_one({'_id': ObjectId(report_id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'Report not found'}), 404
        return jsonify({'message': 'Report removed successfully'}), 200
    except Exception as e:
        print(f"Error removing report: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/community/posts/pending', methods=['GET'])
@login_required
def get_pending_posts():
    try:
        all_posts = community_posts_collection.find({})
        pending_posts = []
        for beach in all_posts:
            for post in beach.get('posts', []):
                if post.get('status', 'pending') == 'pending':
                    pending_posts.append({
                        'beach_name': beach.get('beach_name', 'Unknown Beach'),
                        'post_id': str(post['_id']),
                        'content': post.get('content', 'No content'),
                        'author': post.get('author', 'Anonymous'),
                        'created_at': post.get('created_at', 'No date')
                    })
        return jsonify(pending_posts), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while fetching pending posts"}), 500

@app.route('/api/community/posts/<post_id>/approve', methods=['POST'])
@login_required
def approve_post(post_id):
    try:
        result = community_posts_collection.update_one(
            {'posts._id': ObjectId(post_id)},
            {'$set': {'posts.$.status': 'approved'}}
        )
        if result.modified_count:
            return jsonify({"message": "Post approved successfully", "status": "success"}), 200
        return jsonify({"message": "Post not found or already approved", "status": "error"}), 404
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

@app.route('/api/community/posts/<post_id>/disapprove', methods=['POST'])
@login_required
def disapprove_post(post_id):
    try:
        result = community_posts_collection.update_one(
            {'posts._id': ObjectId(post_id)},
            {'$pull': {'posts': {'_id': ObjectId(post_id)}}}
        )
        if result.modified_count:
            return jsonify({"message": "Post deleted successfully", "status": "success"}), 200
        return jsonify({"message": "Post not found", "status": "error"}), 404
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

@app.route('/api/community/posts', methods=['POST'])
def create_community_post():
    data = request.get_json()
    beach_name = data.get('beachName')
    content = data.get('content')
    author = data.get('author', 'Anonymous')

    new_post = {
        '_id': ObjectId(),
        'beach_name': beach_name,
        'content': content,
        'author': author,
        'created_at': datetime.now().isoformat(),
        'status': 'pending'
    }

    try:
        community_posts_collection.update_one(
            {'beach_name': beach_name},
            {'$push': {'posts': new_post}},
            upsert=True
        )
        return jsonify({"message": "Post submitted for moderation", "status": "success"}), 201
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

# General discussions routes
@app.route('/api/general-discussions', methods=['GET'])
def get_all_general_discussions():
    try:
        all_discussions = general_discussions_collection.find_one({}, {'discussions': 1})
        if all_discussions and 'discussions' in all_discussions:
            serializable_discussions = convert_document_to_serializable(all_discussions['discussions'])
            return jsonify(serializable_discussions), 200
        return jsonify([]), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

@app.route('/api/general-discussions', methods=['POST'])
def create_general_discussion():
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        category = data.get('category')  # Ensure category is fetched correctly
        author = data.get('author', 'Anonymous')

        if not title or not content or not category:
            return jsonify({"message": "Title, category, and content are required", "status": "error"}), 400

        new_discussion = {
            '_id': ObjectId(),
            'title': title,
            'content': content,
            'author': author,
            'category': category,  # Include the category field
            'created_at': datetime.now().isoformat(),
            'comments': []  # Initialize an empty list of comments
        }

        general_discussions_collection.update_one(
            {},
            {'$push': {'discussions': new_discussion}},
            upsert=True
        )
        serializable_discussion = convert_document_to_serializable(new_discussion)
        return jsonify(serializable_discussion), 201
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

@app.route('/api/general-discussions/<discussion_id>/comments', methods=['POST'])
def add_comment_to_general_discussion(discussion_id):
    try:
        if not ObjectId.is_valid(discussion_id):
            return jsonify({"message": "Invalid discussion ID", "status": "error"}), 400

        data = request.get_json()
        content = data.get('content')
        author = data.get('author', 'Anonymous')

        if not content:
            return jsonify({"message": "Content is required", "status": "error"}), 400

        comment = {
            '_id': str(ObjectId()),  # Convert ObjectId to string
            'author': author,
            'content': content,
            'created_at': datetime.now().isoformat()
        }

        result = general_discussions_collection.update_one(
            {'discussions._id': ObjectId(discussion_id)},
            {'$push': {'discussions.$.comments': comment}}
        )

        if result.modified_count > 0:
            return jsonify(comment), 201  # Return the added comment with the ObjectId as a string
        else:
            return jsonify({"message": "Discussion not found", "status": "error"}), 404

    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

@app.route('/api/general-discussions/<discussion_id>/comments', methods=['GET'])
def get_general_discussion_comments(discussion_id):
    try:
        discussion = general_discussions_collection.find_one({'discussions._id': ObjectId(discussion_id)}, {'discussions.$': 1})
        if discussion:
            comments = discussion['discussions'][0]['comments']
            serializable_comments = convert_document_to_serializable(comments)
            return jsonify(serializable_comments), 200
        return jsonify([]), 404
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

@app.route('/api/general-discussions/<discussion_id>', methods=['DELETE'])
@login_required
def delete_general_discussion(discussion_id):
    try:
        result = general_discussions_collection.update_one(
            {'discussions._id': ObjectId(discussion_id)},
            {'$pull': {'discussions': {'_id': ObjectId(discussion_id)}}}
        )
        if result.modified_count > 0:
            return jsonify({"message": "Discussion deleted successfully", "status": "success"}), 200
        else:
            return jsonify({"message": "Discussion not found", "status": "error"}), 404
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

# Run the app with both initializations
if __name__ == '__main__':
    initialize_general_discussions()  # Initialize the general discussions collection
    initialize_community_posts()  # Initialize the community posts collection
    app.run(debug=True, port=5000)
