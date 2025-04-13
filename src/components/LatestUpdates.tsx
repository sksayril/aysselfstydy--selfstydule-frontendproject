import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, X, ArrowRight } from 'lucide-react';

const LatestUpdates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch updates from API
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.notesmarket.in/api/latest-updates');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setUpdates(result.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch updates:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Set up auto-scrolling
  useEffect(() => {
    if (isAutoPlay && updates.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % updates.length);
        if (scrollRef.current) {
          const nextCard = scrollRef.current.children[
            (activeIndex + 1) % updates.length
          ];
          if (nextCard) {
            scrollRef.current.scrollTo({
              left: nextCard.offsetLeft - 20,
              behavior: 'smooth'
            });
          }
        }
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isAutoPlay, updates.length]);

  const handlePrevious = () => {
    setIsAutoPlay(false);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? updates.length - 1 : prevIndex - 1));

    setTimeout(() => {
      setIsAutoPlay(true);
    }, 10000);

    if (scrollRef.current) {
      const prevCard = scrollRef.current.children[
        activeIndex === 0 ? updates.length - 1 : activeIndex - 1
      ];
      if (prevCard) {
        scrollRef.current.scrollTo({
          left: prevCard.offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % updates.length);

    setTimeout(() => {
      setIsAutoPlay(true);
    }, 10000);

    if (scrollRef.current) {
      const nextCard = scrollRef.current.children[
        (activeIndex + 1) % updates.length
      ];
      if (nextCard) {
        scrollRef.current.scrollTo({
          left: nextCard.offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
  };

  const openUpdateModal = (update) => {
    setSelectedUpdate(update);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeUpdateModal = () => {
    setSelectedUpdate(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  if (loading) {
    return (
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600">
              LATEST UPDATES
            </h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600">
              LATEST UPDATES
            </h2>
          </div>
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            <p>Failed to load updates. Please try again later.</p>
            <p className="text-sm mt-2">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600">
              LATEST UPDATES
            </h2>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>No updates available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600">
              LATEST UPDATES
            </h2>
          </div>
          {/* <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            SEE ALL
            <ArrowRight className="ml-1 w-4 h-4" />
          </button> */}
        </div>

        <div className="relative">
          <div
            className="flex space-x-6 overflow-x-auto pb-6 hide-scrollbar scroll-smooth"
            ref={scrollRef}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {updates.map((update, index) => (
              <div
                key={update._id}
                className={`min-w-[300px] bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  index === activeIndex ? 'ring-2 ring-blue-500 scale-102' : ''
                }`}
                onClick={() => openUpdateModal(update)}
              >
                <div className="relative">
                  <img
                    src={update.image}
                    alt={update.title}
                    className="w-full h-48 object-cover"
                  />
                  {index === activeIndex && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Study Material
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-500 text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {update.readTime || '5 min read'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{update.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{update.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{update.date}</span>
                    </div>
                    <button className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {updates.length > 1 && (
            <>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors z-10"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors z-10"
                onClick={handleNext}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicator dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {updates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsAutoPlay(false);

                      setTimeout(() => {
                        setIsAutoPlay(true);
                      }, 10000);

                      if (scrollRef.current) {
                        const selectedCard = scrollRef.current.children[index];
                        if (selectedCard) {
                          scrollRef.current.scrollTo({
                            left: selectedCard.offsetLeft - 20,
                            behavior: 'smooth'
                          });
                        }
                      }
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Update Modal Popup */}
      {selectedUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={closeUpdateModal}>
          <div
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with close button */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{selectedUpdate.title}</h2>
              <button
                onClick={closeUpdateModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow">
              {/* Single Image */}
              <div className="relative">
                <img
                  src={selectedUpdate.image}
                  alt={selectedUpdate.title}
                  className="w-full h-[300px] object-cover"
                />
              </div>

              {/* Update Content */}
              <div className="p-6">
                <div className="flex items-center mb-4 space-x-4">
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    Study Material
                  </span>
                  <div className="text-gray-500 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {selectedUpdate.date}
                  </div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedUpdate.readTime}
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-blue max-w-none">
                  {selectedUpdate.content}
                </div>

                <div className="mt-6 flex justify-center">
                  {/* <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                    Download Materials
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestUpdates;