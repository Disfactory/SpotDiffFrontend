import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* eslint-disable */

const app = createApp(App);
let clientId = '';
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

function getGoogleClientId() {
  ga('create', 'UA-154739393-1', 'auto');

  ga(function(tracker) {
    clientId = tracker.get('clientId');
  });
  app.config.globalProperties.clientId = clientId;
  console.log('success');
  console.log(clientId);
}
function createCustomClientId() {
  clientId =
    'custom.cid.' +
    Math.random()
      .toString(36)
      .substring(2) +
    '.' +
    new Date().getTime();
  app.config.globalProperties.clientId = clientId;
  console.log('fail');
  console.log(clientId);
}

//If URL endpoint of GA data sending been blocked
//If ga() been blocked
window.addEventListener('load', function() {
  if (window.ga) {
    fetch('https://www.google-analytics.com/collect')
      .then(() => {
        getGoogleClientId();
      })
      .catch(() => {
        createCustomClientId();
      });
  } else {
    createCustomClientId();
  }
});

app
  .use(store)
  .use(router)
  .mount('#app');
