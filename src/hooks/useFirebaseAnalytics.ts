import { useEffect } from 'react';
import { logPageView, trackUniqueUser } from '../firebase/config';

export const useFirebaseAnalytics = (pageName: string) => {
  useEffect(() => {
    // Log page view
    logPageView(pageName);
    
    // Track unique user
    trackUniqueUser();
  }, [pageName]);
};

export default useFirebaseAnalytics;
