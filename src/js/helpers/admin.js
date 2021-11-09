(function() {
  window.__CESTI.admin = {
    copyIdToClipboard: function (themeElement) {
      var clickedId = themeElement.querySelector('.id').innerHTML;
      window.__CESTI.copyToClipboard(clickedId);
  
      var copied = document.createElement('div');
      copied.classList.add('copied');
      copied.innerHTML = 'Theme ID Copied!';
      themeElement.appendChild(copied);
      themeElement.classList.add('press');
      setTimeout(function() {
        copied.classList.add('fade');
        themeElement.classList.remove('press');
      }, 400);
      copied.addEventListener('webkitTransitionEnd', function() {
        themeElement.removeChild(copied);
      })
    },
  
    returnThemesArray: function (response) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(response, 'text/xml');
      var xmlNodes = xmlDoc.documentElement.getElementsByTagName('theme');
      var themesArr = [];
      for (var i = 0; i < xmlNodes.length; i++) {
        var themeXml = xmlNodes[i];
        var id = themeXml.getElementsByTagName('id')[0].innerHTML;
        var name = themeXml.getElementsByTagName('name')[0].innerHTML;
        var lastUpdated = new Date(themeXml.getElementsByTagName('updated-at')[0].innerHTML);
        var classes = (themeXml.getElementsByTagName('role')[0].innerHTML === 'main') ? 'theme theme--live' : 'theme';
        var themeObj = { id, name, lastUpdated, classes };
  
        if (themesArr.length === 0) {
          themesArr.push(themeObj);
        } else if (themeXml.getElementsByTagName('role')[0].innerHTML === 'main') {
          var liveTheme = themeObj;
        } else {
          for (var j = 0; j < themesArr.length; j++) {
            const existingTheme = themesArr[j];
            if (lastUpdated > existingTheme.lastUpdated) {
              themesArr.splice(j, 0, themeObj);
              break;
            }
          }
        }
      }
      themesArr.splice(0, 0, liveTheme);
      return themesArr;
    },
    
    returnThemeNode: function (theme, callback) {
      var nameHtml = `<div class="name">${theme.name}</div>`;
      var idHtml = `<div class="id">${theme.id}</div>`;
      var themeNode = document.createElement('div');
      themeNode.innerHTML = (nameHtml + idHtml).trim();
      themeNode.setAttribute('sec', (Math.abs(theme.lastUpdated) / 1000));
      themeNode.className = theme.classes;
  
      // var currentDate = new Date();
      // var diffDays = Math.ceil(Math.abs(currentDate - theme.lastUpdated) / (1000 * 60 * 60 * 24));
  
      themeNode.addEventListener('click', function () {
        callback(this);
      });
  
      return themeNode;
    },

  };
})();