import React, { useState, useEffect } from 'react';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Collection of hero images - optimized for mobile and desktop
  const heroImages = [
    {
      desktop: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobile: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    },
    {
      desktop: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobile: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    },
    {
      desktop: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobile: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    },
    {
      desktop: "https://images.unsplash.com/photo-1629872430082-93d8912beccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobile: "https://images.unsplash.com/photo-1629872430082-93d8912beccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    }
  ];

  // Automatic image change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Manual navigation functions
  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              India's <span className="text-blue-600">#1</span> Online Learning Platform
            </h1>
            <p className="text-gray-600 mb-6">
              Free online access to NCERT textbook & more.
            </p>
            <p className="text-lg mb-8">
              Trusted by <span className="text-blue-600 font-bold">2Cr+ USERS</span>
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center transform transition-all duration-300 hover:scale-105 shadow-md">
              <GraduationCap className="mr-2" />
              FREE - Mock Test
            </button>
          </div>

          {/* Image Carousel - Fixed for mobile */}
          <div className="w-full md:w-1/2 relative rounded-lg overflow-hidden shadow-xl order-1 md:order-2 mb-6 md:mb-0">
            <div className="relative overflow-hidden h-[220px] sm:h-[300px] md:h-[360px] w-full">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                    index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Mobile image */}
                  <img
                    src={image.mobile}
                    alt={`Learning environment ${index + 1}`}
                    className="w-full h-full object-cover md:hidden"
                  />

                  {/* Desktop image */}
                  <img
                    src={image.desktop}
                    alt={`Learning environment ${index + 1}`}
                    className="w-full h-full object-cover hidden md:block"
                  />
                </div>
              ))}

              {/* Image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"></div>

              {/* Navigation buttons - Adjusted size for mobile */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md z-10 text-blue-600 transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md z-10 text-blue-600 transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Indicator dots */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
