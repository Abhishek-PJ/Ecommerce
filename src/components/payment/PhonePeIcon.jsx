import React from 'react';

export const PhonePeIcon = ({ className = "w-8 h-8" }) => {
    return (
        <svg 
            className={className} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="24" height="24" rx="12" fill="#5F259F"/>
            <path 
                d="M7.5 8.5C7.5 7.67157 8.17157 7 9 7H15C15.8284 7 16.5 7.67157 16.5 8.5V15.5C16.5 16.3284 15.8284 17 15 17H9C8.17157 17 7.5 16.3284 7.5 15.5V8.5Z" 
                fill="white"
            />
            <path 
                d="M9.5 9.5C9.5 9.22386 9.72386 9 10 9H14C14.2761 9 14.5 9.22386 14.5 9.5V14.5C14.5 14.7761 14.2761 15 14 15H10C9.72386 15 9.5 14.7761 9.5 14.5V9.5Z" 
                fill="#5F259F"
            />
            <path 
                d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V11Z" 
                fill="white"
            />
            <circle cx="12" cy="12" r="1" fill="white"/>
        </svg>
    );
}; 