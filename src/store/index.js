//here are the routes of the vuex javascript
import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import fund from "./modules/fund";
import counter from "./modules/counter";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  modules: {
    auth,
    entity
  }
});
