from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import json
import os

app = FastAPI(title="Early Diabetes Prediction API")

# ── Load models at startup ──────────────────────────────────────────────────
MODEL_DIR = os.path.dirname(__file__)

MODELS = {}
MODEL_FILES = {
    "random_forest":      "random_forest.pkl",
    "naive_bayes":        "naive_bayes.pkl",
    "logistic_regression":"logistic_regression.pkl",
    "decision_tree":      "decision_tree.pkl",
}

for name, filename in MODEL_FILES.items():
    path = os.path.join(MODEL_DIR, filename)
    MODELS[name] = joblib.load(path)

with open(os.path.join(MODEL_DIR, "columns.json")) as f:
    TRAINING_COLUMNS = json.load(f)   # list of feature column names

# ── Request schema ──────────────────────────────────────────────────────────
class PredictionRequest(BaseModel):
    model_choice: str          # one of the four model keys above

    # demographics
    age: int
    gender: str                # "Male" or "Female"

    # symptoms (0 or 1)
    polyuria: int
    polydipsia: int
    sudden_weight_loss: int
    weakness: int
    polyphagia: int
    genital_thrush: int
    visual_blurring: int
    itching: int
    irritability: int
    delayed_healing: int
    partial_paresis: int
    muscle_stiffness: int
    alopecia: int
    obesity: int

# ── Prediction endpoint ─────────────────────────────────────────────────────
@app.post("/predict")
def predict(request: PredictionRequest):
    model_choice = request.model_choice.lower().replace(" ", "_")

    if model_choice not in MODELS:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown model '{model_choice}'. "
                   f"Valid options: {list(MODELS.keys())}"
        )

    # Build raw dict — exclude model_choice before creating DataFrame
    data = request.model_dump()
    data.pop("model_choice")

    df = pd.DataFrame([data])

    # Replicate training preprocessing: pd.get_dummies on 'gender'
    df = pd.get_dummies(df, columns=["gender"])

    # Align columns to exactly what the model was trained on
    df = df.reindex(columns=TRAINING_COLUMNS, fill_value=0)

    model = MODELS[model_choice]
    prediction = int(model.predict(df)[0])

    return {
        "model_used": model_choice,
        "prediction": prediction,           # 0 = No Diabetes, 1 = Diabetes
        "result": "Diabetes" if prediction == 1 else "No Diabetes",
    }

# ── Health check ────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "ok", "models_loaded": list(MODELS.keys())}