(function() {
  if (Shopify && Shopify.theme) {
    window.__CESTI.copyToClipboard(Shopify.theme.id);
    alert(`Theme ID (${Shopify.theme.id}) copied!`);
  } else {
    console.log('This extension only works on Shopify stores or their admin pages');
  }
})();