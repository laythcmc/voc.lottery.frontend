import axios from "@/axios";
const state = {
  counters: {}
};

const getters = {
  getCounters: state => state.counters
};
const actions = {
  async fetchCounters({ commit }) {
    const response = await axios.get("/user/counters");
 
    if(response.data.success=="true")
    commit("SET_COUNTERS", response.data.data);
  }
};
const mutations = {
  SET_COUNTERS: (state, data) => (state.counters = data)
};

export default {
  state,
  getters,
  actions,
  mutations
};
