
document.getElementById('extractBtn').addEventListener('click', () => {
  // Get the current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    // Inject the content script into all frames in the active tab
    if (activeTab.url.includes('https://notebooklm.google.com/')) {

      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id, allFrames: true },
          files: ['content_script.js'],
        }, 
        () => {

          chrome.tabs.sendMessage(activeTab.id, { action: "extractData" }, (response) => {
            if (chrome.runtime.lastError) {
              document.getElementById('result').innerText = 'Error: ' + chrome.runtime.lastError.message;
            } else if (response && response.data) {

              data = response.data.map((card) => {
                return [`"${card.f}"`, `"${card.b}"`].join(',');
              });

              data = data.join('\n');

              const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'notebooklm_flashcards.csv';
              a.click();
              URL.revokeObjectURL(url);

              document.getElementById('result').innerText = 'Data extracted successfully \n' + url;
            } else {
              document.getElementById('result').innerText = 'No response from content script or data not found in any frame.';
            }
          });
        }
      );
    }
  });
});
