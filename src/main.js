import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VCalendar from "v-calendar";
import { firestorePlugin } from "vuefire";
import router from './router'

// Use v-calendar & v-date-picker components
Vue.use(VueRouter);
Vue.use(VCalendar, { componentPrefix: "vc" });
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
