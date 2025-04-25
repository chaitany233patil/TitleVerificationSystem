import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gray-900/30 backdrop-blur-sm h-16 w-[85%] rounded-2xl flex items-center justify-between border border-gray-500 px-6 py-4 mx-auto mt-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 1.5, ease: "easeOut" }}
    >
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-extrabold text-2xl">
        TitleGuard
      </div>
      <div className="flex gap-8">
        <div className="text-gray-300 hover:text-white transition-colors cursor-pointer font-medium hover:underline">
          About
        </div>
        <div className="text-gray-300 hover:text-white transition-colors cursor-pointer font-medium hover:underline">
          Model
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
