import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchMulti } from '../utils/api';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await searchMulti(query);
        setResults(data.filter((item: any) => item.media_type !== 'person'));
        setLoading(false);
      } catch (error) {
        console.error('Error searching:', error);
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-dark min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Search Results for "{query}"
        </motion.h1>

        <p className="text-white/60 mb-12">{results.length} results found</p>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((item, index) => (
              <MovieCard
                key={item.id}
                item={item}
                type={item.media_type === 'movie' ? 'movie' : 'series'}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-white/20 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-white/60 text-lg">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
