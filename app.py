from flask import Flask, request, jsonify
from flask_cors import CORS
from quote_engine import get_ai_quotes
from ai_helper import insurance_ai_response

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# --- Health Check ---
@app.get("/")
def home():
    return {"status": "WillowWheel backend running"}


# --- Submit user questionnaire & return quotes ---
@app.post("/api/quotes")
def get_quotes():
    data = request.json
    
    # Accept survey data (answers are keyed by question ID)
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Use AI to generate tailored quotes
    quotes = get_ai_quotes(data)
    return jsonify({"quotes": quotes})


# --- AI chat assistant ---
@app.post("/api/chat")
def chat():
    msg = request.json.get("message", "")
    if not msg:
        return jsonify({"error": "No message provided"}), 400

    response = insurance_ai_response(msg)
    return jsonify({"response": response})


if __name__ == "__main__":
    # Flask uses its built-in server (no uvicorn)
    app.run(host="0.0.0.0", port=5001, debug=True)

