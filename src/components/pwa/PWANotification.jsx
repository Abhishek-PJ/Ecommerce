import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PWANotification = () => {
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setIsSupported(true);
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!isSupported) {
      toast.error('Notifications are not supported in this browser');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        toast.success('Notification permission granted!');
        // Register service worker for push notifications
        registerServiceWorker();
      } else if (permission === 'denied') {
        toast.error('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to request notification permission');
    }
  };

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);

        // Subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY') // Replace with your VAPID key
        });

        console.log('Push notification subscription:', subscription);
        toast.success('Push notifications enabled!');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        toast.error('Failed to enable push notifications');
      }
    }
  };

  const sendTestNotification = () => {
    if (notificationPermission === 'granted') {
      const notification = new Notification('E-Commerce Store', {
        body: 'Welcome to our store! Check out our latest products.',
        icon: '/icons/icon-192x192.svg',
        badge: '/icons/icon-72x72.svg',
        tag: 'welcome-notification',
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'View Products',
            icon: '/icons/icon-96x96.svg'
          },
          {
            action: 'dismiss',
            title: 'Dismiss',
            icon: '/icons/icon-96x96.svg'
          }
        ]
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
        window.location.href = '/allproduct';
      };

      notification.onactionclick = (event) => {
        if (event.action === 'view') {
          window.focus();
          window.location.href = '/allproduct';
        }
        notification.close();
      };
    }
  };

  // Convert VAPID key from base64 to Uint8Array
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  if (!isSupported) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Push Notifications</h3>
            <p className="text-xs text-gray-600">
              Get notified about new products, offers, and order updates
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          {notificationPermission === 'default' && (
            <button
              onClick={requestNotificationPermission}
              className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enable
            </button>
          )}

          {notificationPermission === 'granted' && (
            <>
              <button
                onClick={sendTestNotification}
                className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Test
              </button>
              <div className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-lg">
                Enabled
              </div>
            </>
          )}

          {notificationPermission === 'denied' && (
            <div className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-lg">
              Blocked
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWANotification; 