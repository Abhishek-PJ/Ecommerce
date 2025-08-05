import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PWACacheManager = () => {
  const [cacheInfo, setCacheInfo] = useState({
    staticCache: { size: 0, items: [] },
    dynamicCache: { size: 0, items: [] }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCacheInfo();
  }, []);

  const loadCacheInfo = async () => {
    if ('caches' in window) {
      try {
        const staticCache = await caches.open('static-v1.0.0');
        const dynamicCache = await caches.open('dynamic-v1.0.0');
        
        const staticKeys = await staticCache.keys();
        const dynamicKeys = await dynamicCache.keys();
        
        setCacheInfo({
          staticCache: { size: staticKeys.length, items: staticKeys.map(req => req.url) },
          dynamicCache: { size: dynamicKeys.length, items: dynamicKeys.map(req => req.url) }
        });
      } catch (error) {
        console.error('Error loading cache info:', error);
      }
    }
  };

  const clearCache = async (cacheName) => {
    setIsLoading(true);
    try {
      if ('caches' in window) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        await Promise.all(keys.map(key => cache.delete(key)));
        
        toast.success(`${cacheName} cleared successfully!`);
        await loadCacheInfo();
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast.error('Failed to clear cache');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllCaches = async () => {
    setIsLoading(true);
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        
        toast.success('All caches cleared successfully!');
        await loadCacheInfo();
      }
    } catch (error) {
      console.error('Error clearing all caches:', error);
      toast.error('Failed to clear caches');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCache = async () => {
    setIsLoading(true);
    try {
      // Clear dynamic cache and reload
      await clearCache('dynamic-v1.0.0');
      
      // Preload important pages
      const importantPages = [
        '/allproduct',
        '/cart',
        '/user-dashboard'
      ];
      
      for (const page of importantPages) {
        try {
          await fetch(page);
        } catch (error) {
          console.log(`Failed to preload ${page}:`, error);
        }
      }
      
      toast.success('Cache refreshed successfully!');
      await loadCacheInfo();
    } catch (error) {
      console.error('Error refreshing cache:', error);
      toast.error('Failed to refresh cache');
    } finally {
      setIsLoading(false);
    }
  };

  const formatUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname || url;
    } catch {
      return url;
    }
  };

  if (!('caches' in window)) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Cache Management</h3>
            <p className="text-sm text-gray-600">Manage offline content and cache</p>
          </div>
        </div>
        
        <button
          onClick={refreshCache}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Cache'}
        </button>
      </div>

      {/* Cache Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Static Cache</h4>
              <p className="text-xs text-gray-600">App resources and assets</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">{cacheInfo.staticCache.size}</div>
              <div className="text-xs text-gray-500">items</div>
            </div>
          </div>
          <button
            onClick={() => clearCache('static-v1.0.0')}
            disabled={isLoading}
            className="mt-2 w-full px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            Clear Static Cache
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Dynamic Cache</h4>
              <p className="text-xs text-gray-600">Pages and API responses</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">{cacheInfo.dynamicCache.size}</div>
              <div className="text-xs text-gray-500">items</div>
            </div>
          </div>
          <button
            onClick={() => clearCache('dynamic-v1.0.0')}
            disabled={isLoading}
            className="mt-2 w-full px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            Clear Dynamic Cache
          </button>
        </div>
      </div>

      {/* Cached Pages */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Cached Pages</h4>
        
        {cacheInfo.dynamicCache.items.length > 0 ? (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {cacheInfo.dynamicCache.items.map((url, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                <span className="text-gray-700 font-mono">{formatUrl(url)}</span>
                <span className="text-gray-500">Cached</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 text-sm">
            No pages cached yet. Visit pages to cache them for offline use.
          </div>
        )}
      </div>

      {/* Clear All Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={clearAllCaches}
          disabled={isLoading}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          Clear All Caches
        </button>
      </div>
    </div>
  );
};

export default PWACacheManager; 