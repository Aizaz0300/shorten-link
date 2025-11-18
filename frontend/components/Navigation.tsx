'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation: FC = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const isAnalyticsPage = router.pathname.startsWith('/analytics');

  return (
    <nav
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        backdropFilter: 'blur(10px)',
      }}
      className="mb-8 border-b-2 shadow-lg sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="transform transition-transform duration-300 group-hover:rotate-12">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
                style={{ color: 'var(--accent-color)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <span 
              style={{ color: 'var(--accent-color)' }} 
              className="hidden sm:inline font-bold text-xl tracking-tight"
            >
              Shorten URL
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <button
              style={{
                background: isHomePage 
                  ? 'linear-gradient(135deg, var(--accent-color), var(--button-hover))' 
                  : 'transparent',
                color: isHomePage ? '#fff' : 'var(--text-primary)',
                borderColor: isHomePage ? 'transparent' : 'var(--border-color)',
              }}
              className="px-4 sm:px-5 py-2 border rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="hidden sm:inline">Shorten</span>
            </button>
          </Link>

          <Link href="/analytics">
            <button
              style={{
                background: isAnalyticsPage 
                  ? 'linear-gradient(135deg, var(--accent-color), var(--button-hover))' 
                  : 'transparent',
                color: isAnalyticsPage ? '#fff' : 'var(--text-primary)',
                borderColor: isAnalyticsPage ? 'transparent' : 'var(--border-color)',
              }}
              className="px-4 sm:px-5 py-2 border rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="hidden sm:inline">Analytics</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;