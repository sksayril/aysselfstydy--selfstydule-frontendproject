import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import LatestUpdates from './LatestUpdates';
import {
  Book,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Download,
  Users,
  BookOpen,
  Award,
  BrainCircuit,
  BookOpenCheck,
  BookCheck,
  FileText
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const socialScrollRef = useRef(null);

  // Auto-scroll functionality for social media
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const autoScrollIntervalRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://7cvccltb-3100.inc1.devtunnels.ms/api/categories/parents');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        if (data[0]?.parents) {
          setCategories(data[0].parents);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  const handleMaterialClick = (categoryId) => {
    navigate(`/study-materials/${categoryId}`);
  };

  // Map category names to colors for visual distinction
  const getCategoryColor = (index) => {
    const colors = ['bg-gradient-to-r from-blue-500 to-blue-700',
                   'bg-gradient-to-r from-green-500 to-green-700',
                   'bg-gradient-to-r from-purple-500 to-purple-700',
                   'bg-gradient-to-r from-orange-500 to-orange-700',
                   'bg-gradient-to-r from-red-500 to-red-700',
                   'bg-gradient-to-r from-indigo-500 to-indigo-700'];
    return colors[index % colors.length];
  };

  // Social media platforms with enhanced styling
  const socialPlatforms = [
    { name: 'WhatsApp', color: 'bg-gradient-to-r from-green-400 to-green-600', icon: 'fab fa-whatsapp' },
    { name: 'Telegram', color: 'bg-gradient-to-r from-blue-400 to-blue-600', icon: 'fab fa-telegram' },
    { name: 'Facebook', color: 'bg-gradient-to-r from-blue-500 to-blue-700', icon: 'fab fa-facebook' },
    { name: 'Instagram', color: 'bg-gradient-to-r from-pink-500 to-purple-600', icon: 'fab fa-instagram' },
    { name: 'YouTube', color: 'bg-gradient-to-r from-red-500 to-red-700', icon: 'fab fa-youtube' },
    { name: 'Twitter', color: 'bg-gradient-to-r from-blue-300 to-blue-500', icon: 'fab fa-twitter' },
    { name: 'LinkedIn', color: 'bg-gradient-to-r from-blue-600 to-blue-800', icon: 'fab fa-linkedin' },
    { name: 'Pinterest', color: 'bg-gradient-to-r from-red-500 to-red-600', icon: 'fab fa-pinterest' }
  ];

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
    <div className="bg-gray-50">
      <Hero />

      {/* Latest Updates Section with Animation */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2 relative inline-block">
              <span className="relative z-10">Latest Updates</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-300 opacity-50 z-0"></span>
            </h2>
          </div>
          <LatestUpdates />
        </div>
      </div>

      {/* Study Materials Section (No Carousel) */}
      <div className="py-16 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2 relative inline-block">
              <span className="relative z-10">FREE Study Materials</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-green-300 opacity-50 z-0"></span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Access comprehensive learning resources designed to enhance your educational journey
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="text-center bg-red-50 p-8 rounded-lg shadow-md">
              <div className="text-xl font-medium text-red-600">Error: {error}</div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                  <div
                    key={category._id}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <button
                      onClick={() => handleMaterialClick(category._id)}
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center w-full h-full"
                    >
                      <div className={`${getCategoryColor(index)} p-4 rounded-full shadow-md`}>
                        <Book className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-gray-800 capitalize">{category.name}</h3>
                      <div className="mt-4 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                        FREE Access
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                        Popular Study Resources
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Study Resource Card 1 */}
                      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 transform hover:scale-102 border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">NCERT Solutions</h4>
                            <p className="text-sm text-gray-600 mt-1">Class 6-12 detailed solutions</p>
                          </div>
                        </div>
                      </div>

                      {/* Study Resource Card 2 */}
                      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 transform hover:scale-102 border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Previous Year Papers</h4>
                            <p className="text-sm text-gray-600 mt-1">Last 10 years with solutions</p>
                          </div>
                        </div>
                      </div>

                      {/* Study Resource Card 3 */}
                      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 transform hover:scale-102 border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <Award className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Important Questions</h4>
                            <p className="text-sm text-gray-600 mt-1">Chapter-wise important questions</p>
                          </div>
                        </div>
                      </div>

                      {/* Study Resource Card 4 */}
                      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 transform hover:scale-102 border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="bg-orange-100 p-2 rounded-lg">
                            <BrainCircuit className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Concept Maps</h4>
                            <p className="text-sm text-gray-600 mt-1">Visual learning aids for quick revision</p>
                          </div>
                        </div>
                      </div>

                      {/* Study Resource Card 5 */}
                      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 transform hover:scale-102 border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="bg-red-100 p-2 rounded-lg">
                            <BookCheck className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Revision Notes</h4>
                            <p className="text-sm text-gray-600 mt-1">Comprehensive chapter summaries</p>
                          </div>
                        </div>
                      </div>

                      {/* Study Resource Card 6 */}
                      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 transform hover:scale-102 border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="bg-teal-100 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Practice Tests</h4>
                            <p className="text-sm text-gray-600 mt-1">Self-assessment quizzes by chapter</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-blue-600">Pro tip:</span> Add resources to your favorites for quick access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Social Connect Carousel Section with Auto-Scroll */}
      <div className="py-16 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2 relative inline-block">
              <span className="relative z-10">Stay Connected With</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-300 opacity-50 z-0"></span>
            </h2>
            <h3 className="text-3xl font-bold mt-2">
              <span className="text-blue-600">Self</span>
              <span className="text-green-600">Studys</span>
            </h3>
          </div>

          <div className="relative">
            <div
              className="overflow-x-auto hide-scrollbar flex flex-nowrap space-x-4 py-4"
              ref={socialScrollRef}
              onMouseEnter={() => setAutoScrollActive(false)}
              onMouseLeave={() => setAutoScrollActive(true)}
            >
              {/* Duplicate platforms at the beginning for seamless loop */}
              {socialPlatforms.concat(socialPlatforms).map((social, index) => (
                <button
                  key={`${social.name}-${index}`}
                  className={`flex-none ${social.color} text-white py-4 px-6 rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105 min-w-[160px] flex items-center justify-center`}
                >
                  <i className={`${social.icon} mr-2`}></i>
                  <span>{social.name}</span>
                </button>
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

      {/* App Download Section */}
      <div className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">Mobile App</div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-blue-600">Self</span>
                <span className="text-green-600">Studys</span>
                {' '}is Available on
              </h2>
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Play Store</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Free online access to NCERT textbooks, solutions, exemplars and more.
                Study anytime, anywhere with our easy-to-use mobile app.
              </p>
              <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 transform hover:scale-105 flex items-center">
                <Download className="mr-2 w-5 h-5" />
                <span>Download App</span>
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 absolute inset-0 opacity-10"></div>
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Mobile App"
                className="w-full h-full object-cover object-center"
              />

              {/* App features overlay */}
              <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-3">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm text-sm">
                  <span className="font-medium text-green-600">✓</span> Offline Access
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm text-sm">
                  <span className="font-medium text-green-600">✓</span> Practice Tests
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm text-sm">
                  <span className="font-medium text-green-600">✓</span> Interactive Learning
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section with Animation */}
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 relative inline-block mx-auto">
            <span className="relative z-10">Our Numbers Speak For Us</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-300 opacity-50 z-0"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-5xl font-bold text-orange-500 mb-2">1Cr+</div>
              <div className="text-gray-600 font-medium">Tests Attempted</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-5xl font-bold text-green-500 mb-2">3Cr+</div>
              <div className="text-gray-600 font-medium">Monthly Page Views</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-5xl font-bold text-purple-500 mb-2">1000K+</div>
              <div className="text-gray-600 font-medium">App Downloads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Programs Section */}
      <div className="py-16 bg-gradient-to-t from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2 relative inline-block">
              <span className="relative z-10">Featured Programs</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-300 opacity-50 z-0"></span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover our most popular courses and special learning programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="h-2 bg-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">Popular</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Exam Preparation</h3>
                <p className="text-gray-600 mb-4">Comprehensive guides and practice tests for all major exams</p>
                <button className="text-blue-600 font-medium flex items-center">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="h-2 bg-green-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">New</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Video Lectures</h3>
                <p className="text-gray-600 mb-4">Expert teachers explaining complex concepts in simple terms</p>
                <button className="text-green-600 font-medium flex items-center">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="h-2 bg-purple-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">Live</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Quizzes</h3>
                <p className="text-gray-600 mb-4">Test your knowledge with our interactive quizzes and assessments</p>
                <button className="text-purple-600 font-medium flex items-center">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
