from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash, generate_password_hash
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'your-secret-key'  # Change this to a secure secret key

login_manager = LoginManager()
login_manager.init_app(app)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['water_quality_db']
beach_collection = db['beach_data']
community_posts_collection = db['community_posts']
user_collection = db['users']  # Collection for storing user data

class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

# Registration route (for creating new users)
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"message": "Email and password required", "status": "error"}), 400

    # Check if user already exists
    existing_user = user_collection.find_one({'email': email})
    if existing_user:
        return jsonify({"message": "User already exists", "status": "error"}), 400

    # Create new user
    hashed_password = generate_password_hash(password)
    user_collection.insert_one({'email': email, 'password': hashed_password})
    return jsonify({"message": "User registered successfully", "status": "success"}), 201

# Login route (for authenticating users)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = user_collection.find_one({'email': email})
    
    if user and check_password_hash(user['password'], password):
        user_obj = User(str(user['_id']))
        login_user(user_obj, remember=True)
        return jsonify({"message": "Logged in successfully", "status": "success"}), 200
    return jsonify({"message": "Invalid email or password", "status": "error"}), 401

@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully", "status": "success"}), 200

# Initialize community posts collection with beach names
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

# Fetch all beaches
@app.route('/api/beaches', methods=['GET'])
def get_beaches():
    beaches = list(beach_collection.find({}, {'_id': 0, 'name': 1, 'is_safe': 1, 'date_sampled': 1}))
    return jsonify(beaches)

# Fetch a specific beach by name
@app.route('/api/beaches/<path:beach_name>', methods=['GET'])
def get_beach(beach_name):
    beach = beach_collection.find_one({'name': beach_name}, {'_id': 0})
    if beach:
        return jsonify(beach), 200
    return jsonify({"message": "Beach not found", "status": "error"}), 404

# Fetch community posts for a specific beach
@app.route('/api/community/posts/<path:beach_name>', methods=['GET'])
def get_community_posts(beach_name):
    beach_posts = community_posts_collection.find_one({'beach_name': beach_name})
    if beach_posts:
        return jsonify(beach_posts['posts']), 200
    return jsonify([]), 200

# Fetch all community posts across all beaches
@app.route('/api/community/posts', methods=['GET'])
def get_all_posts():
    try:
        all_posts = list(community_posts_collection.find({}))
        response_data = []
        for post in all_posts:
            for p in post['posts']:
                response_data.append({
                    '_id': str(p['_id']),
                    'beach_name': post['beach_name'],
                    'content': p['content'],
                    'author': p['author'],
                    'created_at': p['created_at'],
                    'status': p['status']
                })
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

# Create a new community post
@app.route('/api/community/posts', methods=['POST'])
def create_community_post():
    data = request.get_json()
    print("Received data:", data)  # Debugging statement to check received data
    
    title = data.get('title')
    category = data.get('category')
    content = data.get('content')
    author = data.get('author', 'Anonymous')

    if not title or not category or not content:
        print("Missing title, category, or content")  # Debugging statement
        return jsonify({"message": "Title, category, and content are required", "status": "error"}), 400

    new_post = {
        '_id': ObjectId(),
        'title': title,
        'category': category,
        'content': content,
        'author': author,
        'created_at': datetime.now().isoformat(),
        'status': 'approved'  # Change to 'pending' if posts need moderation
    }

    try:
        beach_post = community_posts_collection.find_one({'beach_name': category})
        if not beach_post:
            print("Creating new category document")  # Debugging statement
            community_posts_collection.insert_one({
                'beach_name': category,
                'posts': [new_post]
            })
        else:
            print("Adding post to existing category document")  # Debugging statement
            community_posts_collection.update_one(
                {'beach_name': category},
                {'$push': {'posts': new_post}}
            )

        # Convert the ObjectId to string for JSON serialization
        new_post['_id'] = str(new_post['_id'])
        return jsonify(new_post), 201
    except Exception as e:
        print("Error while creating post:", e)  # Debugging statement
        return jsonify({"message": str(e), "status": "error"}), 400


