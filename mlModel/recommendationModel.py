from pathlib import Path

import joblib
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR.parent / "scheme_dataset.csv"
MODEL_PATH = BASE_DIR / "scheme_model.pkl"

data = pd.read_csv(DATA_PATH)

x = data.drop("eligible", axis=1)
y = data["eligible"]

x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42
)
model = LogisticRegression(max_iter=1000)
model.fit(x_train, y_train)

# print("Model Accuracy:", model.score(x_test, y_test))

joblib.dump(model, MODEL_PATH)
print(f"Saved model to: {MODEL_PATH}")