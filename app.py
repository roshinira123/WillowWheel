from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables (e.g., API_KEY)
load_dotenv()

from quote_engine import get_ai_quotes  # noqa: E402
from ai_helper import insurance_ai_response  # noqa: E402
from auth import register_user, login_user, get_user_by_id, token_required  # noqa: E402

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# --- Health Check ---
@app.get("/")
def home():
    return {"status": "WillowWheel backend running"}


# --- Authentication Routes ---
@app.post("/api/auth/register")
def register():
    """Register a new user."""
    data = request.json
    
    # Validate input
    email = data.get('email', '').strip()
    password = data.get('password', '')
    name = data.get('name', '').strip()
    
    if not email or not password or not name:
        return jsonify({'error': 'Email, password, and name are required'}), 400
    
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    
    # Register user
    result, error = register_user(email, password, name)
    
    if error:
        return jsonify({'error': error}), 400
    
    return jsonify({
        'message': 'Registration successful',
        'user': result
    }), 201


@app.post("/api/auth/login")
def login():
    """Login user and return token."""
    data = request.json
    
    # Validate input
    email = data.get('email', '').strip()
    password = data.get('password', '')
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    # Authenticate user
    result, error = login_user(email, password)
    
    if error:
        return jsonify({'error': error}), 401
    
    return jsonify({
        'message': 'Login successful',
        'user': result
    }), 200


@app.get("/api/auth/me")
@token_required
def get_current_user():
    """Get current user information (requires authentication)."""
    user = get_user_by_id(request.user['user_id'])
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'user': user}), 200


# --- Submit user questionnaire & return quotes ---
@app.post("/api/quotes")
@token_required  # Now requires authentication
def get_quotes():
    data = request.json
    
    # Accept survey data (answers are keyed by question ID)
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Use AI to generate tailored quotes
    quotes_payload = get_ai_quotes(data)

    # Normalize response shape for the frontend
    if isinstance(quotes_payload, dict):
        return jsonify({
            "quotes": quotes_payload.get("quotes", []),
            "analysis": quotes_payload.get("analysis"),
            "recommendations": quotes_payload.get("recommendations"),
        })
    else:
        # If a plain list was returned, keep backward compatibility
        return jsonify({"quotes": quotes_payload})


# --- AI chat assistant ---
@app.post("/api/chat")
def chat():
    msg = request.json.get("message", "")
    if not msg:
        return jsonify({"error": "No message provided"}), 400

    response = insurance_ai_response(msg)
    return jsonify({"response": response})


if __name__ == "__main__":
    print("🚀 WillowWheel API Server Starting...")
    print("📍 Authentication endpoints:")
    print("   POST /api/auth/register - Register new user")
    print("   POST /api/auth/login - Login user")
    print("   GET  /api/auth/me - Get current user")
    print("📍 Other endpoints:")
    print("   POST /api/chat - Chat with AI")
    print("   POST /api/quotes - Get insurance quotes (requires auth)")
    # Flask uses its built-in server (no uvicorn)
    app.run(host="0.0.0.0", port=5001, debug=True)