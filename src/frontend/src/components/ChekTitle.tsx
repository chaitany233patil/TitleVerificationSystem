import React, { useState } from "react";

interface Match {
  title: string;
  score: number;
}

interface ApiResponse {
  isUnique: boolean;
  top_matches: Match[];
}

const TitleChecker: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkTitle = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/check-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data: ApiResponse = await response.json();

      // Simulate loader for 2 seconds
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error checking title:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Title Similarity Checker
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter a title below to check for similar existing titles.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a title..."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={checkTitle}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Check
          </button>
        </div>

        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {result && !loading && (
          <div className="mt-6">
            <p
              className={`text-center font-semibold text-lg ${
                result.isUnique ? "text-green-600" : "text-red-500"
              }`}
            >
              {result.isUnique
                ? "✅ Your title is unique!"
                : "⚠️ Similar titles found."}
            </p>

            {!result.isUnique && (
              <div className="mt-4 space-y-2">
                {result.top_matches.map((match, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
                  >
                    <span className="text-gray-700">{match.title}</span>
                    <span className="text-sm text-gray-500 font-medium">
                      {match.score}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleChecker;
