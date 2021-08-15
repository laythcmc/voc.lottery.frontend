import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import UserDashboard from "../views/user/UserDashboard.vue";
import MainPage from "../views/user/MainPage.vue";
import UserInfo from "../views/user/UserInfo.vue";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      localStorage.clear();
      next();
    }
  },

  {
    path: "/user/dashboard/",
    name: "UserDashboard",
    component: UserDashboard,
    redirect: "/user/dashboard/main",
    children: [
      {
        path: "main",
        name: "MainPage",
        component: MainPage
      },

      {
        path: "info",
        name: "UserInfo",
        component: UserInfo
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!store.getters["authenticated"]) {
        return next({
          name: "Login"
        });
      }
      next();
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
