from flask import Flask, jsonify, request
import joblib
import numpy as np


app = Flask(__name__)
model = joblib.load("scheme_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["income"],
        data["age"],
        data["occupation"],
        data["category"],
        data["homeLoan"],
        data["agriLand"],
        data["business"],
        data["scheme_incomeLimit"],
        data["scheme_sector"],
        data["scheme_minAge"]
    ]])

    probability = model.predict_proba(features)[0][1]

    return jsonify({
        "eligibility_score": float(probability)
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)