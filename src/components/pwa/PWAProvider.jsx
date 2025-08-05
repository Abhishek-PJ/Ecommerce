import React, { useEffect, useState } from 'react';
import PWAInstallPrompt from './PWAInstallPrompt';
import PWANotification from './PWANotification';
import PWAOfflineIndicator from './PWAOfflineIndicator';
import PWACacheManager from './PWACacheManager';
import toast from 'react-hot-toast';

const PWAProvider = ({ children }) => {
  const [isServiceWorkerRegistered, setIsServiceWorkerRegistered] = useState(false);

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);
        setIsServiceWorkerRegistered(true);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification(registration);
            }
          });
        });

        // Handle service worker updates
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('New service worker activated');
          toast.success('App updated! New features are now available.');
        });

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  const showUpdateNotification = (registration) => {
    toast.success(
      'New version available!',
      {
        duration: 5000,
        icon: '🔄',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
  };

  return (
    <>
      {children}
      
      {/* PWA Components */}
      <PWAInstallPrompt />
      <PWAOfflineIndicator />
      
      {/* Show notification component only if service worker is registered */}
      {isServiceWorkerRegistered && <PWANotification />}
    </>
  );
};

// Export PWA components for use in other parts of the app
export { PWACacheManager, PWAInstallPrompt, PWANotification, PWAOfflineIndicator };
export default PWAProvider; 