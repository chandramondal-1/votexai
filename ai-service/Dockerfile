# Use a pre-built image that already contains dlib and face_recognition
# This avoids the memory-intensive compilation step on Render
FROM animenosekai/face-recognition:latest

WORKDIR /app

# Install only the light dependencies
# opencv-python-headless is much smaller
RUN pip install --no-cache-dir flask flask-cors opencv-python-headless scikit-learn pandas

COPY . .

EXPOSE 5001

CMD ["python", "app.py"]
