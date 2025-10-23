import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark">
      <div className="text-center">
        <motion.div
          className="relative inline-block"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary border-t-transparent rounded-full"></div>
        </motion.div>
        <p className="text-white/60 mt-4 text-sm sm:text-base">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
