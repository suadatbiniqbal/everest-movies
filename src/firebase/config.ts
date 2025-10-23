import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, increment } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDKeMOBd-8qPy6_7OqFvhcpVCjUb5O4nBE",
  authDomain: "everest-movies-66699.firebaseapp.com",
  databaseURL: "https://everest-movies-66699-default-rtdb.firebaseio.com",
  projectId: "everest-movies-66699",
  storageBucket: "everest-movies-66699.firebasestorage.app",
  messagingSenderId: "460046731861",
  appId: "1:460046731861:web:e8df6cd6129d9c8dea5af4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and database
export const auth = getAuth(app);
export const db = getDatabase(app);

// Log page view
export const logPageView = async (pageName: string) => {
  try {
    const pageRef = ref(db, `analytics/pageViews/${pageName}`);
    const snapshot = await get(pageRef);
    const currentViews = snapshot.val() || 0;
    
    await set(pageRef, currentViews + 1);
  } catch (error) {
    console.error('Error logging page view:', error);
  }
};

// Track unique user
export const trackUniqueUser = async () => {
  try {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', newUserId);
      
      const statsRef = ref(db, 'analytics/stats');
      const statsSnapshot = await get(statsRef);
      const currentStats = statsSnapshot.val() || {
        totalViews: 0,
        movieViews: 0,
        seriesViews: 0,
        uniqueVisitors: 0
      };

      await set(statsRef, {
        ...currentStats,
        uniqueVisitors: (currentStats.uniqueVisitors || 0) + 1
      });
    }
  } catch (error) {
    console.error('Error tracking unique user:', error);
  }
};

// Log movie view
export const logMovieView = async (movieId: number, title: string) => {
  try {
    const viewRef = ref(db, `analytics/movies/${movieId}`);
    await set(viewRef, {
      title,
      views: increment(1),
      lastViewed: Date.now()
    });

    // Update stats
    const statsRef = ref(db, 'analytics/stats');
    const statsSnapshot = await get(statsRef);
    const currentStats = statsSnapshot.val() || {
      totalViews: 0,
      movieViews: 0,
      seriesViews: 0,
      uniqueVisitors: 0
    };

    await set(statsRef, {
      ...currentStats,
      totalViews: (currentStats.totalViews || 0) + 1,
      movieViews: (currentStats.movieViews || 0) + 1
    });
  } catch (error) {
    console.error('Error logging movie view:', error);
  }
};

// Log series view
export const logSeriesView = async (seriesId: number, title: string) => {
  try {
    const viewRef = ref(db, `analytics/series/${seriesId}`);
    await set(viewRef, {
      title,
      views: increment(1),
      lastViewed: Date.now()
    });

    // Update stats
    const statsRef = ref(db, 'analytics/stats');
    const statsSnapshot = await get(statsRef);
    const currentStats = statsSnapshot.val() || {
      totalViews: 0,
      movieViews: 0,
      seriesViews: 0,
      uniqueVisitors: 0
    };

    await set(statsRef, {
      ...currentStats,
      totalViews: (currentStats.totalViews || 0) + 1,
      seriesViews: (currentStats.seriesViews || 0) + 1
    });
  } catch (error) {
    console.error('Error logging series view:', error);
  }
};

// Get admin settings with defaults
export const getAdminSettings = async () => {
  try {
    const settingsRef = ref(db, 'settings');
    const snapshot = await get(settingsRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return {
        socialLinks: data.socialLinks || {
          facebook: '',
          twitter: '',
          instagram: '',
          youtube: ''
        },
        adScript: data.adScript || '',
        maintenanceMode: data.maintenanceMode || false
      };
    }
    
    // Return defaults if not exists
    return {
      socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: ''
      },
      adScript: '',
      maintenanceMode: false
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: ''
      },
      adScript: '',
      maintenanceMode: false
    };
  }
};

// Initialize default stats if needed
export const initializeStats = async () => {
  try {
    const statsRef = ref(db, 'analytics/stats');
    const snapshot = await get(statsRef);
    
    if (!snapshot.exists()) {
      await set(statsRef, {
        totalViews: 0,
        movieViews: 0,
        seriesViews: 0,
        uniqueVisitors: 0
      });
    }
  } catch (error) {
    console.error('Error initializing stats:', error);
  }
};

// Initialize default settings if needed
export const initializeSettings = async () => {
  try {
    const settingsRef = ref(db, 'settings');
    const snapshot = await get(settingsRef);
    
    if (!snapshot.exists()) {
      await set(settingsRef, {
        socialLinks: {
          facebook: '',
          twitter: '',
          instagram: '',
          youtube: ''
        },
        adScript: '',
        maintenanceMode: false
      });
    }
  } catch (error) {
    console.error('Error initializing settings:', error);
  }
};
