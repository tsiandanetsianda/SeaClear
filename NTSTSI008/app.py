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
comment_collection = db['beach_posts']

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

@app.route('/api/check-auth')
def check_auth():
    if current_user.is_authenticated:
        return jsonify({"authenticated": True, "user": current_user.id}), 200
    else:
        return jsonify({"authenticated": False}), 401

@app.route('/api/beaches', methods=['GET'])
def get_beaches():
    beaches = list(beach_collection.find({}, {'_id': 0, 'name': 1, 'is_safe': 1, 'date_sampled': 1}))
    print(f"Fetched {len(beaches)} beaches from the database")  # Debug print
    return jsonify(beaches)

@app.route('/api/beach/<beach_name>', methods=['GET'])
def get_beach(beach_name):
    beach = beach_collection.find_one({'name': beach_name}, {'_id': 0})
    if beach:
        return jsonify(beach), 200
    return jsonify({"message": "Beach not found", "status": "error"}), 404

@app.route('/api/comments/<beach_name>', methods=['GET'])
def get_comments(beach_name):
    comments = list(comment_collection.find({'beach_name': beach_name, 'approved': True}, {'_id': 0}))
    return jsonify(comments), 200

@app.route('/api/comments', methods=['POST'])
def submit_comment():
    data = request.get_json()
    new_comment = {
        'beach_name': data['beachName'],
        'content': data['content'],
        'author': data['author'],
        'created_at': datetime.now().isoformat(),
        'approved': False
    }
    result = comment_collection.insert_one(new_comment)
    return jsonify({"message": "Comment submitted for approval", "status": "success"}), 201

@app.route('/api/comments/pending', methods=['GET'])
@login_required
def get_pending_comments():
    pending = list(comment_collection.find({'approved': False}, {'_id': str, 'beach_name': 1, 'content': 1, 'author': 1, 'created_at': 1}))
    return jsonify(pending), 200

@app.route('/api/comments/<comment_id>/approve', methods=['POST'])
@login_required
def approve_comment(comment_id):
    result = comment_collection.update_one({'_id': ObjectId(comment_id)}, {'$set': {'approved': True}})
    if result.modified_count:
        return jsonify({"message": "Comment approved", "status": "success"}), 200
    return jsonify({"message": "Comment not found", "status": "error"}), 404

@app.route('/api/comments/<comment_id>/disapprove', methods=['POST'])
@login_required
def disapprove_comment(comment_id):
    result = comment_collection.delete_one({'_id': ObjectId(comment_id)})
    if result.deleted_count:
        return jsonify({"message": "Comment removed", "status": "success"}), 200
    return jsonify({"message": "Comment not found", "status": "error"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)