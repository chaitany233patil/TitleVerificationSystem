import React, { useState } from "react";
import "./style.css";

function TitleChecker() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);

  const checkTitle = async () => {
    const response = await fetch("http://127.0.0.1:5000/check-title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="container">
      <h1>Title Similarity Checker</h1>
      <p>Enter a title below to check for similar existing titles.</p>

      <input
        type="text"
        placeholder="Enter a title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={checkTitle}>Check Similarity</button>

      {result && (
        <div className="result-container">
          <p className={`message ${result.isUnique ? "success" : "error"}`}>
            {result.isUnique ? "✅ Your title is unique!" : "⚠️ Similar titles found."}
          </p>

          {result.top_matches.map((match, index) => (
            <div key={index} className="result-row">
              <span>{match.title}</span>
              <span className="similarity-score">{match.score}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TitleChecker;
