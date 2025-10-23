import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTrendingMovies, getTrendingSeries } from '../utils/api';
import { Movie, Series } from '../types';
import { logPageView } from '../firebase/config';

const Trending: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<Series[]>([]);
  const [activeTab, setActiveTab] = useState<'movies' | 'series'>('movies');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const [movies, series] = await Promise.all([
          getTrendingMovies('week'),
          getTrendingSeries('week')
        ]);

        setTrendingMovies(movies);
        setTrendingSeries(series);
        setLoading(false);

        logPageView('trending');
      } catch (error) {
        console.error('Error fetching trending:', error);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-dark min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-8"
        >
          Trending This Week
        </motion.h1>

        {/* Tab Switcher */}
        <div className="flex space-x-4 mb-12">
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'movies'
                ? 'bg-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab('series')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'series'
                ? 'bg-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            TV Series
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {activeTab === 'movies'
            ? trendingMovies.map((movie, index) => (
                <MovieCard key={movie.id} item={movie} type="movie" index={index} />
              ))
            : trendingSeries.map((series, index) => (
                <MovieCard key={series.id} item={series} type="series" index={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
