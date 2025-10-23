import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdBlockerWarningProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const AdBlockerWarning: React.FC<AdBlockerWarningProps> = ({ isOpen, onClose, onContinue }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface border border-white/20 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
        >
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-500/20 p-3 rounded-full">
              <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Ad Blocker Recommended
          </h2>

          {/* Message */}
          <div className="space-y-3 mb-6">
            <p className="text-white/80 text-center text-sm sm:text-base">
              We use a <span className="text-primary font-semibold">third-party player service</span> that may contain annoying ads.
            </p>
            
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">We strongly recommend:</p>
                  <p className="text-white/70 text-sm">
                    Use an <span className="text-primary font-semibold">ad blocker extension</span> before continuing for a better viewing experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Popular Ad Blockers */}
            <div className="text-center">
              <p className="text-white/60 text-xs mb-2">Popular ad blockers:</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="bg-white/10 px-2 py-1 rounded text-white/80">uBlock Origin</span>
                <span className="bg-white/10 px-2 py-1 rounded text-white/80">AdBlock Plus</span>
                <span className="bg-white/10 px-2 py-1 rounded text-white/80">AdGuard</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all border border-white/20"
            >
              Cancel
            </button>
            <button
              onClick={onContinue}
              className="flex-1 bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Continue Anyway</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Checkbox */}
          <label className="flex items-center justify-center gap-2 mt-4 cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  localStorage.setItem('hideAdBlockerWarning', 'true');
                } else {
                  localStorage.removeItem('hideAdBlockerWarning');
                }
              }}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
            />
            <span className="text-white/60 text-xs">Don't show this again</span>
          </label>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdBlockerWarning;
