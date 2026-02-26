import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

data = pd.read_csv("scheme_dataset.csv")

x = data.drop('eligible', axis=1)
y = data['eligible']

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=1000)
model.fit(x_train, y_train)

# print("Model Accuracy:", model.score(x_test, y_test))

joblib.dump(model, "scheme_model.pkl")