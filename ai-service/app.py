import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import face_recognition
import numpy as np
import base64
import json

app = Flask(__name__)
CORS(app)

# Directory to store face encodings
ENCODINGS_DIR = 'models/encodings'
if not os.path.exists(ENCODINGS_DIR):
    os.makedirs(ENCODINGS_DIR)

def get_face_encoding(image_data):
    # Convert base64 to image
    try:
        encoded_data = image_data.split(',')[1] if ',' in image_data else image_data
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convert BGR to RGB
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Find face locations and encodings
        face_locations = face_recognition.face_locations(rgb_img)
        if not face_locations:
            return None, "No face detected in image"
        
        face_encodings = face_recognition.face_encodings(rgb_img, face_locations)
        return face_encodings[0], None
    except Exception as e:
        return None, str(e)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "votersd-ai-service"})

@app.route('/register-face', methods=['POST'])
def register_face():
    data = request.json
    user_id = data.get('user_id')
    image_data = data.get('image') # base64 image
    
    if not user_id or not image_data:
        return jsonify({"error": "Missing user_id or image"}), 400
    
    encoding, error = get_face_encoding(image_data)
    if error:
        return jsonify({"error": error}), 400
    
    # Save encoding to file (in real app, use database)
    encoding_path = os.path.join(ENCODINGS_DIR, f"{user_id}.npy")
    np.save(encoding_path, encoding)
    
    return jsonify({"message": "Face registered successfully", "user_id": user_id})

@app.route('/verify-face', methods=['POST'])
def verify_face():
    data = request.json
    user_id = data.get('user_id')
    image_data = data.get('image')
    
    if not user_id or not image_data:
        return jsonify({"error": "Missing user_id or image"}), 400
    
    # Load registered encoding
    encoding_path = os.path.join(ENCODINGS_DIR, f"{user_id}.npy")
    if not os.path.exists(encoding_path):
        return jsonify({"error": "User face not registered"}), 404
    
    registered_encoding = np.load(encoding_path)
    
    # Get current face encoding
    current_encoding, error = get_face_encoding(image_data)
    if error:
        return jsonify({"error": error}), 400
    
    # Compare faces
    matches = face_recognition.compare_faces([registered_encoding], current_encoding, tolerance=0.6)
    face_distance = face_recognition.face_distance([registered_encoding], current_encoding)[0]
    
    match_percentage = (1 - face_distance) * 100
    
    if matches[0]:
        return jsonify({
            "verified": True, 
            "confidence": round(match_percentage, 2),
            "message": "Face verified successfully"
        })
    else:
        return jsonify({
            "verified": False, 
            "confidence": round(match_percentage, 2),
            "message": "Face match failed"
        })

@app.route('/detect-fraud', methods=['POST'])
def detect_fraud():
    # Placeholder for fraud detection logic
    # In a real app, this would use scikit-learn models
    data = request.json
    # Simple logic: check if user has voted multiple times from same IP in short period
    return jsonify({
        "fraud_detected": False,
        "risk_score": 0.1,
        "analysis": "No suspicious activity detected"
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
