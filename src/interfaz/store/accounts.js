export const state = () => ({
  accounts: [],
  currencies: [
    { text: "UYU", value: "UYU" },
    { text: "USD", value: "USD" },
    { text: "EUR", value: "EUR" },
    { text: "ARS", value: "ARS" },
    { text: "BRL", value: "BRL" },
  ],
});

export const mutations = {
  SET_ACCOUNTS(state, accounts) {
    state.accounts = accounts;
  },
};

export const getters = {
  getAccountById: (state) => (id) => {
    return state.accounts.find((account) => account._id === id);
  },
  getNameAccountById: (state) => (id) => {
    return state.accounts.find((account) => account._id === id)?.name;
  },
  getAccounts: (state) => {
    return state.accounts.map((account) => {
      return {
        text: account.name,
        value: account._id,
      };
    });
  },
  getCurrencyAccountById: (state) => (id) => {
    return state.accounts.find((account) => account._id === id)?.currency;
  },
};

export const actions = {
  async GET_ACCOUNTS({ commit }) {
    try {
      const response = await this.$axios.get("/accounts");
      commit("SET_ACCOUNTS", response.data.accounts);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async CREATE_ACCOUNT({}, account) {
    try {
      await this.$axios.post("/accounts", account);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async UPDATE_ACCOUNT({}, account) {
    try {
      await this.$axios.put(`/accounts/${account._id}`, account);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async DELETE_ACCOUNT({}, id) {
    try {
      await this.$axios.delete(`/accounts/${id}`);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};
