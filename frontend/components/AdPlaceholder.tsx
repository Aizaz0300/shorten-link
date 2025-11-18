'use client';

import { FC } from 'react';

interface AdPlaceholderProps {
  position: 'top' | 'bottom' | 'left' | 'right';
}

const AdPlaceholder: FC<AdPlaceholderProps> = ({ position }) => {
  const getSize = () => {
    // Google Ads standard sizes
    if (position === 'top' || position === 'bottom') {
      // Leaderboard (728x90) or Full-width banner (320x50 mobile, 728x90 desktop)
      return 'w-full h-12 sm:h-[90px]';
    }
    // Sidebar/Skyscraper (300x600 or 160x600)
    return 'w-80 sm:w-[300px] h-96 sm:h-[600px]';
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
      }}
      className={`${getSize()} border rounded-lg flex items-center justify-center shrink-0`}
    >
      <p style={{ color: 'var(--text-secondary)' }} className="text-xs sm:text-sm font-medium text-center px-2">
        Ad Space
      </p>
    </div>
  );
};

export default AdPlaceholder;
