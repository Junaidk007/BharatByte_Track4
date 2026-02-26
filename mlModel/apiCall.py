from pathlib import Path
import os

from flask import Flask, jsonify, request
import joblib
import numpy as np


app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
MODEL_CANDIDATES = [
    Path(os.getenv("MODEL_PATH")) if os.getenv("MODEL_PATH") else None,
    BASE_DIR / "scheme_model.pkl",
    BASE_DIR.parent / "scheme_model.pkl",
]

model_path = next((p for p in MODEL_CANDIDATES if p and p.exists()), None)
if model_path is None:
    searched = [str(p) for p in MODEL_CANDIDATES if p]
    raise FileNotFoundError(
        f"scheme_model.pkl not found. Checked: {searched}. cwd={Path.cwd()}"
    )

model = joblib.load(model_path)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array(
        [[
            data["income"],
            data["age"],
            data["occupation"],
            data["category"],
            data["homeLoan"],
            data["agriLand"],
            data["business"],
            data["scheme_incomeLimit"],
            data["scheme_sector"],
            data["scheme_minAge"],
        ]]
    )

    probability = model.predict_proba(features)[0][1]

    return jsonify({"eligibility_score": float(probability)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)