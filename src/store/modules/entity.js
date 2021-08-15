import axios from "@/axios";
const state = {
  entities: []
};

const getters = {
  allEntities: state => state.entities
};
const actions = {
  async newLottery({ commit }, num) {
    const response = await axios.post("/user/entities", { number: num });
    if (response.status === 200) commit("SET_ENTITIES", response.data);
  }
};
const mutations = {
  SET_ENTITIES: (state, data) => (state.entities = data)
};

export default {
  state,
  getters,
  actions,
  mutations
};
