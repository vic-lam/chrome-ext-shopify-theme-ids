
chrome.browserAction.onClicked.addListener(function(tab) {
  function extClick() {
    chrome.tabs.executeScript(tab.id, { file: "/src/js/extClick.js" });
  }

  chrome.tabs.executeScript(tab.id, {}, extClick);
});