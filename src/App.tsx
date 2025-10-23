import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import SeriesPage from './pages/Series';
import Trending from './pages/Trending';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import SeriesDetails from './pages/SeriesDetails';
import ActorDetails from './pages/ActorDetails';
import Admin from './pages/Admin';
import Player from './pages/Player';
import Privacy from './pages/Privacy';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/series/:id" element={<SeriesDetails />} />
          <Route path="/actor/:id" element={<ActorDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/player" element={<Player />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
