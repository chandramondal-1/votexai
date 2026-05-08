FROM python:3.10-slim

# Install system dependencies for dlib and opencv
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install face_recognition and other dependencies
# Using --no-cache-dir to save memory during build
RUN pip install --no-cache-dir face_recognition flask flask-cors opencv-python-headless numpy scikit-learn pandas

COPY . .

EXPOSE 5001

CMD ["python", "app.py"]
