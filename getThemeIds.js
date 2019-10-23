 (function () {
    var you = '...you uncultured fool!';
    var stylesString = `
      #vpvThemes {
        position: fixed;
        top: 10%;
        left: calc((100vw - 600px) / 2);
        z-index: 900;
        width: 500px;
        height: 600px;
        padding: 24px;
        border-radius: 4px;
        overflow-x: visible;
        overflow-y: hidden;
        background-color: #F3F3F3;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        border: 2px solid #B1B1B1;
      }
      #vpvOverlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 899;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.2);
      }
      #vpvThemes .themes {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: scroll;
      }
      #vpvThemes .themes .theme {
        display: flex;
        justify-content: space-between;
        padding: 4px 8px;
        margin-bottom: 8px;
        border-radius: 4px;
        background: #B5A7F2;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
      }
      #vpvThemes .themes .theme .name {
        color: #2D2B3A;
      }
      #vpvThemes .themes .theme .id {
        color: #63607C;
        font-weight: 500;
      }
      #vpvThemes .themes .theme.theme--live {
        background: #927DEC;
      }
      #vpvThemes .themes .theme.theme--live .name {
        color: #FFF;
      }
      #vpvThemes .themes .theme.theme--live .id {
        color: #FFF;
        font-weight: 500;
      }
    `;
    if (window.location.host.includes('myshopify.com')) {
      var message = '';
      var xmlUrl = 'https://' + window.location.host + '/admin/themes.xml';
      var req = new XMLHttpRequest();
      req.open('GET', xmlUrl);
      req.setRequestHeader('Content-Type', 'application/json');
      req.onload = () => {
        if (req.status === 200) {
          // Build container
          var nodesContainer = document.createElement('div');
          var themeNodes = document.createElement('div');
          nodesContainer.id = 'vpvThemes';
          themeNodes.className = 'themes';
          nodesContainer.appendChild(themeNodes);

          // Build Overlay
          var overlay = document.createElement('div');
          overlay.id = 'vpvOverlay';
          overlay.addEventListener('click', () => {
            overlay.parentNode.removeChild(overlay);
            nodesContainer.parentNode.removeChild(nodesContainer);
          });

          // Add styles
          var styles = document.createElement('style');
          styles.innerHTML = stylesString;
          nodesContainer.appendChild(styles);

          // Get Themes
          var response = req.response;
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(response, 'text/xml');
          var xmlNodes = xmlDoc.documentElement.getElementsByTagName('theme');
          for (var i = 0; i < xmlNodes.length; i++) {
            var themeXml = xmlNodes[i];
            var name = `<div class="name">${ themeXml.getElementsByTagName('name')[0].innerHTML}</div>`;
            var id = `<div class="id">${ themeXml.getElementsByTagName('id')[0].innerHTML}</div>`;
            var themeNode = document.createElement('div');
            themeNode.innerHTML = (name + id).trim();
            var themeDate = new Date(themeXml.getElementsByTagName('updated-at')[0].innerHTML);
            themeNode.setAttribute('sec', (Math.abs(themeDate) / 1000));
            var currentDate = new Date();
            var diffDays = Math.ceil(Math.abs(currentDate - themeDate) / (1000 * 60 * 60 * 24));
            if (themeXml.getElementsByTagName('role')[0].innerHTML === 'main') {
              themeNode.className = 'theme theme--live';
              themeNodes.prepend(themeNode);
            }
            else if (diffDays <= 60) {
              themeNode.className = 'theme';
              themeNodes.appendChild(themeNode);
            }
          }
        } else {
          alert('Something messed up' + you);
        }
        document.getElementById('app').appendChild(overlay);
        document.getElementById('app').appendChild(nodesContainer);
      }
  
      req.send();
   }
   else {
    alert('Go to a shopify admin page' + you);
   }
   
})();
