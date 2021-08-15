import axios from "@/axios";
const state = {
  token: "",
  userInfo: {}
};
const getters = {
  authenticated: state => state.token && state.userInfo,
  getUser: state => state.userInfo
};
const actions = {
  async loginFun({ dispatch }, cred) {
    var obj = JSON.parse(cred);
    const response = await axios.post("/auth/login", {
      username: obj.username,
      password: obj.password
    });

    if(response.data.success=='success')
    {  
return dispatch("attempt", response.data.access_token);
    }
  else if(response.data.success!='success')
    {  
      if(response.data.message=='invalid_username_or_password')
      return "incorrect";
      else if(response.data.message=='error')
      return "error";
   }
  },
  async attempt({ commit, state }, token) {
    if (token) commit("setToken", token);
    if (!state.token) return;
    try {
      const response = await axios.post("/auth/me");
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      commit("setUser", response.data);
      return "success";
    } catch {
      console.log("err");
      commit("setToken", null);
      commit("setUser", null);
    }
  },
  signout({ commit }) {
    return axios.post("/auth/logout").then(() => {
      commit("setToken", null);
      commit("setUser", null);
    });
  }
};
const mutations = {
  setToken: (state, user_token) => (state.token = user_token),
  setUser: (state, userInfo) => (state.userInfo = userInfo)
};
export default {
  state,
  getters,
  actions,
  mutations
};
