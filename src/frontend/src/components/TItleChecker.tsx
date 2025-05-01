import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import confettiAnim from "../assets/Animation - 1745397106315.json";
import Navbar from "./Navbar";

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
    <div className="body fixed top-0 left-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 ">
      <div className="h-full z-300 overflow-scroll px-4 pt-2 pb-9 flex flex-col items-center overflow-x-hidden scroll-smooth">
        <div className="h-full background-grid absolute w-full z-[-10]"></div>
        <Navbar />
        <div className="mt-13">
          <motion.div
            className="mt-13"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex justify-center">Verify the Uniqueness</div>
              <div className="flex justify-center">
                of Your Title in Seconds
              </div>
            </motion.div>

            <motion.p
              className="mt-4 text-lg sm:text-xl text-gray-400 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Instantly check if your title is one of a kind or too close to the
              existing 16,000. Stay original, always.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-4 mt-8"
        >
          <input
            className="z-20 w-130 max-w-md p-3 rounded-md bg-transparent border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
            type="text"
            placeholder="Enter your title..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <button
            onClick={checkTitle}
            className="p-3 z-100 px-4 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Check Title
          </button>
        </motion.div>

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
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                  🎉 Title is 100% Unique!
                </h2>
                <p className="text-gray-300 mt-3 text-sm italic">
                  You're the first one to come up with this masterpiece. 🚀
                </p>
              </motion.div>
            ) : (
              <motion.p
                className="text-center font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                ⚠️ Similar Titles Found
              </motion.p>
            )}

            {!result.isUnique && (
              <div className="mt-5 space-y-4">
                {result.top_matches.map((match, index) => (
                  <motion.div
                    key={index}
                    className="p-4 w-160 bg-white/5 backdrop-blur-md border border-gray-700 rounded-xl shadow-md hover:shadow-pink-500/20 transition duration-300 "
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
                      <span className="font-medium">{match.title}</span>
                      <span className="text-pink-400 font-bold">
                        {match.score}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
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
      </div>
    </div>
  );
};

export default TitleChecker;
