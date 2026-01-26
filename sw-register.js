 url=https://github.com/karmpur496-vijay/My-girder/blob/main/sw-register.js
// Small snippet to register service worker — include this in index.html before </body>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/SW.js')
      .then(reg => {
        console.log('Service Worker registered:', reg.scope);
      })
      .catch(err => {
        console.warn('Service Worker registration failed:', err);
      });
  });
}