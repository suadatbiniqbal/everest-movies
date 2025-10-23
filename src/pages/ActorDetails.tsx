import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getActorDetails, getImageUrl } from '../utils/api';

const ActorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const data = await getActorDetails(Number(id));
        setActor(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching actor details:', error);
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!actor) return <div className="min-h-screen bg-dark flex items-center justify-center text-white">Actor not found</div>;

  return (
    <div className="bg-dark min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Actor Profile */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <img
              src={getImageUrl(actor.profile_path, 'w500')}
              alt={actor.name}
              className="w-full rounded-lg shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <h1 className="text-5xl font-bold text-white mb-6">{actor.name}</h1>

            <div className="space-y-4 mb-8">
              {actor.birthday && (
                <div>
                  <span className="text-white/60">Born:</span>
                  <span className="text-white ml-2">{new Date(actor.birthday).toLocaleDateString()}</span>
                  {actor.place_of_birth && (
                    <span className="text-white/60 ml-4">in {actor.place_of_birth}</span>
                  )}
                </div>
              )}

              {actor.known_for_department && (
                <div>
                  <span className="text-white/60">Known For:</span>
                  <span className="text-white ml-2">{actor.known_for_department}</span>
                </div>
              )}
            </div>

            {actor.biography && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Biography</h2>
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {actor.biography}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Movies */}
        {actor.movie_credits?.cast && actor.movie_credits.cast.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {actor.movie_credits.cast
                .slice(0, 10)
                .map((movie: any, index: number) => (
                  <MovieCard key={movie.id} item={movie} type="movie" index={index} />
                ))}
            </div>
          </section>
        )}

        {/* TV Shows */}
        {actor.tv_credits?.cast && actor.tv_credits.cast.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8">TV Shows</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {actor.tv_credits.cast
                .slice(0, 10)
                .map((series: any, index: number) => (
                  <MovieCard key={series.id} item={series} type="series" index={index} />
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ActorDetails;
