import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Footer from "@/components/Footer.vue";
import Layout from "@/components/Layout.vue";

Vue.config.productionTip = false

Vue.component("Footer",Footer)
Vue.component("Layout",Layout)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
