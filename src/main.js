import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VeeValidate from "./plugins/VeeValidate";
import prototypes from "./plugins/prototypes";
import VueTheMask from "vue-the-mask";

Vue.use(VueTheMask);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  VeeValidate,
  prototypes,
  store,
  render: h => h(App)
}).$mount("#app");
