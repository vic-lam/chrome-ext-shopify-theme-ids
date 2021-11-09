(function() {
  window.__CESTI = {
    copyToClipboard: (value) => {
      var dummy = document.createElement('textarea');
      dummy.value = value;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
    }
  };

})();