(function () {

  function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
  }
  
  injectScript(chrome.extension.getURL('/src/js/helpers/global.js'), 'body');
  injectScript(chrome.extension.getURL('/src/js/helpers/modal.js'), 'body');
  
  if (window.location.href.includes('myshopify.com/admin')) {
    injectScript(chrome.extension.getURL('/src/js/helpers/admin.js'), 'body');
    injectScript(chrome.extension.getURL('/src/js/adminPage.js'), 'body');
  } else {
    injectScript(chrome.extension.getURL('/src/js/nonAdminPage.js'), 'body');
  }
   
})();