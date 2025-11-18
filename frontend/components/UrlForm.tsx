import { useState, FC, FormEvent } from 'react';
interface UrlFormProps {
  onShorten: (url: string) => void;
  isLoading?: boolean;
}

const UrlForm: FC<UrlFormProps> = ({ onShorten, isLoading = false }) => {
  const [url, setUrl] = useState<string>('');

  const handleSubmit = () => {
    if (url && url.trim() && !isLoading) {
      onShorten(url);
      setUrl('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div 
      style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderColor: 'var(--card-border)'
      }} 
      className="flex flex-col items-center gap-6 mb-12 p-8 sm:p-12 rounded-lg sm:rounded-2xl border-2 w-full"
    >
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <svg className="w-8 sm:w-10 h-8 sm:h-10" style={{ color: 'var(--accent-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <h1 style={{ color: 'var(--accent-color)' }} className="text-3xl sm:text-5xl font-bold">
            URL Shortener
          </h1>
        </div>
        <p style={{ color: 'var(--text-primary)' }} className="text-sm sm:text-lg font-medium">
          Transform long URLs into short, shareable links with analytics
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your long URL..."
          style={{
            backgroundColor: 'var(--input-bg)',
            borderColor: 'var(--input-border)',
            color: 'var(--text-primary)',
          }}
          className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-lg text-base sm:text-lg font-medium"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            backgroundColor: 'var(--button-bg)',
            color: 'var(--button-text)',
            opacity: isLoading ? 0.7 : 1
          }}
          className="px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg text-base sm:text-lg whitespace-nowrap active:opacity-80 hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
        >
          {isLoading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>
    </div>
  );
};

export default UrlForm;
