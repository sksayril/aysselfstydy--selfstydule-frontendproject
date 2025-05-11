import React, { useEffect, useState } from 'react';

// Custom hook to load Adobe DC SDK
const useAdobeScript = () => {
  const [scriptState, setScriptState] = useState({
    isLoaded: false,
    error: null
  });

  useEffect(() => {
    // Check if script is already loaded
    if (window.AdobeDC) {
      setScriptState({ isLoaded: true, error: null });
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
    script.async = true;
    
    // Set up event handlers
    script.onload = () => {
      if (window.AdobeDC) {
        // Initialize the Adobe DC View once SDK is loaded
        window.adobe_dc_view_sdk.ready = () => {
          setScriptState({ isLoaded: true, error: null });
        };
      } else {
        setScriptState({ isLoaded: false, error: 'Failed to initialize Adobe DC SDK' });
      }
    };
    
    script.onerror = () => {
      setScriptState({ isLoaded: false, error: 'Failed to load Adobe PDF viewer script' });
    };
    
    // Append script to document
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return scriptState;
};

// PDF Viewer Component
const PDFViewer = ({ url }) => {
  const { isLoaded, error } = useAdobeScript();
  const clientId = 'a5927fcb573a4edb8909505c3d84a170'; // Your Client ID
  
  useEffect(() => {
    if (isLoaded && !error && window.AdobeDC) {
      try {
        const adobeDCView = new window.AdobeDC.View({
          clientId,
          divId: 'adobe-dc-view',
        });
        
        adobeDCView.previewFile(
          {
            content: { location: { url } },
            metaData: { fileName: 'Document.pdf' },
          },
          {
            embedMode: 'FULL_WINDOW',
            showDownloadPDF: false,
            showPrintPDF: false,
            showAnnotationTools: false,
          }
        );
      } catch (err) {
        console.error('Error initializing PDF viewer:', err);
      }
    }
  }, [isLoaded, error, url, clientId]);
  
  return (
    <div className="w-full h-full">
      {!isLoaded && !error && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading PDF document...</p>
        </div>
      )}
      
      {error && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Document Loading Error</h3>
          <p className="mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      )}
      
      {isLoaded && !error && (
        <div id="adobe-dc-view" className="w-full h-screen" />
      )}
    </div>
  );
};

export default PDFViewer;