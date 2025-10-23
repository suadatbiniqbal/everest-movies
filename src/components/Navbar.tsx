import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMulti, getImageUrl } from '../utils/api';
import logo from './logo.png';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const searchContent = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setSearchLoading(true);
      try {
        const results = await searchMulti(searchQuery);
        setSearchResults(results.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setSearchLoading(false);
      }
    };

    const debounce = setTimeout(searchContent, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSearch(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Text - Always Visible */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <img 
              src={logo} 
              alt="Everest Movies" 
              className="h-8 sm:h-10 w-auto object-contain"
            />
            <span className="text-white font-bold text-sm sm:text-base md:text-lg drop-shadow-lg">
              EVEREST MOVIES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-white hover:text-primary transition-colors font-medium text-sm">
              Home
            </Link>
            <Link to="/movies" className="text-white hover:text-primary transition-colors font-medium text-sm">
              Movies
            </Link>
            <Link to="/series" className="text-white hover:text-primary transition-colors font-medium text-sm">
              TV Series
            </Link>
            <Link to="/trending" className="text-white hover:text-primary transition-colors font-medium text-sm">
              Trending
            </Link>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:block relative flex-1 max-w-xs lg:max-w-md mx-4 search-container">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 px-3 py-2 pl-9 pr-9 rounded-lg border border-white/20 focus:outline-none focus:border-primary transition-all text-sm"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearch(false);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearch && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-surface border border-white/20 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-[100]"
              >
                {searchLoading ? (
                  <div className="p-4 text-center text-white/60 text-sm">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={`/${result.media_type}/${result.id}`}
                        onClick={() => {
                          setShowSearch(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-all"
                      >
                        <img
                          src={getImageUrl(result.poster_path, 'w92')}
                          alt={result.title || result.name}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-sm truncate">{result.title || result.name}</h4>
                          <p className="text-white/60 text-xs">
                            {result.media_type === 'movie' ? 'Movie' : 'TV Series'} • {(result.release_date || result.first_air_date)?.split('-')[0]}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-white/60 text-sm">No results found</div>
                )}
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 flex-shrink-0"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-primary transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/movies"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-primary transition-colors font-medium"
                >
                  Movies
                </Link>
                <Link
                  to="/series"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-primary transition-colors font-medium"
                >
                  TV Series
                </Link>
                <Link
                  to="/trending"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-primary transition-colors font-medium"
                >
                  Trending
                </Link>

                {/* Mobile Search */}
                <div className="relative pt-2 search-container">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                    className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 px-4 py-2 pl-10 rounded-lg border border-white/20 focus:outline-none focus:border-primary"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>

                  {/* Mobile Search Results */}
                  {showSearch && searchQuery && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 bg-surface border border-white/20 rounded-lg max-h-64 overflow-y-auto z-[100]"
                    >
                      {searchLoading ? (
                        <div className="p-4 text-center text-white/60">Searching...</div>
                      ) : searchResults.length > 0 ? (
                        <div className="p-2">
                          {searchResults.map((result) => (
                            <Link
                              key={result.id}
                              to={`/${result.media_type}/${result.id}`}
                              onClick={() => {
                                setShowSearch(false);
                                setSearchQuery('');
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-all"
                            >
                              <img
                                src={getImageUrl(result.poster_path, 'w92')}
                                alt={result.title || result.name}
                                className="w-10 h-14 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-sm truncate">{result.title || result.name}</h4>
                                <p className="text-white/60 text-xs">
                                  {result.media_type === 'movie' ? 'Movie' : 'TV Series'} • {(result.release_date || result.first_air_date)?.split('-')[0]}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-white/60">No results found</div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
