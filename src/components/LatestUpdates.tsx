import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, X, ArrowRight } from 'lucide-react';

const LatestUpdates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Enhanced updates with more details but only one image per update
  const updates = [
    {
      id: 1,
      title: 'Kerala Plus Two Biology 2025',
      subtitle: 'Chapter-Wise PYQs & Fast Revision Notes',
      image: 'https://images.unsplash.com/photo-1579165466991-467135ad3110?ixlib=rb-4.0.3',
      date: '6 March, 2025',
      readTime: '5 min read',
      content: `
        <h2>Kerala Plus Two Biology 2025: Comprehensive Study Material</h2>
        <p>Our chapter-wise PYQs and fast revision notes for Kerala Plus Two Biology 2025 have been designed by top educators to help students excel in their board exams.</p>
        <h3>What's Included:</h3>
        <ul>
          <li>Complete chapter-wise Previous Year Questions from 2015-2024</li>
          <li>Detailed solutions with step-by-step explanations</li>
          <li>Important diagrams and illustrations</li>
          <li>Quick revision notes for last-minute preparation</li>
          <li>Important questions likely to appear in 2025 exams</li>
        </ul>
        <p>These materials cover all important chapters including Cell Biology, Genetics, Human Physiology, Biotechnology, Ecology, and more.</p>
        <p>Download now to boost your exam preparation!</p>
      `
    },
    {
      id: 2,
      title: 'Maharashtra Board 12th Geography 2025',
      subtitle: 'Last-Minute Revision Notes & Practice',
      image: 'https://images.unsplash.com/photo-1576334761529-0c2f3d3d8b95?ixlib=rb-4.0.3',
      date: '6 March, 2025',
      readTime: '6 min read',
      content: `
        <h2>Maharashtra Board 12th Geography 2025: Exam Preparation Kit</h2>
        <p>Prepare effectively for your Maharashtra Board 12th Geography exam with our comprehensive last-minute revision notes and practice materials.</p>
        <h3>Key Features:</h3>
        <ul>
          <li>Concise revision notes covering all 10 chapters</li>
          <li>Topic-wise practice questions with solutions</li>
          <li>Important map-based questions and diagrams</li>
          <li>Chapter-wise weightage analysis</li>
          <li>Previous 5 years' question papers with solutions</li>
        </ul>
        <p>Our materials focus on both physical and human geography components, ensuring complete coverage of the syllabus.</p>
        <p>Start your revision today for better results!</p>
      `
    },
    {
      id: 3,
      title: 'TN SSLC 10th Maths 2025',
      subtitle: 'Important Questions & Answers for Final Revision',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3',
      date: '6 March, 2025',
      readTime: '7 min read',
      content: `
        <h2>TN SSLC 10th Maths 2025: Comprehensive Revision Material</h2>
        <p>Excel in your Tamil Nadu SSLC 10th Mathematics examination with our carefully curated important questions and detailed answers.</p>
        <h3>What You'll Get:</h3>
        <ul>
          <li>Chapter-wise important questions with detailed solutions</li>
          <li>Formula sheets for quick revision</li>
          <li>Step-by-step solved examples for complex problems</li>
          <li>Tips and tricks for solving problems quickly</li>
          <li>Practice sets modeled on the latest exam pattern</li>
        </ul>
        <p>Our materials cover all key areas including Algebra, Geometry, Trigonometry, Statistics, and Probability with special focus on frequently asked concepts.</p>
        <p>Boost your confidence and improve your scores with our comprehensive study material!</p>
      `
    },
    {
      id: 4,
      title: 'CBSE Class 12 Physics',
      subtitle: 'Electrostatics and Current Electricity Notes',
      image: 'https://images.unsplash.com/photo-1508014091798-4cb07562d6a5?ixlib=rb-4.0.3',
      date: '5 March, 2025',
      readTime: '8 min read',
      content: `
        <h2>CBSE Class 12 Physics: Electrostatics and Current Electricity</h2>
        <p>Master two of the most important chapters in CBSE Class 12 Physics with our detailed notes and solved examples.</p>
        <h3>Topics Covered:</h3>
        <ul>
          <li>Electric Charges and Fields</li>
          <li>Electrostatic Potential and Capacitance</li>
          <li>Current Electricity and Ohm's Law</li>
          <li>Kirchhoff's Laws and Electric Circuits</li>
          <li>Wheatstone Bridge and Potentiometer applications</li>
        </ul>
        <p>Each concept is explained in a clear, concise manner with appropriate diagrams and mathematical derivations.</p>
        <p>These notes have been prepared by experienced physics teachers to help students achieve excellent marks in board examinations.</p>
      `
    },
  ];

  // Set up auto-scrolling
  useEffect(() => {
    if (isAutoPlay) {
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

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600">
              LATEST UPDATES
            </h2>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            SEE ALL
            <ArrowRight className="ml-1 w-4 h-4" />
          </button>
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
                key={update.id}
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
        </div>
      </div>

      {/* Update Modal Popup - Simplified with just one image */}
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
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: selectedUpdate.content }}></div>

                <div className="mt-6 flex justify-center">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                    Download Materials
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
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
