from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import joblib
import os
from utils import is_blank_image

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load trained ML model
model = joblib.load("model.pkl")

@app.post("/predict")
async def predict(
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(None)  # make image optional
):
    try:
        # Save image if provided
        image_path = None
        if image:
            image_path = f"temp_{image.filename}"
            with open(image_path, "wb") as f:
                f.write(await image.read())

            # Check if image is blank/fake
            if is_blank_image(image_path):
                if image_path and os.path.exists(image_path):
                    os.remove(image_path)
                return JSONResponse(
                    content={"isFake": True, "reason": "Image is blank or fake"},
                    status_code=200
                )

        # Combine text
        full_text = f"{title} {description}"

        # Run model prediction
        result = model.predict([full_text])[0]

        # Clean up temp image
        if image_path and os.path.exists(image_path):
            os.remove(image_path)

        return {"isFake": bool(result), "reason": "Prediction successful"}

    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )
