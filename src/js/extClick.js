(function () {
  function injectScript(file, node) {
    const th = document.getElementsByTagName(node)[0];
    const s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", file);
    th.appendChild(s);
  }

  injectScript(chrome.extension.getURL("/src/js/helpers/global.js"), "body");
  injectScript(chrome.extension.getURL("/src/js/helpers/modal.js"), "body");

  const { href } = window.location;
  const isAdminPage =
    href.includes("myshopify.com") || href.includes("admin.shopify.com");
  if (isAdminPage) {
    injectScript(chrome.extension.getURL("/src/js/helpers/admin.js"), "body");
    injectScript(chrome.extension.getURL("/src/js/adminPage.js"), "body");
  } else {
    injectScript(chrome.extension.getURL("/src/js/nonAdminPage.js"), "body");
  }
})();