# Fetch comments for a specific post
@app.route('/api/community/posts/<post_id>/comments', methods=['GET'])
def get_post_comments(post_id):
    try:
        beach_post = community_posts_collection.find_one({'posts._id': ObjectId(post_id)}, {'posts.$': 1})
        if beach_post and beach_post.get('posts'):
            post = beach_post['posts'][0]
            return jsonify(post.get('comments', [])), 200
        return jsonify([]), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 400

# Add a comment to a specific post
@app.route('/api/community/posts/<post_id>/comments', methods=['POST'])
def add_comment_to_post(post_id):
    data = request.get_json()
    print("Received comment data:", data)  # Debugging statement to log received data
    
    # Validate that the post_id is a valid ObjectId
    try:
        post_id = ObjectId(post_id)
    except Exception as e:
        print(f"Invalid post_id format: {post_id}, error: {e}")  # Log invalid ObjectId error
        return jsonify({"message": "Invalid post ID format", "status": "error"}), 400

    # Validate content and author fields in the payload
    content = data.get('content')
    author = data.get('author', 'Anonymous')
    
    if not content:
        print("Missing comment content")  # Log missing content
        return jsonify({"message": "Comment content is required", "status": "error"}), 400

    comment = {
        '_id': ObjectId(),
        'author': author,
        'content': content,
        'created_at': datetime.now().isoformat()
    }

    try:
        result = community_posts_collection.update_one(
            {'posts._id': post_id},
            {'$push': {'posts.$.comments': comment}}
        )
        if result.modified_count:
            # Convert the ObjectId to string before returning the response
            comment['_id'] = str(comment['_id'])
            return jsonify(comment), 201
        else:
            print("Failed to add comment, no document found or modified")  # Log failure to add comment
            return jsonify({"message": "Failed to add comment", "status": "error"}), 400
    except Exception as e:
        print("Error while adding comment:", e)  # Log the exception
        return jsonify({"message": str(e), "status": "error"}), 400



# Approve a community post (Admin only)
@app.route('/api/comments/<post_id>/approve', methods=['POST'])
@login_required
def approve_comment(post_id):
    try:
        result = community_posts_collection.update_one(
            {'posts._id': ObjectId(post_id)},
            {'$set': {'posts.$.status': 'approved'}}
        )
        if result.modified_count:
            return jsonify({"message": "Post approved successfully", "status": "success"}), 200
        else:
            return jsonify({"message": "Post approval failed", "status": "error"}), 400
    except Exception as e:
        return jsonify({"message": f"Invalid post ID: {str(e)}", "status": "error"}), 400

# Disapprove a community post (Admin only)
@app.route('/api/comments/<post_id>/disapprove', methods=['POST'])
@login_required
def disapprove_comment(post_id):
    try:
        result = community_posts_collection.update_one(
            {'posts._id': ObjectId(post_id)},
            {'$set': {'posts.$.status': 'disapproved'}}
        )
        if result.modified_count:
            return jsonify({"message": "Post disapproved successfully", "status": "success"}), 200
        else:
            return jsonify({"message": "Post disapproval failed", "status": "error"}), 400
    except Exception as e:
        return jsonify({"message": f"Invalid post ID: {str(e)}", "status": "error"}), 400

# Fetch all pending comments for admin approval
@app.route('/api/comments/pending', methods=['GET'])
@login_required
def get_pending_comments():
    try:
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
    except Exception as e:
        return jsonify({"message": f"Error retrieving pending comments: {str(e)}", "status": "error"}), 500

# Delete a community post (Admin only)
@app.route('/api/community/posts/<post_id>', methods=['DELETE'])
@login_required
def delete_community_post(post_id):
    try:
        result = community_posts_collection.update_one(
            {'posts._id': ObjectId(post_id)},
            {'$pull': {'posts': {'_id': ObjectId(post_id)}}}
        )
        if result.modified_count:
            return jsonify({"message": "Post deleted successfully", "status": "success"}), 200
        return jsonify({"message": "Failed to delete post", "status": "error"}), 400
    except Exception as e:
        return jsonify({"message": f"Invalid post ID: {str(e)}", "status": "error"}), 400

if __name__ == '__main__':
    initialize_community_posts()  # Initialize the community posts collection
    app.run(debug=True, port=5000)
