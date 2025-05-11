import React, { useEffect, useState } from 'react';

// Custom hook to load and initialize Adobe DC SDK
const useAdobeScript = () => {
  const [scriptState, setScriptState] = useState({
    isLoaded: false,
    error: null
  });

  useEffect(() => {
    // Define the global callback before loading the script
    window.adobe_dc_view_sdk = window.adobe_dc_view_sdk || {};
    window.adobe_dc_view_sdk.ready = () => {
      console.log('Adobe DC View SDK is ready');
      setScriptState({ isLoaded: true, error: null });
    };

    // Check if script is already loaded
    if (!document.querySelector('script[src*="documentcloud.adobe.com/view-sdk/main.js"]')) {
      console.log('Loading Adobe DC SDK script...');
      const script = document.createElement('script');
      script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
      script.async = true;
      script.id = 'adobe-dc-view-sdk';
      
      script.onerror = () => {
        console.error('Failed to load Adobe PDF viewer script');
        setScriptState({ isLoaded: false, error: 'Failed to load Adobe PDF viewer script' });
      };
      
      // Append script to document head
      document.head.appendChild(script);
    } else if (window.AdobeDC) {
      // Script is already loaded and SDK is available
      console.log('Adobe DC SDK already loaded');
      setScriptState({ isLoaded: true, error: null });
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return scriptState;
};

// PDF Viewer Component
const PDFViewer = ({ url }) => {
  const { isLoaded, error } = useAdobeScript();
  const [viewerError, setViewerError] = useState(null);
  const clientId = 'a5927fcb573a4edb8909505c3d84a170'; // Your Client ID
  
  useEffect(() => {
    let timeoutId;
    
    // Set a timeout to check for initialization
    if (!isLoaded && !error) {
      timeoutId = setTimeout(() => {
        if (!window.AdobeDC) {
          console.error('Adobe DC SDK initialization timed out');
          setViewerError('Failed to initialize Adobe DC SDK');
        }
      }, 10000); // 10 second timeout
    }
    
    // Initialize viewer when SDK is loaded
    if (isLoaded && !error && window.AdobeDC) {
      try {
        console.log('Initializing Adobe DC View with client ID:', clientId);
        const adobeDCView = new window.AdobeDC.View({
          clientId,
          divId: 'adobe-dc-view',
        });
        
        console.log('Previewing PDF file:', url);
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
        ).catch(err => {
          console.error('Error loading PDF:', err);
          setViewerError(`Error loading PDF: ${err.message || 'Unknown error'}`);
        });
      } catch (err) {
        console.error('Error initializing PDF viewer:', err);
        setViewerError(`Error initializing viewer: ${err.message || 'Unknown error'}`);
      }
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoaded, error, url, clientId]);
  
  const displayError = error || viewerError;
  
  return (
    <>
      {!isLoaded && !displayError && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading PDF document...</p>
        </div>
      )}
      
      {displayError && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Document Loading Error</h3>
          <p className="mt-2">{displayError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      )}
      
      {isLoaded && !displayError && (
        <div id="adobe-dc-view" style={{ height: '100vh', width: '100%' }} />
      )}
    </>
  );
};

export default PDFViewer;