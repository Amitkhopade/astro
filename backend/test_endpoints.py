import requests
import io

# Test health endpoint
try:
    response = requests.get("http://localhost:8000/api/health")
    print("Health check:", response.json())
except Exception as e:
    print("Health check failed:", e)

# Test analyze endpoint with dummy file
try:
    # Create a dummy image file
    dummy_image = io.BytesIO(b"dummy image data")
    dummy_image.name = "test.jpg"
    files = {"files": ("test.jpg", dummy_image, "image/jpeg")}
    response = requests.post("http://localhost:8000/api/analyze-birth-record", files=files)
    print("Analyze endpoint status:", response.status_code)
    if response.status_code == 200:
        print("Analyze response:", response.json())
    else:
        print("Analyze error:", response.text)
except Exception as e:
    print("Analyze failed:", e)

# Test generate kundali
try:
    data = {"name": "Test User", "date": "1990-03-15", "time": "14:30", "place": "Mumbai"}
    response = requests.post("http://localhost:8000/api/generate-kundali", json=data)
    print("Generate kundali status:", response.status_code)
    if response.status_code == 200:
        with open("test_kundali.pdf", "wb") as f:
            f.write(response.content)
        print("PDF saved as test_kundali.pdf")
    else:
        print("Generate error:", response.text)
except Exception as e:
    print("Generate failed:", e)