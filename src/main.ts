import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Footer from "@/components/Footer.vue";
import Icon from "@/components/Icon.vue";
import Date from "@/components/Date.vue";
import Tabs from "@/components/Tabs.vue";
import Record from "@/components/Record.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.component("Footer", Footer);
Vue.component("Icon", Icon);
Vue.component("Date", Date);
Vue.component("Tabs", Tabs);
Vue.component("Record", Record);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
