import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, SendHorizontal, Facebook, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

// Create the SocialMediaCarousel component
const SocialMediaCarousel = () => {
  const socialScrollRef = useRef(null);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const autoScrollIntervalRef = useRef(null);

  // Social media platforms with icons, colors, and links
  const socialPlatforms = [
    { 
      name: 'WhatsApp', 
      color: 'bg-gradient-to-r from-green-400 to-green-600', 
      icon: <MessageCircle className="w-5 h-5" />,
      link: 'https://whatsapp.com/channel/0029VbAgHAAGk1FjmR9p4v0V'
    },
    { 
      name: 'Telegram', 
      color: 'bg-gradient-to-r from-blue-400 to-blue-600', 
      icon: <SendHorizontal className="w-5 h-5" />,
      link: 'https://t.me/notesmarketofficial' 
    },
    { 
      name: 'Facebook', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-700', 
      icon: <Facebook className="w-5 h-5" />,
      link: 'https://www.instagram.com/notes.market?igsh=MTVjOHNla2EzcHpzYg==' 
    },
    { 
      name: 'Instagram', 
      color: 'bg-gradient-to-r from-pink-500 to-purple-600', 
      icon: <Instagram className="w-5 h-5" />,
      link: 'https://www.instagram.com/notes.market?igsh=MTVjOHNla2EzcHpzYg==' 
    },
    { 
      name: 'YouTube', 
      color: 'bg-gradient-to-r from-red-500 to-red-700', 
      icon: <Youtube className="w-5 h-5" />,
      link: 'https://t.me/notesmarketofficial' 
    },
    { 
      name: 'Twitter', 
      color: 'bg-gradient-to-r from-blue-300 to-blue-500', 
      icon: <Twitter className="w-5 h-5" />,
      link: 'https://www.instagram.com/notes.market?igsh=MTVjOHNla2EzcHpzYg==' 
    },
    { 
      name: 'LinkedIn', 
      color: 'bg-gradient-to-r from-blue-600 to-blue-800', 
      icon: <Linkedin className="w-5 h-5" />,
      link: 'https://whatsapp.com/channel/0029VbAgHAAGk1FjmR9p4v0V' 
    },
    { 
      name: 'Pinterest', 
      color: 'bg-gradient-to-r from-red-500 to-red-600', 
      icon: <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>,
      link: 'https://whatsapp.com/channel/0029VbAgHAAGk1FjmR9p4v0V' 
    }
  ];

  // Setup auto-scrolling for social media carousel
  useEffect(() => {
    if (autoScrollActive && socialScrollRef.current) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (socialScrollRef.current) {
          // Check if we're at the end and need to reset
          const { scrollLeft, scrollWidth, clientWidth } = socialScrollRef.current;

          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            // We're at the end, reset to start
            socialScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Continue scrolling
            socialScrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
          }
        }
      }, 3000);
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [autoScrollActive]);

  const scrollSocial = (direction) => {
    if (socialScrollRef.current) {
      const scrollAmount = direction === 'next' ? 300 : -300;
      socialScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Pause auto-scroll when user interacts with arrows
  const handleSocialNavigation = (direction) => {
    // Temporarily disable auto-scrolling
    setAutoScrollActive(false);
    scrollSocial(direction);

    // Re-enable auto-scrolling after a delay
    setTimeout(() => {
      setAutoScrollActive(true);
    }, 5000);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-2 relative inline-block">
        <span >Stay Connected With Us On Our Social Media Handles</span>
        {/* <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-300 to-purple-300 opacity-50 z-0 rounded-full"></span> */}
      </h2>
      <h3 className="text-3xl font-bold mt-2">
        <span className="text-blue-600">Notes'</span>
        <span className="text-green-600">Market</span>
      </h3>
      <p className="text-gray-700 mt-4 max-w-xl mx-auto text-lg">
        
      </p>
    </div>
    

        <div className="relative">
          <div
            className="overflow-x-auto flex flex-nowrap space-x-4 py-4 scrollbar-hide"
            ref={socialScrollRef}
            onMouseEnter={() => setAutoScrollActive(false)}
            onMouseLeave={() => setAutoScrollActive(true)}
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Duplicate platforms for seamless loop */}
            {socialPlatforms.concat(socialPlatforms).map((social, index) => (
              <a
                key={`${social.name}-${index}`}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-none ${social.color} text-white py-4 px-6 rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105 min-w-[160px] flex items-center justify-center`}
              >
                <div className="mr-2">{social.icon}</div>
                <span>{social.name}</span>
              </a>
            ))}
          </div>

          {/* Social Carousel Controls */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 z-10"
            onClick={() => handleSocialNavigation('prev')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 z-10"
            onClick={() => handleSocialNavigation('next')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCarousel;