import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AdBanner from '../components/AdBanner';
import AdBlockerWarning from '../components/AdBlockerWarning';
import { getMovieDetails, getImageUrl } from '../utils/api';
import { logMovieView } from '../firebase/config';
import 'swiper/css';
import 'swiper/css/navigation';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(Number(id));
        setMovie(data);
        setLoading(false);
        logMovieView(data.id, data.title);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleWatch = () => {
    const hideWarning = localStorage.getItem('hideAdBlockerWarning');
    if (hideWarning === 'true') {
      openPlayer();
    } else {
      setShowWarning(true);
    }
  };

  const openPlayer = () => {
    const playerUrl = `https://tmdbplayer.nunesnetwork.com/?type=movie&id=${id}&server=1`;
    window.open(playerUrl, '_blank');
    setShowWarning(false);
  };

  if (loading) return <LoadingSpinner />;
  if (!movie) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      Movie not found
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="container mx-auto px-4 pb-8 md:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6 text-sm sm:text-base text-white/90">
                <span className="flex items-center text-yellow-400">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {movie.release_date?.split('-')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {movie.runtime} min
                </span>
                {movie.adult && (
                  <span className="bg-primary px-2 py-1 text-xs rounded">18+</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {movie.genres?.slice(0, 4).map((genre: any) => (
                  <span
                    key={genre.id}
                    className="bg-white/10 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                {movie.overview}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleWatch}
                  className="bg-primary hover:bg-accent text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 text-sm sm:text-base shadow-lg"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span>Play Now</span>
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base border border-white/20"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Go Back</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner className="py-8" />

      {/* Cast Section */}
      {movie.credits?.cast && movie.credits.cast.length > 0 && (
        <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Cast</h2>
          <Swiper
            modules={[Navigation]}
            spaceBetween={12}
            slidesPerView={3}
            navigation
            breakpoints={{
              640: { slidesPerView: 4, spaceBetween: 16 },
              768: { slidesPerView: 5, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 20 },
              1280: { slidesPerView: 7, spaceBetween: 20 }
            }}
          >
            {movie.credits.cast.slice(0, 20).map((actor: any) => (
              <SwiperSlide key={actor.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => navigate(`/actor/${actor.id}`)}
                >
                  <img
                    src={getImageUrl(actor.profile_path, 'w185')}
                    alt={actor.name}
                    className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg"
                  />
                  <h3 className="text-white font-semibold mt-2 text-xs sm:text-sm truncate">{actor.name}</h3>
                  <p className="text-white/60 text-xs truncate">{actor.character}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* Ad Banner */}
      <AdBanner />

      {/* Similar Movies */}
      {movie.similar?.results && movie.similar.results.length > 0 && (
        <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Similar Movies</h2>
          <div className="responsive-grid">
            {movie.similar.results.slice(0, 12).map((item: any, index: number) => (
              <MovieCard key={item.id} item={item} type="movie" index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Ad Blocker Warning Dialog */}
      <AdBlockerWarning
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onContinue={openPlayer}
      />
    </div>
  );
};

export default MovieDetails;
