# 🩺 Early Diabetes Prediction

A machine learning web app that predicts early-stage diabetes risk based on symptoms and lifestyle indicators — no clinical lab tests required.

[![HuggingFace Space](https://img.shields.io/badge/🤗%20HuggingFace-Live%20Demo-blue)](https://huggingface.co/spaces/vikryansh/Early-Diabetes-Prediction)
[![GitHub](https://img.shields.io/badge/GitHub-vikryansh-black?logo=github)](https://github.com/vikryansh/Early-Diabetes-Prediction)

---

## 📌 Overview

This project trains four classification models on a symptom-based diabetes dataset (no blood tests, no clinical measurements). Users input 16 features through a web interface and get an instant prediction from their model of choice.

**Dataset:** [Early Classification of Diabetes — Kaggle](https://www.kaggle.com/datasets/andrewmvd/early-diabetes-classification)  
**Features:** Age, gender, and 15 symptom/lifestyle indicators (polyuria, polydipsia, sudden weight loss, weakness, etc.)  
**Label:** `class` → 0 (Negative) / 1 (Positive)

---

## 🤖 Model Accuracy

All models trained with `random_state=42`, 80/20 train-test split. Accuracy reported as cross-validation score.

| Model               | CV Accuracy |
|---------------------|-------------|
| Naive Bayes         | 88.08%      |
| Logistic Regression | 93.08%      |
| Decision Tree       | 96.15%      |
| **Random Forest**   | **98.08%**  |

---

## 🗂️ Project Structure

```
Early-Diabetes-Prediction/
├── notebooks/
│   ├── random_forest.ipynb
│   ├── naive_bayes.ipynb
│   ├── logistic_regression.ipynb
│   └── decision_tree.ipynb
├── deployment/
│   ├── app.py               # FastAPI backend
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── README.md            # HuggingFace Space config
│   ├── random_forest.pkl
│   ├── naive_bayes.pkl
│   ├── logistic_regression.pkl
│   ├── decision_tree.pkl
│   └── columns.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── data/
│   └── diabetes_data.csv
└── README.md
```

---

## 🚀 Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/vikryansh/Early-Diabetes-Prediction.git
cd Early-Diabetes-Prediction
```

### 2. Install dependencies

```bash
pip install fastapi uvicorn scikit-learn pandas joblib numpy
```

### 3. Start the API

```bash
cd deployment
uvicorn app:app --reload --port 8000
```

API will be live at `http://localhost:8000`

### 4. Open the frontend

Open `frontend/index.html` directly in your browser, or serve it locally:

```bash
cd frontend
python -m http.server 5500
```

Then visit `http://localhost:5500`

> **Note:** By default the frontend points to the live HuggingFace API. To use your local API, update the endpoint URL in `script.js`.

---

## 🌐 Live Demo

The backend is deployed as a Docker container on HuggingFace Spaces (FastAPI on port 7860).

👉 **[Try it live on HuggingFace](https://huggingface.co/spaces/vikryansh/Early-Diabetes-Prediction)**

---

## 🛠️ Tech Stack

- **ML:** scikit-learn, pandas, joblib
- **Backend:** FastAPI, Uvicorn
- **Deployment:** Docker, HuggingFace Spaces
- **Frontend:** HTML, CSS, JavaScript

---

## 📄 License

MIT
