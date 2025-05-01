import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gray-900/50 backdrop-blur-md h-16 w-[85%] rounded-2xl flex items-center justify-between border border-white/20 px-6 py-4 mx-auto mt-4 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 1.5, ease: "easeOut" }}
    >
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-extrabold text-2xl">
        TitleGuard
      </div>
      <div className="flex gap-8">
        <div className="text-gray-500 font-bold hover:text-white transition-colors cursor-pointer hover:underline">
          About
        </div>
        <div className="text-gray-500 font-bold hover:text-white transition-colors cursor-pointer hover:underline">
          Model
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
