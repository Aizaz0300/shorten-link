import { useState, FC, useEffect } from 'react';

// Analytics Component
interface AnalyticsData {
  clicks: number;
  referrers: string[];
  dates: string[];
}

interface AnalyticsProps {
  data: AnalyticsData;
}

const Analytics: FC<AnalyticsProps> = ({ data }) => {
  return (
    <div 
      style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderColor: 'var(--card-border)'
      }} 
      className="mt-10 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-center gap-3 mb-8">
        <svg className="w-6 sm:w-8 h-6 sm:h-8" style={{ color: 'var(--accent-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 style={{ color: 'var(--accent-color)' }} className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h2>
      </div>
      
      <div 
        style={{ 
          backgroundColor: 'var(--accent-color)'
        }} 
        className="p-6 rounded-lg mb-8"
      >
        <p className="text-white text-sm sm:text-lg font-medium mb-2">Total Clicks</p>
        <p className="text-white text-4xl sm:text-5xl font-bold">{data.clicks}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: 'var(--accent-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h3 style={{ color: 'var(--text-primary)' }} className="text-lg sm:text-xl font-bold">Referrers</h3>
          </div>
          <ul className="space-y-2">
            {data.referrers.map((ref, index) => (
              <li
                key={index}
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                className="px-4 py-3 rounded-lg border"
              >
                <span className="font-medium text-sm sm:text-base">{ref}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: 'var(--accent-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 style={{ color: 'var(--text-primary)' }} className="text-lg sm:text-xl font-bold">Click Timeline</h3>
          </div>
          <ul className="space-y-2">
            {data.dates.map((date, index) => (
              <li
                key={index}
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                className="px-4 py-3 rounded-lg border"
              >
                <span className="font-medium text-xs sm:text-sm">{new Date(date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Analytics;