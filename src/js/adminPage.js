(function() {
  
   function loadModal() {
    var message = '';
    var xmlUrl = 'https://' + window.location.host + '/admin/themes.xml';
    var req = new XMLHttpRequest();
    req.open('GET', xmlUrl);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = () => {
      if (req.status === 200) {
        window.__CESTI.modal.build();
  
        // Add Themes to Modal
        var themesArray = window.__CESTI.admin.returnThemesArray(req.response);
        for (var i = 0; i < themesArray.length; i++) {
          var themeData = themesArray[i];
          if (themeData) {
            var themeNode = window.__CESTI.admin.returnThemeNode(themeData);
            window.__CESTI.modal.els.content.appendChild(themeNode);
          }
        }

        window.__CESTI.modal.open();
      } else {
        alert('Something messed up');
      }
    }
  
    req.send();
  }

  if (document.querySelector('#vpvModal')) {
    window.__CESTI.modal.remove();
  } else {
    loadModal();
  }
})();