
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === "extractData") {
    
    if (window !== window.top) {
      var appRoot = document.querySelector('app-root')

      if (appRoot) {
        const jsonData = JSON.parse(appRoot.getAttribute('data-app-data'));
        var csvData = jsonData['flashcards'];
        
        
        sendResponse({ data: csvData });
        return true;
      }
    }
  }
  return true;
});
