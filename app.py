from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables (e.g., API_KEY)
load_dotenv()

from quote_engine import get_ai_quotes  # noqa: E402
from ai_helper import insurance_ai_response  # noqa: E402

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
    # Flask uses its built-in server (no uvicorn)
    app.run(host="0.0.0.0", port=5001, debug=True)

