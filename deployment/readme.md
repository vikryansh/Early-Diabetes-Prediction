---
title: Early Diabetes Prediction
emoji: 🩺
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
---

# Early Diabetes Prediction API

A FastAPI-based REST API that predicts early-stage diabetes from symptom and lifestyle data. Supports 4 machine learning models.

## Models Available

| Model | Key to use |
|---|---|
| Random Forest | `random_forest` |
| Naive Bayes | `naive_bayes` |
| Logistic Regression | `logistic_regression` |
| SVM | `svm` |

## Endpoints

### `GET /`
Health check — confirms API is running and lists loaded models.

### `POST /predict`
Run a prediction.

**Request body (JSON):**
```json
{
  "model_choice": "random_forest",
  "age": 45,
  "gender": "Male",
  "polyuria": 1,
  "polydipsia": 1,
  "sudden_weight_loss": 0,
  "weakness": 1,
  "polyphagia": 0,
  "genital_thrush": 0,
  "visual_blurring": 1,
  "itching": 0,
  "irritability": 1,
  "delayed_healing": 0,
  "partial_paresis": 1,
  "muscle_stiffness": 0,
  "alopecia": 0,
  "obesity": 1
}
```

**Response:**
```json
{
  "model_used": "random_forest",
  "prediction": 1,
  "result": "Diabetes"
}
```

## Dataset

- **Source:** Early Classification Diabetes Dataset (Kaggle)
- **Size:** 520 samples, 17 features
- **Type:** Symptom and lifestyle based — no clinical lab tests required

## Tech Stack

- FastAPI + Uvicorn
- scikit-learn
- Deployed on HuggingFace Spaces (Docker SDK)