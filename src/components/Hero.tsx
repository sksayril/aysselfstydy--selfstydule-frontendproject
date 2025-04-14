import React, { useState, useEffect } from 'react';
import { GraduationCap, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleMockTestClick = () => {
    navigate('/quiz');
  };

  // Fetch banner images from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.notesmarket.in/api/get/hero-banners');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch banners: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          setHeroImages(result.data);
        } else {
          // Fallback images in case API returns empty data
          setHeroImages([
            {
              title: "Default Banner 1",
              desktop: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
              mobile: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
              url: "https://www.example.com/banner1"
            },
            {
              title: "Default Banner 2",
              desktop: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
              mobile: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
              url: "https://www.example.com/banner2"
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching banner images:", err);
        setError(err.message);
        // Set fallback images
        setHeroImages([
          {
            title: "Default Banner 1",
            desktop: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
            mobile: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
            url: "https://www.example.com/banner1"
          },
          {
            title: "Default Banner 2",
            desktop: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
            mobile: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
            url: "https://www.example.com/banner2"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Automatic image change every 5 seconds
  useEffect(() => {
    if (heroImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Manual navigation functions
  const goToPrevious = () => {
    if (heroImages.length === 0) return;
    setCurrentImage((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (heroImages.length === 0) return;
    setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-0 mt-0">
        {/* Top banner to fill the gap */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span className="font-medium">Note's Market Means Toppers Choice</span>
          </div>
        </div>
        
        {/* Specific mobile announcement banner */}
        <div className="bg-blue-600 text-white text-center py-2 px-4 md:hidden">
          <p className="text-sm font-medium">Unlock premium study materials for 100% free!</p>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-32">
            <div className="animate-pulse text-blue-600">Loading banners...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && heroImages.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-0 mt-0">
        {/* Top banner to fill the gap */}
        
        
        {/* Specific mobile announcement banner */}
        <div className="bg-blue-600 text-white text-center py-2 px-4 md:hidden">
          <p className="text-sm font-medium">Unlock premium study materials for 100% free!</p>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-32 text-red-500">
            <p>Error loading banners: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-50 via-teal-50 to-blue-50 py-0 md:py-0 mt-0">
      {/* Top banner to fill the gap - visible on all screens */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          <span className="font-medium">Note's Market Means Toppers Choice</span>
          <span className="hidden md:inline">| Access Free Study Materials</span>
        </div>
      </div>
      
      {/* Specific mobile announcement banner */}
      <div className="bg-blue-600 text-white text-center py-2 px-4 md:hidden">
        <p className="text-sm font-medium">Unlock premium study materials for 100% free!</p>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content - First on mobile, left on desktop */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 order-1 md:order-1">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-700">
            India's <span className="text-blue-600">#No.1</span> Best Free Online Learning Platform
            </h1>
            <p className="text-gray-600 mb-2">
              <span className="text-yellow-600 font-semibold">Get Free Access of all Toppers Notes, HandWritten Notes, PYQ'S, NCERT TextBooks, NCERT Solutions & Many More.</span>
            </p>

            <p className="text-lg mb-4 text-gray-700">
            Trusted By More Than <span className="text-blue-600 font-bold">3Cr+ Students & Educators.</span>
            </p>
            <button 
              onClick={handleMockTestClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center transform transition-all duration-300 hover:scale-105 shadow-md"
            >
              <GraduationCap className="mr-2" />
              FREE - Mock Test
            </button>
          </div>

          {/* Image Carousel - Second on mobile, right on desktop */}
          <div className="w-full md:w-2/3 relative rounded-lg overflow-hidden shadow-xl order-2 md:order-2 mt-4 md:mt-0">
            <div className="relative overflow-hidden w-full" style={{ paddingBottom: "40%" }}>
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                    index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <a 
                    href={image.url || "#"} 
                    target="_blank" 
                    rel="nofollow sponsored" 
                    onClick={(e) => !image.url && e.preventDefault()}
                    className="block w-full h-full"
                    data-campid="62"
                    data-source="slider"
                  >
                    {/* Mobile image */}
                    <img
                      src={image.mobile}
                      alt={image.title || `Banner ${index + 1}`}
                      className="w-full h-full object-cover md:hidden"
                    />

                    {/* Desktop image */}
                    <img
                      src={image.desktop}
                      alt={image.title || `Banner ${index + 1}`}
                      className="w-full h-full object-cover hidden md:block"
                    />
                  </a>
                </div>
              ))}

              {/* Navigation buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 text-blue-600 transition-all duration-200 hover:scale-110"
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10 text-blue-600 transition-all duration-200 hover:scale-110"
                aria-label="Next banner"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Indicator dots */}
              {heroImages.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImage ? 'bg-white scale-125' : 'bg-white/50'
                      }`}
                      aria-label={`Go to banner ${index + 1}`}
                    ></button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;