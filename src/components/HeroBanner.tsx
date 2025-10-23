import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { getImageUrl } from '../utils/api';
import AdBlockerWarning from './AdBlockerWarning';

interface HeroBannerProps {
  movies: Movie[];
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies.length) return null;

  const currentMovie = movies[currentIndex];

  const handleWatch = () => {
    const hideWarning = localStorage.getItem('hideAdBlockerWarning');
    if (hideWarning === 'true') {
      openPlayer();
    } else {
      setShowWarning(true);
    }
  };

  const openPlayer = () => {
    const playerUrl = `https://tmdbplayer.nunesnetwork.com/?type=movie&id=${currentMovie.id}&server=1`;
    window.open(playerUrl, '_blank');
    setShowWarning(false);
  };

  return (
    <>
      <div className="relative w-full overflow-hidden bg-black" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Background Image */}
        <motion.div
          key={currentIndex}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={getImageUrl(currentMovie.poster_path, 'original')}
            alt={currentMovie.title}
            className="w-full h-full object-cover md:hidden"
          />
          <img
            src={getImageUrl(currentMovie.backdrop_path, 'original')}
            alt={currentMovie.title}
            className="w-full h-full object-cover hidden md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent md:from-black/90 md:via-black/50" />
        </motion.div>

        {/* Content - Better Positioning */}
        <div className="absolute inset-0 flex items-end md:items-center pb-20 sm:pb-16 md:pb-0">
          <div className="container mx-auto px-4">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl"
            >
              {/* Title - Always Visible */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 line-clamp-2 drop-shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentMovie.title}
              </motion.h1>

              {/* Meta Info */}
              <motion.div
                className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex items-center text-yellow-400 text-xs sm:text-sm drop-shadow">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {currentMovie.vote_average.toFixed(1)}
                </span>
                <span className="text-white/90 text-xs sm:text-sm flex items-center gap-1 drop-shadow">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {currentMovie.release_date?.split('-')[0]}
                </span>
                {currentMovie.adult && (
                  <span className="bg-primary px-2 py-0.5 text-xs rounded text-white font-bold">
                    18+
                  </span>
                )}
              </motion.div>

              {/* Description - Hidden on very small screens */}
              <motion.p
                className="text-white/90 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3 drop-shadow-lg hidden xs:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {currentMovie.overview}
              </motion.p>

              {/* Buttons - Lower on Mobile */}
              <motion.div
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 sm:mt-0"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <button
                  onClick={handleWatch}
                  className="bg-primary hover:bg-accent text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 text-xs sm:text-sm md:text-base shadow-2xl"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span>Play Now</span>
                </button>
                <button
                  onClick={() => navigate(`/movie/${currentMovie.id}`)}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all text-xs sm:text-sm md:text-base border border-white/30 shadow-xl"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>More Info</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Dots - EXTRA TINY */}
        <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-50">
          {movies.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all cursor-pointer ${
                index === currentIndex 
                  ? 'bg-primary w-4 h-1 sm:w-6 sm:h-1' 
                  : 'bg-white/40 w-1 h-1 sm:w-1 sm:h-1'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Ad Blocker Warning Dialog */}
      <AdBlockerWarning
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onContinue={openPlayer}
      />
    </>
  );
};

export default HeroBanner;
