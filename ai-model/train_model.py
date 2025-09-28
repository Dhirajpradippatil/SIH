import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

df = pd.read_csv("fake_complaints.csv")
df["text"] = df["title"] + " " + df["description"]
df["label"] = df["label"].map({"genuine": 0, "fake": 1})

model = Pipeline([
    ("vectorizer", CountVectorizer()),
    ("classifier", MultinomialNB())
])

model.fit(df["text"], df["label"])

joblib.dump(model, "model.pkl")
print("✅ Model trained and saved.")
