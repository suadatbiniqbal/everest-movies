import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create script for ad options
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.innerHTML = `
      atOptions = {
        'key' : '094487b0e8eb6155b637ff13dbbb9990',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    // Create script for ad invoke
    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = '//www.highperformanceformat.com/094487b0e8eb6155b637ff13dbbb9990/invoke.js';

    // Append scripts to ad container
    if (adRef.current) {
      adRef.current.appendChild(script1);
      adRef.current.appendChild(script2);
    }

    // Cleanup
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={`flex justify-center items-center my-4 ${className}`}>
      <div ref={adRef} className="ad-container" />
    </div>
  );
};

export default AdBanner;
