import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Player: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const type = searchParams.get('type') || 'movie';
  const season = searchParams.get('season') || '1';
  const episode = searchParams.get('episode') || '1';
  const title = searchParams.get('title') || '';

  const getPlayerUrl = () => {
    if (type === 'movie') {
      return `https://www.2embed.cc/embed/${id}`;
    } else {
      return `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-surface/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-primary transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-white font-bold text-sm sm:text-lg truncate max-w-xs sm:max-w-md">
            {decodeURIComponent(title)}
          </h1>
        </div>
      </div>

      {/* Player Container */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-7xl">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              src={getPlayerUrl()}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
