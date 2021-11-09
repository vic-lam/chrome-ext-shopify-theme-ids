chrome.browserAction.onClicked.addListener(function(tab) {
  var theTabs;
  
  chrome.tabs.query({currentWindow: true}, function (tabs) {
    tabs.forEach(function (tb) {
      chrome.tabs.sendMessage(tabs[0].id, { url: tb.url }, function (res) {
        // console.log('BG:res received', res.message);
      });
    });
  })

  function getThemeIds() {
    chrome.tabs.executeScript(tab.id, { file: "/src/js/getThemeIds.js" });
  }

  chrome.tabs.executeScript(tab.id, { code: "var testVar = " + JSON.stringify(theTabs) + ";" }, getThemeIds);
});