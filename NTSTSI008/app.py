from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash, generate_password_hash
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

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
    if email in users and check_password_hash(users[email]['password'], password):
        user = User(email)
        login_user(user, remember=True)
        return jsonify({"message": "Logged in successfully", "status": "success"}), 200
    return jsonify({"message": "Invalid email or password", "status": "error"}), 401

@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully", "status": "success"}), 200

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
    return jsonify(beaches)

@app.route('/api/beaches/<path:beach_name>', methods=['GET'])
def get_beach(beach_name):
    beach = beach_collection.find_one({'name': beach_name}, {'_id': 0})
    if beach:
        return jsonify(beach), 200
    return jsonify({"message": "Beach not found", "status": "error"}), 404

@app.route('/api/community/posts/<path:beach_name>', methods=['GET'])
def get_community_posts(beach_name):
    beach_posts = community_posts_collection.find_one({'beach_name': beach_name})
    if beach_posts:
        return jsonify(beach_posts['posts']), 200
    return jsonify([]), 200

@app.route('/api/community/posts', methods=['POST'])
def create_community_post():
    data = request.get_json()
    beach_name = data.get('beachName')
    content = data.get('content')
    author = data.get('author', 'Anonymous')

    new_post = {
        'content': content,
        'author': author,
        'created_at': datetime.now().isoformat(),
        'status': 'pending'  # Set post status to 'pending' by default
    }

    beach_post = community_posts_collection.find_one({'beach_name': beach_name})
    if not beach_post:
        community_posts_collection.insert_one({
            'beach_name': beach_name,
            'posts': [new_post]
        })
        return jsonify({"message": "Post created and pending approval", "status": "success"}), 201

    community_posts_collection.update_one(
        {'beach_name': beach_name},
        {'$push': {'posts': new_post}}
    )

    return jsonify({"message": "Post added and pending approval", "status": "success"}), 201

    
    
@app.route('/api/comments/<post_id>/approve', methods=['POST'])
@login_required
def approve_comment(post_id):
    result = community_posts_collection.update_one(
        {'posts._id': ObjectId(post_id)},
        {'$set': {'posts.$.status': 'approved'}}
    )
    if result.modified_count:
        return jsonify({"message": "Post approved successfully", "status": "success"}), 200
    else:
        return jsonify({"message": "Post approval failed", "status": "error"}), 400

@app.route('/api/comments/<post_id>/disapprove', methods=['POST'])
@login_required
def disapprove_comment(post_id):
    result = community_posts_collection.update_one(
        {'posts._id': ObjectId(post_id)},
        {'$set': {'posts.$.status': 'disapproved'}}
    )
    if result.modified_count:
        return jsonify({"message": "Post disapproved successfully", "status": "success"}), 200
    else:
        return jsonify({"message": "Post disapproval failed", "status": "error"}), 400

@app.route('/api/comments/pending', methods=['GET'])
@login_required
def get_pending_comments():
    pending_posts = community_posts_collection.aggregate([
        {'$unwind': '$posts'},
        {'$match': {'posts.status': 'pending'}},
        {'$project': {
            'beach_name': 1,
            'posts.content': 1,
            'posts.author': 1,
            'posts.created_at': 1,
            'posts._id': 1
        }}
    ])
    return jsonify(list(pending_posts)), 200



if __name__ == '__main__':
    app.run(debug=True, port=5000)