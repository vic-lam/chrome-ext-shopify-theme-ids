// import { copyToClipboard } from "/helpers.js";

(function () {
    var you = '...you uncultured fool!';

    /****************************************************************************************************
    * HELPERS
    ****************************************************************************************************/

    function copyIdToClipboard(themeElement) {
      // copyToClipboard();
      var clickedId = themeElement.querySelector('.id').innerHTML;
      var dummy = document.createElement('textarea');
      dummy.value = clickedId;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);

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
    }

    function returnThemesArray(response) {
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
    }
    
    function returnThemeNode(theme, callback) {
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
    }

    function injectScript(file, node) {
      var th = document.getElementsByTagName(node)[0];
      var s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', file);
      th.appendChild(s);
    }



    /****************************************************************************************************
    * ON TABS URLS RECEIVED
    ****************************************************************************************************/
    // console.log('content:main:start', testVar);

    chrome.runtime.onMessage.addListener(
      function (req, sender, respond) {
        console.log('content:onMessage:', req.url);
        respond({message: 'got it'});
        return true;
      }
    )
    

    if (window.location.href.includes('myshopify.com/admin')) {
      var message = '';
      var xmlUrl = 'https://' + window.location.host + '/admin/themes.xml';
      var req = new XMLHttpRequest();
      req.open('GET', xmlUrl);
      req.setRequestHeader('Content-Type', 'application/json');
      req.onload = () => {
        if (req.status === 200) {
          // Build Modal
          var modal = document.createElement('div');
          var themes = document.createElement('div');
          modal.id = 'vpvThemes';
          themes.className = 'themes';
          modal.appendChild(themes);
          
          // Build Overlay
          var overlay = document.createElement('div');
          overlay.id = 'vpvOverlay';
          overlay.addEventListener('click', () => {
            overlay.parentNode.removeChild(overlay);
            modal.parentNode.removeChild(modal);
          });

          // Add Themes to Modal
          var themesArray = returnThemesArray(req.response);
          for (var i = 0; i < themesArray.length; i++) {
            var themeData = themesArray[i];
            var themeNode = returnThemeNode(themeData, copyIdToClipboard);
            themes.appendChild(themeNode);
          }
        } else {
          alert('Something messed up' + you);
        }

        // Add Pop Up
        document.getElementById('app').appendChild(overlay);
        document.getElementById('app').appendChild(modal);
      }
  
      req.send();
  } else {
    injectScript(chrome.extension.getURL('nonAdminInjection.js'), 'body');
  }
   
})();