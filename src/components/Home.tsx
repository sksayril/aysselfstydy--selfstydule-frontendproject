import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import LatestUpdates from './LatestUpdates';
import SocialMediaCarousel from './SocialMediaCarousel';
import {
  Book,
  ArrowRight,
  Download,
  Users,
  BookOpen,
  Award,
  BrainCircuit,
  BookCheck,
  FileText
} from 'lucide-react';
import bannermobileapp from '/pragraph.png';
const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.notesmarket.in/api/categories/parents');
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

  const handleMaterialClick = (categoryId: string) => {
    navigate(`/study-materials/${categoryId}`);
  };

  // Map category names to colors for visual distinction
  const getCategoryColor = (index: number) => {
    const colors = ['bg-gradient-to-r from-blue-500 to-blue-700',
                   'bg-gradient-to-r from-green-500 to-green-700',
                   'bg-gradient-to-r from-purple-500 to-purple-700',
                   'bg-gradient-to-r from-orange-500 to-orange-700',
                   'bg-gradient-to-r from-red-500 to-red-700',
                   'bg-gradient-to-r from-indigo-500 to-indigo-700'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-gray-50">
      
      <Hero />

      {/* Latest Updates Section with Animation */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-12">
  <div className="container mx-auto px-4">
    <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-lg mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m0-4h.01M12 8v4m0 4h.01m-6.938 4H19.938c1.118 0 2.062-.895 2.062-2V6c0-1.105-.944-2-2.062-2H5.062C3.944 4 3 4.895 3 6v12c0 1.105.944 2 2.062 2z" />
          </svg>
          Latest Updates
        </button>
      </div>
      <LatestUpdates />
    </div>
  </div>
</div>



      {/* Study Materials Section (No Carousel) */}
      <div className="py-16 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
  <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg mx-auto">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6a2 2 0 012 2v14a2 2 0 01-2 2z" />
    </svg>
    FREE Study Materials
  </button>
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

      {/* Social Media Carousel Component */}
      <SocialMediaCarousel />

      {/* App Download Section */}
      <div className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">Mobile App</div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-blue-600">Notes</span>
                <span className="text-green-600">Market</span>
                {' '}is Coming Soon
              </h2>
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Play Store</h3>
              <p className="text-gray-600 mb-8 text-lg">
              Dear Students Nothing Changes If Nothing Changes, So We Are Coming Very Soon With Our App To Provide You Easy Access of Free Study Materials Anytime Anywhere.
              </p>
              <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 transform hover:scale-105 flex items-center">
                <Download className="mr-2 w-5 h-5" />
                <span>Coming Soon</span>
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 absolute inset-0 opacity-10"></div>
              <img
                src={bannermobileapp}
                alt="Mobile App"
                className="w-full h-full object-cover object-center"
              />

              {/* App features overlay */}
              {/* <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-3">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm text-sm">
                  <span className="font-medium text-green-600">✓</span> Offline Access
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm text-sm">
                  <span className="font-medium text-green-600">✓</span> Practice Tests
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm text-sm">
                  <span className="font-medium text-green-600">✓</span> Interactive Learning
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section with Animation */}
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
  <div className="container mx-auto px-4">
    
    <div className="text-center mb-12">
    <button className="flex items-center gap-3 px-6 py-3 rounded-xl text-white font-semibold text-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mx-auto">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 text-white align-middle -mt-[1px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M4 4.5A2.5 2.5 0 016.5 7H20" />
    <path d="M4 12h16" />
  </svg>
  Our Numbers Are Loyal For Us
</button>


        <div className="mt-6">
      <p className="text-3xl font-bold text-blue-600">5Cr+ Trusted Students & Educators</p>
    </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-orange-500" />
        </div>
        <div className="text-5xl font-bold text-orange-500 mb-2">2Cr+</div>
        <div className="text-gray-600 font-medium">Tests Attempted</div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-green-500" />
        </div>
        <div className="text-5xl font-bold text-green-500 mb-2">3Cr+</div>
        <div className="text-gray-600 font-medium">Monthly Visitor's</div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  </div>
  <div className="text-5xl font-bold text-yellow-500 mb-2">500K+</div>
  <div className="text-gray-600 font-medium">Top Reviews</div>
</div>
    </div>
  </div>
</div>

      {/* Featured Programs Section */}
      <div className="py-16 bg-gradient-to-t from-green-50 to-white">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
  <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mx-auto mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L6 12.75M6 12.75L9.75 8.5M6 12.75h12" />
    </svg>
    Featured Programs
  </button>

  <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
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