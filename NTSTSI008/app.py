from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'your-secret-key'  # Change this to a random secret key

login_manager = LoginManager()
login_manager.init_app(app)

# This should be replaced with a database in a real application
users = {
    'admin@example.com': {
        'password': generate_password_hash('admin_password')
    }
}

class User(UserMixin):
    pass

@login_manager.user_loader
def load_user(user_id):
    user = User()
    user.id = user_id
    return user

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if email in users and check_password_hash(users[email]['password'], password):
        user = User()
        user.id = email
        login_user(user)
        return jsonify({"message": "Logged in successfully", "status": "success"}), 200
    return jsonify({"message": "Invalid email or password", "status": "error"}), 401

@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully", "status": "success"}), 200

@app.route('/api/admin')
@login_required
def admin_dashboard():
    return jsonify({
        "message": "Welcome to the admin dashboard!",
        "user": current_user.id,
        "data": {
            "total_beaches": 15,  # Example data
            "updated_beaches": 10,
            "pending_updates": 5
        }
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
    
    # changes for git