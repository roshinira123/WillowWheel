import os
import jwt
import bcrypt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify

# Secret key for JWT (in production, use environment variable)
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")

# In-memory user storage (replace with database in production)
users_db = {}

# ---------------- Password Hashing ----------------
def hash_password(password):
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(password, hashed):
    """Verify a password against a hash."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

# ---------------- JWT Token Generation ----------------
def generate_token(user_id, email):
    """Generate a JWT token for authenticated user."""
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=7),  # Token expires in 7 days
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def decode_token(token):
    """Decode and verify a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# ---------------- Authentication Decorator ----------------
def token_required(f):
    """Decorator to protect routes that require authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]
        
        payload = decode_token(token)
        if not payload:
            return jsonify({'error': 'Token is invalid or expired'}), 401
        
        # Add user info to request
        request.user = payload
        return f(*args, **kwargs)
    
    return decorated

# ---------------- User Registration ----------------
def register_user(email, password, name):
    """Register a new user."""
    # Check if user already exists
    if email in users_db:
        return None, "User already exists"
    
    # Create new user
    user_id = str(len(users_db) + 1)
    hashed_pw = hash_password(password)
    
    users_db[email] = {
        'user_id': user_id,
        'email': email,
        'password': hashed_pw,
        'name': name,
        'created_at': datetime.utcnow().isoformat()
    }
    
    # Generate token
    token = generate_token(user_id, email)
    
    return {
        'user_id': user_id,
        'email': email,
        'name': name,
        'token': token
    }, None

# ---------------- User Login ----------------
def login_user(email, password):
    """Authenticate user and return token."""
    # Check if user exists
    user = users_db.get(email)
    if not user:
        return None, "Invalid email or password"
    
    # Verify password
    if not verify_password(password, user['password']):
        return None, "Invalid email or password"
    
    # Generate token
    token = generate_token(user['user_id'], email)
    
    return {
        'user_id': user['user_id'],
        'email': user['email'],
        'name': user['name'],
        'token': token
    }, None

# ---------------- Get User Info ----------------
def get_user_by_id(user_id):
    """Get user information by user ID."""
    for email, user in users_db.items():
        if user['user_id'] == user_id:
            return {
                'user_id': user['user_id'],
                'email': user['email'],
                'name': user['name']
            }
    return None