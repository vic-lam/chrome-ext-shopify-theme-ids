(function() {
  window.__CESTI.modal = {
    els: [],
  }

  window.__CESTI.modal.build = function() {
    // Build Modal elements
    var modal = document.createElement('div');
    var themes = document.createElement('div');
    modal.id = 'vpvModal';
    themes.className = 'themes';
    modal.appendChild(themes);
    
    // Build Overlay elements
    var overlay = document.createElement('div');
    overlay.id = 'vpvOverlay';
    overlay.addEventListener('click', () => {
      window.__CESTI.modal.remove();
    });

    window.__CESTI.modal.els.modal = modal;
    window.__CESTI.modal.els.overlay = overlay;
    window.__CESTI.modal.els.content = themes;
  };

  window.__CESTI.modal.open = function() {
    // Append Modal/Overlay elements to DOM
    const { modal, overlay } = window.__CESTI.modal.els;
    document.getElementById('app').appendChild(overlay);
    document.getElementById('app').appendChild(modal);
  };

  window.__CESTI.modal.remove = function() {
    var modal = document.querySelector('#vpvModal');
    var overlay = document.querySelector('#vpvOverlay');
    modal.classList.add('closing');
    setTimeout(() => {
      overlay.parentNode.removeChild(overlay);
      modal.parentNode.removeChild(modal);
      window.__CESTI.modal.dom = [];
    }, 600)
  };

})();