import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
/* eslint-disable */
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
}
function createCustomClientId() {
  clientId =
    'custom.cid.' +
    new Date().getTime() +
    '.' +
    Math.random()
      .toString(36)
      .substring(2);
}
const app = createApp(App);

window.addEventListener('load', function() {
  fetch('https://www.google-analytics.com/collect')
    .then(function() {
      getGoogleClientId();
      console.log('success');
      console.log(clientId);
      app.config.globalProperties.clientId = clientId;
    })
    .catch(function() {
      createCustomClientId();
      console.log('fail');
      console.log(clientId);
      app.config.globalProperties.clientId = clientId;
    });
});

app
  .use(store)
  .use(router)
  .mount('#app');
