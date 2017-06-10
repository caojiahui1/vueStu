// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import My from '@/components/header'
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueResource from 'vue-resource';
import iView from 'iview';

Vue.use(VueResource);
Vue.use(Mint);
Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App ,My}
})
