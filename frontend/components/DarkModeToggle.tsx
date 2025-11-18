'use client';

import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

const DarkModeToggle: FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <button
      className="fixed top-6 right-6 px-6 py-3 rounded-full font-bold border-2 z-50"
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-primary)',
      }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
    >
      <span className="flex items-center gap-2 text-sm sm:text-base">
        {isDark ? (
          <>
            <span className="text-xl sm:text-2xl">☀️</span>
            <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <span className="text-xl sm:text-2xl">🌙</span>
            <span className="hidden sm:inline">Dark</span>
          </>
        )}
      </span>
    </button>
  );
};

export default DarkModeToggle;
