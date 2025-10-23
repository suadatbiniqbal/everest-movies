import { STORAGE_KEYS } from './constants';

// Format runtime (minutes to hours and minutes)
export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  
  return `${hours}h ${mins}m`;
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get year from date string
export const getYear = (dateString: string): string => {
  return dateString.split('-')[0];
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Save to local storage
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Get from local storage
export const getFromLocalStorage = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Remove from local storage
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Add to recently watched
export const addToRecentlyWatched = (item: any): void => {
  const recentlyWatched = getFromLocalStorage(STORAGE_KEYS.RECENTLY_WATCHED) || [];
  
  // Remove if already exists
  const filtered = recentlyWatched.filter((i: any) => i.id !== item.id);
  
  // Add to beginning
  filtered.unshift(item);
  
  // Keep only last 20
  const updated = filtered.slice(0, 20);
  
  saveToLocalStorage(STORAGE_KEYS.RECENTLY_WATCHED, updated);
};

// Add to favorites
export const addToFavorites = (item: any): void => {
  const favorites = getFromLocalStorage(STORAGE_KEYS.FAVORITES) || [];
  
  // Check if already in favorites
  const exists = favorites.some((i: any) => i.id === item.id);
  
  if (!exists) {
    favorites.push(item);
    saveToLocalStorage(STORAGE_KEYS.FAVORITES, favorites);
  }
};

// Remove from favorites
export const removeFromFavorites = (itemId: number): void => {
  const favorites = getFromLocalStorage(STORAGE_KEYS.FAVORITES) || [];
  const updated = favorites.filter((i: any) => i.id !== itemId);
  saveToLocalStorage(STORAGE_KEYS.FAVORITES, updated);
};

// Check if in favorites
export const isInFavorites = (itemId: number): boolean => {
  const favorites = getFromLocalStorage(STORAGE_KEYS.FAVORITES) || [];
  return favorites.some((i: any) => i.id === itemId);
};

// Debounce function
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  
  return function executedFunction(...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Scroll to top
export const scrollToTop = (smooth: boolean = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
};

// Check if mobile device
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Get video quality based on network speed
export const getVideoQuality = (): string => {
  const connection = (navigator as any).connection;
  
  if (!connection) return 'auto';
  
  const downlink = connection.downlink;
  
  if (downlink >= 5) return '1080p';
  if (downlink >= 2) return '720p';
  if (downlink >= 1) return '480p';
  
  return '360p';
};
