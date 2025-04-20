import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, ArrowLeft, FileText, Image as ImageIcon, FileIcon, ChevronRight, X, ChevronLeft, ChevronRight as ChevronRightIcon, Bookmark } from 'lucide-react';
import PDFViewer from './PDFViewer';
import type { SubCategory, SubCategoryResponse } from '../types/category';

const StudyMaterials = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [navigationPath, setNavigationPath] = useState<SubCategory[]>([]);
  const [selectedContent, setSelectedContent] = useState<SubCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'images' | 'pdf' | 'all'>('all');
  
  // Image gallery state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxAnimation, setLightboxAnimation] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Ref for top of page scrolling
  const pageTopRef = useRef<HTMLDivElement>(null);

  const API_URL = 'https://api.notesmarket.in/api';

  const scrollToTop = () => {
    pageTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!categoryId) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/categories/subcategories/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch subcategories');
        }
        const data: SubCategoryResponse[] = await response.json();
        setSubcategories(data[0]?.subcategories || []);
        // Scroll to top when new subcategories are loaded
        scrollToTop();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching subcategories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcategories();
    
    // Handle responsive sidebar - keep sidebar open on mobile for visibility
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Keep sidebar visible even on mobile by default
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categoryId]);

  // Determine which content type to show based on availability
  useEffect(() => {
    if (selectedContent?.content) {
      const { text, imageUrls, pdfUrl } = selectedContent.content;
      
      if (text) {
        setActiveTab('text');
      } else if (imageUrls && imageUrls.length > 0) {
        setActiveTab('images');
      } else if (pdfUrl) {
        setActiveTab('pdf');
      } else {
        setActiveTab('all'); // Will show "No data found" message
      }
    }
  }, [selectedContent]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  const navigateImage = (direction: number) => {
    if (!selectedContent?.content.imageUrls) return;
    
    const imageCount = selectedContent.content.imageUrls.length;
    let newIndex = currentImageIndex + direction;
    
    // Loop around if at the beginning/end
    if (newIndex < 0) newIndex = imageCount - 1;
    if (newIndex >= imageCount) newIndex = 0;
    
    // Set animation direction
    setLightboxAnimation(direction > 0 ? 'slide-left' : 'slide-right');
    setTimeout(() => setLightboxAnimation(''), 300);
    
    setCurrentImageIndex(newIndex);
  };

  const closeLightbox = () => {
    setLightboxAnimation('fade-out');
    setTimeout(() => {
      setLightboxOpen(false);
      setLightboxAnimation('');
    }, 300);
  };

  const handleSubcategoryClick = async (subcategory: SubCategory) => {
    scrollToTop(); // Scroll to top when clicking on any subcategory
    
    if (subcategory.type === 'content') {
      setSelectedContent(subcategory);
      // Don't automatically close sidebar on mobile anymore
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/categories/subcategories/${subcategory._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      const data: SubCategoryResponse[] = await response.json();
      setSubcategories(data[0]?.subcategories || []);
      setNavigationPath(prev => [...prev, subcategory]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = async () => {
    scrollToTop(); // Scroll to top when navigating back
    
    if (selectedContent) {
      setSelectedContent(null);
      setActiveTab('all');
      return;
    }

    if (navigationPath.length === 0) {
      navigate('/');
      return;
    }

    const newPath = [...navigationPath];
    newPath.pop();
    setNavigationPath(newPath);

    if (newPath.length === 0) {
      if (categoryId) {
        const response = await fetch(`${API_URL}/categories/subcategories/${categoryId}`);
        const data: SubCategoryResponse[] = await response.json();
        setSubcategories(data[0]?.subcategories || []);
      }
    } else {
      const lastCategory = newPath[newPath.length - 1];
      const response = await fetch(`${API_URL}/categories/subcategories/${lastCategory._id}`);
      const data: SubCategoryResponse[] = await response.json();
      setSubcategories(data[0]?.subcategories || []);
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const renderContentTabs = () => {
    if (!selectedContent?.content) return null;

    const hasText = !!selectedContent.content.text;
    const hasImages = selectedContent.content.imageUrls?.length > 0;
    const hasPdf = !!selectedContent.content.pdfUrl;

    // No content available
    if (!hasText && !hasImages && !hasPdf) {
      return null;
    }

    return (
      <div className="mb-6 border-b overflow-x-auto py-1">
        <div className="flex space-x-1 md:space-x-4 min-w-max">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 md:px-4 py-2 font-medium transition-colors relative rounded-t-lg ${
              activeTab === 'all'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {hasText && (
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3 md:px-4 py-2 font-medium transition-colors flex items-center space-x-2 rounded-t-lg ${
                activeTab === 'text'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileText size={16} />
              <span>Text</span>
            </button>
          )}
          {hasImages && (
            <button
              onClick={() => setActiveTab('images')}
              className={`px-3 md:px-4 py-2 font-medium transition-colors flex items-center space-x-2 rounded-t-lg ${
                activeTab === 'images'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ImageIcon size={16} />
              <span>Images</span>
            </button>
          )}
          {hasPdf && (
            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-3 md:px-4 py-2 font-medium transition-colors flex items-center space-x-2 rounded-t-lg ${
                activeTab === 'pdf'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileIcon size={16} />
              <span>PDF</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderImageGallery = (imageUrls: string[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {imageUrls.map((url, index) => (
          <div 
            key={index} 
            className="group cursor-pointer relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-w-4 aspect-h-3">
              <img
                src={url}
                alt={`Content image ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-white text-sm font-medium">Image {index + 1}</span>
                <span className="text-white bg-black/50 px-2 py-1 rounded-full text-xs">Click to expand</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderLightbox = () => {
    if (!lightboxOpen || !selectedContent?.content.imageUrls) return null;
    
    const imageUrls = selectedContent.content.imageUrls;
    const currentUrl = imageUrls[currentImageIndex];
    
    return (
      <div 
        className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center touch-none"
        onClick={(e) => {
          // Close lightbox if clicked outside the image
          if (e.target === e.currentTarget) {
            closeLightbox();
          }
        }}
      >
        <div className={`relative w-full h-full flex flex-col ${lightboxAnimation}`}>
          {/* Controls header */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-white font-medium flex items-center">
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {currentImageIndex + 1} / {imageUrls.length}
              </span>
            </div>
            <button 
              onClick={closeLightbox}
              className="text-white hover:text-gray-300 bg-black/30 hover:bg-black/50 transition-colors p-2 rounded-full backdrop-blur-sm"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Main image with swipe detection */}
          <div 
            className="flex-1 flex items-center justify-center p-4"
          >
            <img 
              src={currentUrl} 
              alt={`Full view ${currentImageIndex + 1}`}
              className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${lightboxAnimation}`}
            />
          </div>
          
          {/* Navigation buttons - larger touch targets for mobile */}
          <button 
            className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 md:p-4 text-white transition-colors backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 md:p-4 text-white transition-colors backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
            aria-label="Next image"
          >
            <ChevronRightIcon size={24} />
          </button>
          
          {/* Thumbnails with improved scrolling */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-2 overflow-x-auto">
            <div className="flex space-x-2 justify-center">
              {imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? 'border-blue-500 scale-110 z-10' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={url} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTextContent = (text: string) => {
    return (
      <div className="prose max-w-none bg-white rounded-xl p-6 shadow-md">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
  };

  const renderContent = () => {
    if (!selectedContent?.content) return null;

    const { text, imageUrls, pdfUrl } = selectedContent.content;
    const hasText = !!text;
    const hasImages = imageUrls && imageUrls.length > 0;
    const hasPdf = !!pdfUrl;

    // No content available
    if (!hasText && !hasImages && !hasPdf) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-xl p-6">
          <FileText className="w-12 h-12 mb-4 text-gray-400" />
          <p className="font-medium">No data found for this content</p>
          <p className="text-sm text-gray-400 mt-2">Try selecting another category</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'text':
        return text ? renderTextContent(text) : null;
      case 'images':
        return imageUrls && imageUrls.length > 0 ? (
          renderImageGallery(imageUrls)
        ) : null;
      case 'pdf':
        return pdfUrl ? (
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <PDFViewer url={pdfUrl} />
          </div>
        ) : null;
      default:
        // "All" tab or fallback - show content in priority order
        return (
          <div className="space-y-8">
            {hasText && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <FileText className="mr-2 text-blue-500" size={20} />
                  Text Content
                </h3>
                {renderTextContent(text)}
              </div>
            )}
            
            {hasImages && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <ImageIcon className="mr-2 text-blue-500" size={20} />
                  Images ({imageUrls.length})
                </h3>
                {renderImageGallery(imageUrls)}
              </div>
            )}
            
            {hasPdf && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <FileIcon className="mr-2 text-blue-500" size={20} />
                  PDF Document
                </h3>
                <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <PDFViewer url={pdfUrl} />
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" ref={pageTopRef}>
      {/* Header with navigation breadcrumbs */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="ml-3 flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {navigationPath.length > 0 ? (
                navigationPath.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 text-sm md:text-base font-medium">{item.name}</span>
                  </React.Fragment>
                ))
              ) : (
                <span className="text-gray-600 text-sm md:text-base font-medium">Study Materials</span>
              )}
              
              {selectedContent && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-blue-600 text-sm md:text-base font-medium truncate max-w-xs">
                    {selectedContent.name}
                  </span>
                </>
              )}
            </div>
            
            {/* Mobile sidebar toggle - now toggles visibility state */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="ml-auto md:hidden flex items-center justify-center p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bookmark className="w-5 h-5" />
              <span className="ml-1 text-sm font-medium">
                {isSidebarOpen ? "Hide Categories" : "Show Categories"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Content Area - Modified grid layout for mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
          {/* Navigation List - Always visible in both mobile and desktop views */}
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block md:col-span-1 order-2 md:order-1`}>
            <div className="bg-white rounded-xl shadow-sm p-4 md:sticky md:top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Categories</h2>
                {/* Close button for mobile now toggling visibility */}
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden p-1 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse flex items-center p-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="ml-auto h-5 w-5 rounded-full bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-600 bg-red-50 p-3 rounded-lg flex items-center text-sm">
                  <span className="font-medium">{error}</span>
                </div>
              ) : subcategories.length === 0 ? (
                <div className="text-gray-500 p-3 text-center">
                  No categories found
                </div>
              ) : (
                <div className="space-y-1">
                  {subcategories.map((subcategory) => (
                    <button
                      key={subcategory._id}
                      onClick={() => handleSubcategoryClick(subcategory)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-between group ${
                        selectedContent?._id === subcategory._id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <span className="font-medium">
                        {subcategory.name}
                      </span>
                      {subcategory.type === 'content' ? (
                        <FileText className={`w-5 h-5 ${
                          selectedContent?._id === subcategory._id 
                            ? 'text-blue-500' 
                            : 'text-gray-400 group-hover:text-gray-600'
                        }`} />
                      ) : (
                        <Book className={`w-5 h-5 ${
                          selectedContent?._id === subcategory._id 
                            ? 'text-blue-500' 
                            : 'text-gray-400 group-hover:text-gray-600'
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Display */}
          <div className="md:col-span-3 order-1 md:order-2">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              {selectedContent ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      {selectedContent.name}
                    </h2>
                    {selectedContent.description && (
                      <p className="mt-2 text-gray-600">{selectedContent.description}</p>
                    )}
                  </div>
                  {renderContentTabs()}
                  <div className="mt-6">
                    {renderContent()}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="bg-blue-50 p-6 rounded-full mb-4">
                    <Book className="w-12 h-12 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Select a category</h3>
                  <p className="text-gray-500 max-w-md">
                    Choose a category from the list to view study materials
                  </p>
                  
                  {/* Mobile-only action button - Just toggle visibility */}
                  {!isSidebarOpen && (
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="mt-6 md:hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Bookmark className="w-5 h-5 mr-2" />
                      Show Categories
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {renderLightbox()}
      
      {/* Add some CSS for animations */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .slide-left {
          animation: slideLeft 0.3s ease-out;
        }
        .slide-right {
          animation: slideRight 0.3s ease-out;
        }
        .fade-out {
          animation: fadeOut 0.3s ease-out;
        }
        @keyframes slideLeft {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default StudyMaterials;