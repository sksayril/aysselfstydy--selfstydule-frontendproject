import React, { useState, useRef, useEffect } from 'react';

interface PDFViewerProps {
  url: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle iframe loading
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load PDF. Please check your connection and try again.');
  };

  // Zoom in function
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 2.5));
  };

  // Zoom out function
  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };

  // Reset zoom
  const resetZoom = () => {
    setScale(1);
  };

  // Page navigation
  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // Update the Google Docs URL when the page changes
  useEffect(() => {
    if (iframeRef.current && !isLoading) {
      const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true&page=${currentPage}`;
      iframeRef.current.src = googleViewerUrl;
    }
  }, [currentPage, url, isLoading]);

  return (
    <div className="relative w-full bg-gray-100 rounded-lg shadow-xl overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={prevPage}
            className="bg-gray-700 hover:bg-gray-600 rounded p-2 transition-colors"
            title="Previous Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <span className="text-sm font-medium">Page {currentPage}</span>
          
          <button
            onClick={nextPage}
            className="bg-gray-700 hover:bg-gray-600 rounded p-2 transition-colors"
            title="Next Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="bg-gray-700 hover:bg-gray-600 rounded p-2 transition-colors"
            title="Zoom Out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          
          <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
          
          <button
            onClick={zoomIn}
            className="bg-gray-700 hover:bg-gray-600 rounded p-2 transition-colors"
            title="Zoom In"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={resetZoom}
            className="bg-gray-700 hover:bg-gray-600 rounded p-2 transition-colors ml-2"
            title="Reset Zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading PDF document...</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="text-red-500 text-center p-6 max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium mt-2">Document Loading Error</h3>
            <p className="mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* PDF iframe wrapper with scale transform */}
      <div 
        className="overflow-auto bg-gray-200" 
        style={{ 
          height: "calc(100vh - 56px)", // Subtract the toolbar height
          position: "relative" 
        }}
      >
        <div style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left', 
          width: `${100/scale}%`,
          height: `${100/scale}%`,
          transition: 'transform 0.2s ease-out'
        }}>
          <iframe
            ref={iframeRef}
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
            className={`w-full h-full border-0 ${isLoading ? 'hidden' : 'block'}`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title="PDF Viewer"
            style={{ background: 'white' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;