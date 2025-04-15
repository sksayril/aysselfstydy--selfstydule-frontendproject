import React, { useState } from 'react';
import { X } from 'lucide-react';

const NotificationBanner = ({ url = "https://example.com/application" }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent redirection when clicking the close button
    setIsVisible(false);
  };

  const handleClick = () => {
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div 
      className="relative bg-amber-100 px-4 py-3 cursor-pointer"
      onClick={handleClick}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center pr-8">
          <p className="text-amber-800 font-medium">
            Woxsen University Application 2025 Open, upto 50% Scholarship - Apply Now - Hurry Up
          </p>
        </div>
        <button 
          onClick={handleClose} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-800 hover:text-amber-900"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;