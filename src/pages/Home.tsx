import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AdBanner from '../components/AdBanner';
import { getTrendingMovies, getTrendingSeries, getPopularMovies, getPopularSeries } from '../utils/api';
import { Movie, Series } from '../types';
import { logPageView, trackUniqueUser } from '../firebase/config';

const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<Series[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularSeries, setPopularSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, series, popular, popularSer] = await Promise.all([
          getTrendingMovies(),
          getTrendingSeries(),
          getPopularMovies(),
          getPopularSeries()
        ]);

        setTrendingMovies(trending.slice(0, 10));
        setTrendingSeries(series.slice(0, 10));
        setPopularMovies(popular.slice(0, 12));
        setPopularSeries(popularSer.slice(0, 12));
        setLoading(false);

        logPageView('home');
        trackUniqueUser();
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Banner */}
      <HeroBanner movies={trendingMovies.slice(0, 5)} />

      {/* Ad Banner After Hero */}
      <AdBanner className="py-8" />

      {/* Trending Movies Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8"
        >
          Trending Movies
        </motion.h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 }
          }}
          className="movie-swiper"
        >
          {trendingMovies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <MovieCard item={movie} type="movie" index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Ad Banner Between Sections */}
      <AdBanner />

      {/* Trending Series Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8"
        >
          Trending Series
        </motion.h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 }
          }}
          className="movie-swiper"
        >
          {trendingSeries.map((series, index) => (
            <SwiperSlide key={series.id}>
              <MovieCard item={series} type="series" index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Ad Banner */}
      <AdBanner />

      {/* Popular Movies Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8"
        >
          Popular Movies
        </motion.h2>
        
        <div className="responsive-grid">
          {popularMovies.map((movie, index) => (
            <MovieCard key={movie.id} item={movie} type="movie" index={index} />
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner />

      {/* Popular Series Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8"
        >
          Popular Series
        </motion.h2>
        
        <div className="responsive-grid">
          {popularSeries.map((series, index) => (
            <MovieCard key={series.id} item={series} type="series" index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
