import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import "@/assets/css/reset.css";
import "@/assets/css/global.css";

////////////////////////////////
/////// GLOBAL VARIABLES ///////
////////////////////////////////
Vue.prototype.$bgColor = "red"

////////////////////////////////
////// CONFIGURE SERVICES //////
////////////////////////////////
Vue.config.productionTip = false

////////////////////////////////
////// START VUE INSTANCE //////
////////////////////////////////
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
