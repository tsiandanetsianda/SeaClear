from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash, generate_password_hash
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import urllib.parse
import re

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'your-secret-key'  # Change this to a random secret key

login_manager = LoginManager()
login_manager.init_app(app)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['water_quality_db']
beach_collection = db['beach_data']
community_posts_collection = db['community_posts']

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

@app.route('/api/beaches', methods=['GET'])
def get_beaches():
    beaches = list(beach_collection.find({}, {'_id': 0, 'name': 1, 'is_safe': 1, 'date_sampled': 1}))
    print(f"Returning data for {len(beaches)} beaches")
    return jsonify(beaches)

@app.route('/api/beaches/<path:beach_name>')
def get_beach_data(beach_name):
    decoded_beach_name = urllib.parse.unquote(beach_name).replace('-', ' ')
    print(f"Fetching data for beach: {decoded_beach_name}")
    beach_data = beach_collection.find_one({'name': {'$regex': f'^{re.escape(decoded_beach_name)}$', '$options': 'i'}}, {'_id': 0})
    if beach_data:
        print(f"Beach data found for {decoded_beach_name}")
        return jsonify(beach_data)
    else:
        print(f"Beach not found: {decoded_beach_name}")
        return jsonify({'error': 'Beach not found'}), 404

@app.route('/api/community/posts/<path:beach_name>', methods=['GET'])
def get_community_posts(beach_name):
    try:
        decoded_beach_name = urllib.parse.unquote(beach_name)
        print(f"Fetching community posts for beach: {decoded_beach_name}")
        beach_posts = community_posts_collection.find_one({'beach_name': decoded_beach_name})
        if beach_posts:
            approved_posts = [post for post in beach_posts.get('posts', []) if post.get('status') == 'approved']
            print(f"Returning {len(approved_posts)} approved posts for {decoded_beach_name}")
            return jsonify([{
                'post_id': str(post['_id']),
                'content': post['content'],
                'author': post['author'],
                'created_at': post['created_at']
            } for post in approved_posts]), 200
        print(f"No posts found for {decoded_beach_name}")
        return jsonify([]), 200
    except Exception as e:
        print(f"Error in get_community_posts: {str(e)}")
        return jsonify({"error": "An error occurred while fetching community posts"}), 500

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
        print(f"Fetched {len(pending_posts)} pending posts")
        return jsonify(pending_posts), 200
    except Exception as e:
        print(f"Error in get_pending_posts: {str(e)}")
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
            print(f"Post {post_id} approved successfully")
            return jsonify({"message": "Post approved successfully", "status": "success"}), 200
        else:
            print(f"Post {post_id} not found or already approved")
            return jsonify({"message": "Post not found or already approved", "status": "error"}), 404
    except Exception as e:
        print(f"Error in approve_post: {str(e)}")
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
            print(f"Post {post_id} deleted successfully")
            return jsonify({"message": "Post deleted successfully", "status": "success"}), 200
        else:
            print(f"Post {post_id} not found")
            return jsonify({"message": "Post not found", "status": "error"}), 404
    except Exception as e:
        print(f"Error in disapprove_post: {str(e)}")
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
        result = community_posts_collection.update_one(
            {'beach_name': beach_name},
            {'$push': {'posts': new_post}},
            upsert=True
        )
        print(f"New post submitted for {beach_name}")
        return jsonify({"message": "Post submitted for moderation", "status": "success"}), 201
    except Exception as e:
        print(f"Error in create_community_post: {str(e)}")
        return jsonify({"message": str(e), "status": "error"}), 400

if __name__ == '__main__':
    initialize_community_posts()
    app.run(debug=True, port=5000)