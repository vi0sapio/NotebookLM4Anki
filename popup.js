
document.getElementById('extractBtn').addEventListener('click', () => {
  const resultElement = document.getElementById('result');
  resultElement.innerText = 'Extracting data...';
  
  // Get the current active tab
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    
    // Check if we're on the NotebookLM site
    if (!activeTab.url.includes('https://notebooklm.google.com/')) {
      resultElement.innerText = 'Error: Please navigate to NotebookLM to extract flashcards.';
      return;
    }

    // Inject the content script into all frames in the active tab
    browser.scripting.executeScript(
      {
        target: { tabId: activeTab.id, allFrames: true },
        files: ['content_script.js'],
      }, 
      () => {
        if (browser.runtime.lastError) {
          resultElement.innerText = `Error injecting script: ${browser.runtime.lastError.message}`;
          return;
        }

        // Send message to the content script to extract data
        browser.tabs.sendMessage(activeTab.id, { action: "extractData" }, (response) => {
          if (browser.runtime.lastError) {
            resultElement.innerText = `Error: ${browser.runtime.lastError.message}`;
            return;
          }
          
          if (!response) {
            resultElement.innerText = 'No response received from the page.';
            return;
          }
          
          if (response.error) {
            resultElement.innerText = `Error: ${response.error}`;
            return;
          }
          
          if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
            resultElement.innerText = 'No flashcards found on this page.';
            return;
          }

          try {
            // Format the data for CSV export
            const csvData = response.data.map((card) => {
              // Properly escape quotes in the content
              const front = card.f.replace(/"/g, '""');
              const back = card.b.replace(/"/g, '""');
              return [`"${front}"`, `"${back}"`].join(',');
            }).join('\n');

            // Create and trigger download
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'notebooklm_flashcards.csv';
            a.click();
            URL.revokeObjectURL(url);

            resultElement.innerText = `Success! Downloaded ${response.data.length} flashcards.`;
          } catch (error) {
            resultElement.innerText = `Error processing data: ${error.message}`;
          }
        });
      }
    );
  });
});
