import { useState, FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DarkModeToggle from '../../components/DarkModeToggle';
import Navigation from '../../components/Navigation';
import Analytics from '../../components/Analytics';
import AdPlaceholder from '../../components/AdPlaceholder';

interface AnalyticsData {
  shortId: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  referrers: string[];
  dates: string[];
}

const AnalyticsSearchPage: FC = () => {
  const router = useRouter();
  const [shortId, setShortId] = useState<string>('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);

  // Auto-fetch analytics if shortId is in query parameter
  useEffect(() => {
    if (router.isReady && router.query.id) {
      const id = router.query.id as string;
      setShortId(id);
      fetchAnalytics(id);
    }
  }, [router.isReady, router.query.id]);

  const fetchAnalytics = async (id: string) => {
    setLoading(true);
    setError('');
    setAnalyticsData(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/analytics/${id.trim()}`
      );
      setAnalyticsData(response.data);
      setSearched(true);
    } catch (err) {
      setError('Failed to load analytics. URL not found or invalid.');
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shortId.trim()) {
      setError('Please enter a shortened URL ID');
      return;
    }

    fetchAnalytics(shortId);
  };

  const handleReset = () => {
    setShortId('');
    setAnalyticsData(null);
    setError('');
    setSearched(false);
  };

  return (
    <div
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      className="min-h-screen py-0 px-4"
    >
      <DarkModeToggle />

      {/* Navigation */}
      <Navigation />

      {/* Top Ad */}
      <div className="sticky top-0 z-40 mb-8 flex justify-center pb-2" style={{ backgroundImage: 'linear-gradient(to bottom, var(--bg-primary), transparent)' }}>
        <AdPlaceholder position="top" />
      </div>

      <div className="w-full">
        <div className="flex gap-4 lg:gap-6 max-w-7xl mx-auto">
          {/* Left Ad */}
          <div className="hidden lg:block sticky top-6 h-fit">
            <AdPlaceholder position="left" />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {!analyticsData || error ? (
              <>
                {/* Search Form */}
                <div
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                  }}
                  className="flex flex-col items-center gap-6 mb-12 p-8 sm:p-12 rounded-lg sm:rounded-2xl border-2 w-full"
                >
                  <div className="text-center space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                      <svg className="w-8 sm:w-10 h-8 sm:h-10" style={{ color: 'var(--accent-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <h1 style={{ color: 'var(--accent-color)' }} className="text-3xl sm:text-5xl font-bold">
                        Analytics
                      </h1>
                    </div>
                    <p style={{ color: 'var(--text-primary)' }} className="text-sm sm:text-lg font-medium">
                      Enter a shortened URL ID to view its analytics
                    </p>
                  </div>

                  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
                    <input
                      type="text"
                      value={shortId}
                      onChange={(e) => setShortId(e.target.value)}
                      placeholder="Enter shortened URL ID (e.g., abc123)"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        borderColor: 'var(--input-border)',
                        color: 'var(--text-primary)',
                      }}
                      className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-lg text-base sm:text-lg font-medium"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        backgroundColor: 'var(--button-bg)',
                        color: 'var(--button-text)',
                        opacity: loading ? 0.7 : 1
                      }}
                      className="px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg text-base sm:text-lg whitespace-nowrap active:opacity-80 hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </button>
                  </form>

                  {error && searched && (
                    <div
                      style={{
                        backgroundColor: 'var(--error-bg)',
                        color: '#fff',
                      }}
                      className="w-full mt-6 p-4 rounded-lg text-center font-semibold text-sm sm:text-base"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Analytics Header */}
                <div
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                  }}
                  className="mb-10 p-8 sm:p-12 rounded-lg sm:rounded-2xl border-2 w-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <h1 style={{ color: 'var(--accent-color)' }} className="text-3xl sm:text-4xl font-bold mb-2">
                        📊 Analytics
                      </h1>
                      <p style={{ color: 'var(--text-secondary)' }} className="text-sm sm:text-base">
                        Detailed statistics for your shortened URL
                      </p>
                    </div>
                  </div>

                  {/* URL Info */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <p style={{ color: 'var(--text-secondary)' }} className="text-xs sm:text-sm font-semibold mb-1">
                        SHORT URL
                      </p>
                      <a
                        href={analyticsData.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--accent-color)',
                          backgroundColor: 'var(--bg-secondary)',
                        }}
                        className="inline-block px-4 py-2 rounded-lg font-bold text-sm sm:text-base hover:underline break-all"
                      >
                        {analyticsData.shortUrl}
                      </a>
                    </div>

                    <div>
                      <p style={{ color: 'var(--text-secondary)' }} className="text-xs sm:text-sm font-semibold mb-1">
                        ORIGINAL URL
                      </p>
                      <a
                        href={analyticsData.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--accent-color)',
                        }}
                        className="text-xs sm:text-sm font-medium hover:underline break-all"
                      >
                        {analyticsData.originalUrl}
                      </a>
                    </div>

                    <div>
                      <p style={{ color: 'var(--text-secondary)' }} className="text-xs sm:text-sm font-semibold mb-1">
                        CREATED
                      </p>
                      <p className="text-xs sm:text-sm">
                        {new Date(analyticsData.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      borderColor: 'var(--border-color)',
                    }}
                    className="mt-8 px-6 py-2 border-2 font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Search Another URL
                  </button>
                </div>

                {/* Analytics Component */}
                <Analytics
                  data={{
                    clicks: analyticsData.clicks,
                    referrers: analyticsData.referrers,
                    dates: analyticsData.dates,
                  }}
                />
              </>
            )}
          </div>

          {/* Right Ad */}
          <div className="hidden lg:block sticky top-6 h-fit">
            <AdPlaceholder position="right" />
          </div>
        </div>
      </div>

      {/* Bottom Ad */}
      <div className="sticky bottom-0 z-40 mt-8 flex justify-center pt-2" style={{ backgroundImage: 'linear-gradient(to top, var(--bg-primary), transparent)' }}>
        <AdPlaceholder position="bottom" />
      </div>
    </div>
  );
};

export default AnalyticsSearchPage;
