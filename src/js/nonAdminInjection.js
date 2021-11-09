(function() {
  if (Shopify && Shopify.theme) {
    alert(Shopify.theme.id);
  } else {
    console.log('This extension only works on Shopify stores or their admin pages');
  }
})();