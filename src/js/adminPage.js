(function () {
  function loadModal() {
    const newStoreHandleRegex = "https:\/\/admin\.shopify\.com\/store\/([^;]*)\/";
    const newStoreHandle = window.location.href.match(newStoreHandleRegex)?.[1];
    const newDomain = `https://admin.shopify.com/store/${newStoreHandle}/themes.xml`
    const oldDomain = `https://${window.location.host}/admin/themes.xml`;
    const xmlUrl = newStoreHandle ? newDomain : oldDomain;
    const req = new XMLHttpRequest();
    req.open("GET", xmlUrl);
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => {
      if (req.status === 200) {
        window.__CESTI.modal.build();

        // Add Themes to Modal
        const themesArray = window.__CESTI.admin.returnThemesArray(req.response);
        for (let i = 0; i < themesArray.length; i++) {
          const themeData = themesArray[i];
          if (themeData) {
            const themeNode = window.__CESTI.admin.returnThemeNode(themeData);
            window.__CESTI.modal.els.content.appendChild(themeNode);
          }
        }

        window.__CESTI.modal.open();
      } else {
        alert("Something messed up");
      }
    };

    req.send();
  }

  if (document.querySelector("#vpvModal")) {
    window.__CESTI.modal.remove();
  } else {
    loadModal();
  }
})();
