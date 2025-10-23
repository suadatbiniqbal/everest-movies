import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Actor } from '../types';
import { getImageUrl } from '../utils/api';

interface ActorCardProps {
  actor: Actor;
  index: number;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer"
      onClick={() => navigate(`/actor/${actor.id}`)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={getImageUrl(actor.profile_path, 'w300')}
          alt={actor.name}
          className="w-full aspect-[2/3] object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg">{actor.name}</h3>
            {actor.character && (
              <p className="text-white/70 text-sm">{actor.character}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActorCard;
