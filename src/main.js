import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
window._ = require("lodash");
import axios from "axios";

// initialize axios
window.axios = axios;
window.axios.defaults.baseURL = "http://localhost:3000/";
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["Accept"] = "application/json";
window.axios.defaults.headers.common["Content-Type"] = "application/json";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
