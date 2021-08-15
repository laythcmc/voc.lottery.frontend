import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./scss/main.scss";
require("@/store/modules/subscriber");
Vue.config.productionTip = false;
import JsonCSV from "vue-json-csv";

Vue.component("downloadCsv", JsonCSV);

store.dispatch("attempt", localStorage.getItem("user_token")).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
});
