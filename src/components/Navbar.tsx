import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './logo.png'; 

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
      setSearchOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Site Name */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-8 sm:h-10 w-auto object-contain rounded"
            />
            <span className="text-lg sm:text-xl font-bold text-white block sm:block">
              EVEREST MOVIES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/movies" className="text-white hover:text-primary transition-colors font-medium">
              Movies
            </Link>
            <Link to="/series" className="text-white hover:text-primary transition-colors font-medium">
              Series
            </Link>
            <Link to="/trending" className="text-white hover:text-primary transition-colors font-medium">
              Trending
            </Link>
          </div>

          {/* Desktop Search Bar - Always Visible */}
          <form onSubmit={handleSearch} className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-white/10 text-white px-4 py-2 pr-10 rounded-full border border-white/20 focus:outline-none focus:border-primary transition-all w-48 xl:w-64"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Mobile/Tablet Actions */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Search Icon Button for Mobile/Tablet */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white p-2"
              aria-label="Open Search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Search Bar - Visible on All Devices When Toggled */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-3 overflow-hidden"
            >
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, series..."
                    className="w-full bg-white/10 text-white px-4 py-3 pr-12 rounded-full border border-white/20 focus:outline-none focus:border-primary"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 space-y-4 overflow-hidden"
            >
              <Link 
                to="/" 
                className="block text-white hover:text-primary py-2 font-medium text-lg" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className="block text-white hover:text-primary py-2 font-medium text-lg" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/series" 
                className="block text-white hover:text-primary py-2 font-medium text-lg" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Series
              </Link>
              <Link 
                to="/trending" 
                className="block text-white hover:text-primary py-2 font-medium text-lg" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Trending
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
