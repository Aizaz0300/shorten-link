import { useState } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import UrlForm from '../components/UrlForm';
import DarkModeToggle from '../components/DarkModeToggle';
import Navigation from '../components/Navigation';
import AdPlaceholder from '../components/AdPlaceholder';

const Home: FC = () => {
  const router = useRouter();
  const [shortUrl, setShortUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copiedFeedback, setCopiedFeedback] = useState<boolean>(false);

  const handleShorten = async (url: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/shorten', { url });
      setShortUrl(response.data.short_url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error shortening URL. Please try again.');
    }
  };

  const handleViewAnalytics = (shortUrl: string) => {
    // Extract the shortId from the full URL (last part after /)
    const shortId = shortUrl.split('/').pop() || '';
    router.push(`/analytics?id=${shortId}`);
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
            <UrlForm onShorten={handleShorten} isLoading={loading} />

            {loading && (
              <div 
                style={{ backgroundColor: 'var(--accent-color)' }} 
                className="mt-8 p-6 rounded-xl text-center font-bold text-white text-lg shadow-xl"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              </div>
            )}
            
            {error && (
              <div 
                style={{ 
                  backgroundColor: 'var(--error-bg)',
                  color: '#fff'
                }} 
                className="mt-8 p-6 rounded-xl text-center font-bold text-lg shadow-xl"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {shortUrl && !loading && (
              <div 
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  borderColor: 'var(--card-border)'
                }} 
                className="mt-8 p-8 rounded-2xl shadow-2xl border-2"
              >
                {/* Warning Banner */}
                <div 
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--accent-color)'
                  }}
                  className="mb-6 p-4 rounded-lg border-l-4 flex gap-3"
                >
                  <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0v2M7 17h10m-10-4h10m-10-4h10" />
                  </svg>
                  <p style={{ color: 'var(--text-primary)' }} className="text-sm font-semibold">
                    ⚠️ Copy this URL immediately otherwise it will be lost forever!
                  </p>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <svg 
                    className="w-8 h-8 mt-1 shrink-0" 
                    style={{ color: 'var(--accent-color)' }} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p style={{ color: 'var(--text-primary)' }} className="text-lg font-semibold mb-3">
                      ✨ Your shortened URL is ready:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <a 
                        href={shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          color: 'var(--accent-color)',
                          backgroundColor: 'var(--bg-secondary)'
                        }} 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg hover:underline font-bold text-lg break-all"
                      >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        {shortUrl}
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shortUrl);
                          setCopiedFeedback(true);
                          setTimeout(() => setCopiedFeedback(false), 2000);
                        }}
                        style={{ 
                          backgroundColor: copiedFeedback ? 'var(--accent-color)' : 'var(--bg-secondary)',
                          color: copiedFeedback ? '#fff' : 'var(--text-primary)',
                          borderColor: 'var(--border-color)'
                        }}
                        className="px-4 py-2 rounded-lg border-2 font-semibold flex items-center gap-2 whitespace-nowrap transition-all"
                        title="Copy to clipboard"
                      >
                        {copiedFeedback ? (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleViewAnalytics(shortUrl)}
                  style={{ 
                    backgroundColor: 'var(--accent-color)',
                    color: '#fff'
                  }}
                  className="px-8 py-3 font-bold rounded-xl flex items-center gap-2 active:opacity-80 hover:opacity-90 transition-opacity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Analytics
                </button>
              </div>
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

export default Home;