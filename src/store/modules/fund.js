import axios from "@/axios";
const state = {
  funds: {}
};

const getters = {
  allFunds: state => state.funds.data,
  getFund: state => id => {
    var fund = state.funds.data.find(fund => fund.id === id);
    return fund;
  },
  getFundCurrentPage: state => state.funds.current_page,
  getFundLastPage: state => state.funds.last_page
};
const actions = {
  async fetchFunds({ commit }, page) {
    const response = await axios.get(
      "/user/documents?per_page=10&&page=" + page
    );
    if (response.data) commit("SET_FUNDS", response.data);
  },

  setFundCurrentPage({ commit }, currentPage) {
    commit("SET_FUND_CURRENT_PAGE", currentPage);
  },
  setFundLastPage({ commit }, lastPage) {
    commit("SET_FUND_LAST_PAGE", lastPage);
  },

  async addNewFund({ commit }, fund) {
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    const newFund = await axios.post("/user/documents", fund);
    console.log(newFund.data);

    if (newFund.status === 200) commit("ADD_FUND", newFund.data);
  }
};
const mutations = {
  SET_FUNDS: (state, data) => (state.funds = data),
  SET_FUND_CURRENT_PAGE: (state, data) => (state.funds.current_page = data),
  SET_FUND_LAST_PAGE: (state, data) => (state.funds.last_page = data),
  ADD_FUND: (state, data) => {
    state.funds.data.unshift(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
