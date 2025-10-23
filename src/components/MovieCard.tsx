import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Movie, Series } from '../types';
import { getImageUrl } from '../utils/api';

interface MovieCardProps {
  item: Movie | Series;
  type: 'movie' | 'series';
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, type, index }) => {
  const navigate = useNavigate();
  const title = 'title' in item ? item.title : item.name;
  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playerUrl = type === 'movie' 
      ? `https://tmdbplayer.nunesnetwork.com/?type=movie&id=${item.id}&server=1`
      : `https://tmdbplayer.nunesnetwork.com/?type=tv&id=${item.id}&season=1&episode=1&server=1`;
    window.open(playerUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/${type}/${item.id}`)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-xl bg-surface">
        <div className="aspect-[2/3] relative">
          <img
            src={getImageUrl(item.poster_path, 'w500')}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Play Icon Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayClick}
                className="bg-primary/90 backdrop-blur-sm rounded-full p-3 sm:p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-accent"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>

            {/* Info - Bottom Only */}
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
              <h3 className="text-white font-bold text-xs sm:text-sm line-clamp-1 mb-1">
                {title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {item.vote_average.toFixed(1)}
                </span>
                <span>{releaseDate?.split('-')[0]}</span>
              </div>
            </div>
          </div>

          {/* Rating Badge - Top Right */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded">
            <span className="text-yellow-400 font-bold text-xs">
              {item.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Type Badge - Top Left */}
          <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm px-2 py-0.5 rounded text-white text-xs font-bold uppercase">
            {type}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
