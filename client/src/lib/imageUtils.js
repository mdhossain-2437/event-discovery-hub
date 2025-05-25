/**
 * Utility functions for handling images, especially Firebase profile images
 */

/**
 * Processes a Firebase profile image URL to ensure it loads correctly
 * Adds necessary parameters to prevent CORS and referrer issues
 * 
 * @param {string} url - The original image URL
 * @param {Object} options - Configuration options
 * @param {boolean} options.addTimestamp - Whether to add a timestamp parameter (default: true)
 * @param {boolean} options.addToken - Whether to add a token parameter if missing (default: false)
 * @returns {string} The processed URL
 */
export const processProfileImageUrl = (url, options = {}) => {
  if (!url) return url;
  
  const { 
    addTimestamp = true,
    addToken = false
  } = options;
  
  let processedUrl = url;
  
  // Add timestamp to prevent caching issues
  if (addTimestamp && !url.includes('?t=')) {
    const timestamp = new Date().getTime();
    processedUrl = url.includes('?') 
      ? `${processedUrl}&t=${timestamp}` 
      : `${processedUrl}?t=${timestamp}`;
  }
  
  // Add token if it's a Firebase Storage URL and doesn't already have one
  if (addToken && 
      (url.includes('firebasestorage.googleapis.com') || 
       url.includes('storage.googleapis.com')) && 
      !url.includes('token=')) {
    // This is just a placeholder - in a real implementation, you would need to
    // generate a proper Firebase Storage token
    processedUrl = processedUrl.includes('?') 
      ? `${processedUrl}&alt=media` 
      : `${processedUrl}?alt=media`;
  }
  
  return processedUrl;
};

/**
 * Preloads an image to ensure it's cached by the browser
 * 
 * @param {string} url - The image URL to preload
 * @returns {Promise} A promise that resolves when the image is loaded
 */
export const preloadImage = (url) => {
  if (!url) return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Failed to preload image: ${url}`));
    
    // Add referrer policy and crossOrigin attributes
    img.referrerPolicy = 'no-referrer';
    img.crossOrigin = 'anonymous';
    
    // Set the source to start loading
    img.src = processProfileImageUrl(url);
  });
};

/**
 * Creates an image URL with the proper attributes for Firebase profile images
 * 
 * @param {string} url - The original image URL
 * @param {string} fallbackUrl - Fallback URL to use if the original fails
 * @returns {Object} Object with src, referrerPolicy, crossOrigin, and onError properties
 */
export const createProfileImageProps = (url, fallbackUrl) => {
  if (!url) return { src: fallbackUrl };
  
  const processedUrl = processProfileImageUrl(url);
  
  return {
    src: processedUrl,
    referrerPolicy: 'no-referrer',
    crossOrigin: 'anonymous',
    onError: (e) => {
      // If the image fails to load, try adding a timestamp
      if (url && !url.includes('?t=')) {
        const timestamp = new Date().getTime();
        e.target.src = `${url}?t=${timestamp}`;
      } else if (fallbackUrl) {
        // If it still fails, use the fallback
        e.target.src = fallbackUrl;
      }
    }
  };
};
