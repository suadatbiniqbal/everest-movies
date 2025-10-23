import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPopularMovies, getGenres, getMoviesByGenre } from '../utils/api';
import { Movie, Genre } from '../types';
import { logPageView } from '../firebase/config';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getGenres('movie');
        setGenres(genreData);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
    logPageView('movies');
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const data = selectedGenre
          ? await getMoviesByGenre(selectedGenre, page)
          : await getPopularMovies(page);
        
        if (page === 1) {
          setMovies(data);
        } else {
          setMovies((prev) => [...prev, ...data]);
        }
        
        setHasMore(data.length > 0);
        setLoading(false);
        setLoadingMore(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, page]);

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setPage(1);
    setMovies([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (loading && page === 1) return <LoadingSpinner />;

  return (
    <div className="bg-dark min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8"
        >
          Movies
        </motion.h1>

        {/* Genre Filter - Responsive Horizontal Scroll */}
        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-3 scrollbar-hide">
          <button
            onClick={() => handleGenreChange(null)}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
              selectedGenre === null
                ? 'bg-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
                selectedGenre === genre.id
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Movies Grid - Responsive */}
        <div className="responsive-grid mb-8 sm:mb-12">
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} item={movie} type="movie" index={index} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-primary hover:bg-accent text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all disabled:opacity-50 text-sm sm:text-base"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
