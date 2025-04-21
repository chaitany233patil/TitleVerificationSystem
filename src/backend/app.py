from flask import Flask, request, jsonify
import pandas as pd
from fuzzywuzzy import fuzz
from flask_cors import CORS  # ✅ Import CORS

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS globally

# Load dataset
df = pd.read_excel("E:\SEM Project\Major Project\Major Project\Guidelines_Enforced_Data(1).xlsx")

def find_similar_titles(input_title, top_n=5):
    similarities = [
        (title, fuzz.token_sort_ratio(input_title.lower(), str(title).lower()))
        for title in df["Cleaned_Title"]
    ]
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    top_matches = [{"title": title, "score": round(score, 2)} for title, score in similarities[:top_n]]
    
    is_unique = all(match["score"] < 60 for match in top_matches)  # Unique if all scores < 70%

    return {"input_title": input_title, "top_matches": top_matches, "isUnique": is_unique}

@app.route("/check-title", methods=["POST"])
def check_title():
    data = request.get_json()
    input_title = data.get("title", "").strip()

    if not input_title:
        return jsonify({"error": "Title cannot be empty"}), 400

    result = find_similar_titles(input_title)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  # ✅ Explicitly set port
