import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { ref, get, set } from 'firebase/database';

// Hardcoded credentials
const ADMIN_EMAIL = 'admin@everestmovies.com';
const ADMIN_PASSWORD = 'Suadat25@#\\';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>({
    totalViews: 0,
    movieViews: 0,
    seriesViews: 0,
    uniqueVisitors: 0
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: ''
  });
  const [adScript, setAdScript] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch stats
      const statsRef = ref(db, 'analytics/stats');
      const statsSnapshot = await get(statsRef);
      if (statsSnapshot.exists()) {
        setStats(statsSnapshot.val());
      } else {
        await set(statsRef, {
          totalViews: 0,
          movieViews: 0,
          seriesViews: 0,
          uniqueVisitors: 0
        });
      }

      // Fetch social links
      const socialRef = ref(db, 'settings/socialLinks');
      const socialSnapshot = await get(socialRef);
      if (socialSnapshot.exists()) {
        setSocialLinks(socialSnapshot.val());
      }

      // Fetch ad script
      const adRef = ref(db, 'settings/adScript');
      const adSnapshot = await get(adRef);
      if (adSnapshot.exists()) {
        setAdScript(adSnapshot.val());
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple hardcoded check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminLoggedIn', 'true');
      setIsAuthenticated(true);
      fetchAdminData();
    } else {
      setError('Invalid email or password');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSaveSocialLinks = async () => {
    setSaving(true);
    try {
      await set(ref(db, 'settings/socialLinks'), socialLinks);
      alert('Social links saved successfully!');
    } catch (error) {
      console.error('Error saving social links:', error);
      alert('Error saving social links');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAdScript = async () => {
    setSaving(true);
    try {
      await set(ref(db, 'settings/adScript'), adScript);
      alert('Ad script saved successfully!');
    } catch (error) {
      console.error('Error saving ad script:', error);
      alert('Error saving ad script');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-surface/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/10">
          <div className="text-center mb-6">
            <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="text-white/60 text-sm mt-2">Secure access to dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-primary transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-primary transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header - No Navbar */}
      <div className="bg-surface/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/60 text-sm">Everest Movies Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm p-6 rounded-xl border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/80 text-sm font-medium">Total Views</h3>
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{stats.totalViews || 0}</p>
            <p className="text-white/50 text-xs mt-1">All time views</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/80 text-sm font-medium">Movie Views</h3>
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{stats.movieViews || 0}</p>
            <p className="text-white/50 text-xs mt-1">Movies watched</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/80 text-sm font-medium">Series Views</h3>
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{stats.seriesViews || 0}</p>
            <p className="text-white/50 text-xs mt-1">Episodes watched</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 backdrop-blur-sm p-6 rounded-xl border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/80 text-sm font-medium">Unique Visitors</h3>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{stats.uniqueVisitors || 0}</p>
            <p className="text-white/50 text-xs mt-1">Total users</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Social Media Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Facebook URL</label>
              <input
                type="url"
                value={socialLinks.facebook}
                onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-primary"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Twitter URL</label>
              <input
                type="url"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-primary"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Instagram URL</label>
              <input
                type="url"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-primary"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">YouTube URL</label>
              <input
                type="url"
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks({...socialLinks, youtube: e.target.value})}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-primary"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          <button
            onClick={handleSaveSocialLinks}
            disabled={saving}
            className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Social Links
              </>
            )}
          </button>
        </div>

        {/* Ad Script */}
        <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Advertisement Script
          </h2>
          
          <div className="mb-6">
            <label className="block text-white/80 mb-2 text-sm font-medium">Ad Script Code</label>
            <textarea
              value={adScript}
              onChange={(e) => setAdScript(e.target.value)}
              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-primary font-mono text-sm"
              placeholder="Paste your ad script here..."
              rows={8}
            />
            <p className="text-white/50 text-xs mt-2">Paste your ad provider script (Google AdSense, etc.)</p>
          </div>

          <button
            onClick={handleSaveAdScript}
            disabled={saving}
            className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Ad Script
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
