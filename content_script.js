
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Listen for messages from the popup script
  if (request.action === "extractData") {
    if (window !== window.top) {
      try {
        // Find the app-root element which contains the flashcards data
        var appRoot = document.querySelector('app-root');
        if (appRoot) {
          const jsonData = JSON.parse(appRoot.getAttribute('data-app-data'));
          var flashcardsData = jsonData['flashcards'];
          
          if (!flashcardsData || !Array.isArray(flashcardsData)) {
            sendResponse({ error: "No flashcards found or data is in unexpected format" });
            return true;
          }

          sendResponse({ data: flashcardsData });
          return true;
        }
        // it's good
      } catch (error) {
        sendResponse({ error: `Error extracting data: ${error.message}` });
        return true;
      }
    }
  }
  return true;
});
