import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 border border-primary rounded-full text-primary text-sm font-bold mb-6">
            LAST UPDATED: OCTOBER 22, 2025
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Your privacy is our top priority. We believe in complete transparency about how we operate.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-20">
        {/* Introduction */}
        <section className="bg-surface/50 rounded-xl p-6 sm:p-8 mb-6 border border-white/10">
          <h2 className="text-2xl font-bold text-primary mb-4">Welcome to Everest Movies</h2>
          <p className="text-white/80 mb-4 leading-relaxed">
            At Everest Movies, we are deeply committed to protecting your privacy and maintaining transparency about our operations. This Privacy Policy provides comprehensive information about our data practices, content sourcing, and your rights as a user.
          </p>
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
            <p className="text-white/90">
              <strong className="text-white">Critical Disclosure:</strong> Everest Movies does NOT host, upload, store, or distribute any movies, TV shows, video files, or copyrighted content on our servers. We operate exclusively as a content aggregation and search platform that indexes and links to third-party sources available publicly on the internet.
            </p>
          </div>
        </section>

        {/* Platform Understanding */}
        <section className="bg-surface/50 rounded-xl p-6 sm:p-8 mb-6 border border-white/10">
          <h2 className="text-2xl font-bold text-primary mb-4">Understanding Our Platform</h2>
          <p className="text-white/80 mb-4">
            Everest Movies is a <strong>streaming aggregator and content discovery platform</strong> designed to help users find and access entertainment content from various third-party sources across the internet.
          </p>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>A centralized search interface for discovering entertainment content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Links and embeds to third-party video hosting services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Information about movies, TV shows, ratings, and descriptions</span>
            </li>
          </ul>
        </section>

        {/* Data Collection */}
        <section className="bg-surface/50 rounded-xl p-6 sm:p-8 mb-6 border border-white/10">
          <h2 className="text-2xl font-bold text-primary mb-4">Information We Collect</h2>
          <p className="text-white/80 mb-4">
            To provide, maintain, and improve our services, we may collect limited information. We practice data minimization and only collect what is necessary for platform functionality.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Automatically Collected Information:</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>IP address and approximate geographic location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Browser type, version, and language preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Device information and usage patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Copyright */}
        <section className="bg-surface/50 rounded-xl p-6 sm:p-8 mb-6 border border-white/10">
          <h2 className="text-2xl font-bold text-primary mb-4">Copyright and DMCA Compliance</h2>
          <p className="text-white/80 mb-4">
            Everest Movies respects intellectual property rights and complies with the Digital Millennium Copyright Act and applicable copyright laws.
          </p>
          <p className="text-white/80 mb-4">
            If you believe content accessible through our platform infringes your copyright, please send a detailed DMCA notice to <strong className="text-primary">help.everestmovies@gmail.com</strong>
          </p>
        </section>

        {/* Contact */}
        <section className="bg-primary/10 rounded-xl p-6 sm:p-8 mb-6 border border-primary/30">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Contact Us</h2>
          <p className="text-white/80 text-center mb-6">
            If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
          </p>
          <div className="text-center">
            <a 
              href="mailto:help.everestmovies@gmail.com"
              className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              help.everestmovies@gmail.com
            </a>
          </div>
        </section>

        {/* Final Disclaimer */}
        <section className="bg-red-500/10 rounded-xl p-6 sm:p-8 border border-red-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">Important Disclaimer</h2>
          <p className="text-white/90 mb-3">
            <strong>EVEREST MOVIES IS A CONTENT AGGREGATION PLATFORM</strong>
          </p>
          <p className="text-white/80 mb-3">
            We do NOT host, upload, store, or distribute any video files, movies, TV shows, or copyrighted material on our servers. All content accessible through our platform is hosted exclusively on third-party servers.
          </p>
          <p className="text-white/80">
            By using Everest Movies, you acknowledge that you understand and accept these terms, and you agree to use the platform responsibly and in full compliance with all applicable laws.
          </p>
        </section>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
