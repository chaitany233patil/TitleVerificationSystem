import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import Lottie from "lottie-react";
import confettiAnim from "./assets/Animation - 1745397106315.json";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <motion.div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-3">
          🔍 Title Checker
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Check how unique your title is compared to others.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your title..."
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

        {!loading && result && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {result.isUnique ? (
              <motion.div
                className="mt-6 text-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Lottie
                  animationData={confettiAnim}
                  loop={false}
                  className="absolute top-[-120px] left-0 w-full h-48 pointer-events-none"
                />
                <h2 className="text-3xl font-bold text-green-600">
                  🎉 Title is 100% Unique!
                </h2>
                <p className="text-gray-600 mt-2">
                  You're the first one to come up with this title. Nice work!
                </p>
              </motion.div>
            ) : (
              <p className="text-center font-semibold text-lg text-red-500">
                ⚠️ Similar titles found.
              </p>
            )}

            {!result.isUnique && (
              <div className="mt-5 space-y-4">
                {result.top_matches.map((match, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-100 rounded-xl border border-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between text-sm text-gray-700 mb-1">
                      <span className="font-medium">{match.title}</span>
                      <span>{match.score}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${match.score}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TitleChecker;
