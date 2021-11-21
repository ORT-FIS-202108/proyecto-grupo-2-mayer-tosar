export const state = () => ({
  goals: [],
  movements: [],
});

export const mutations = {
  SET_GOALS(state, goals) {
    state.goals = goals;
  },
  SET_MOVEMENTS(state, movements) {
    state.movements = movements;
  },
};

export const getters = {
  getGoalById: (state) => (id) => {
    return state.goals.find((goal) => goal._id === id);
  },
  getGoalsByCurrency: (state) => (currency) => {
    return state.goals
      .filter((goal) => goal.currency === currency)
      .map((goal) => ({
        text: goal.name,
        value: goal._id,
      }));
  },
};

export const actions = {
  async GET_GOALS({ commit }) {
    try {
      const response = await this.$axios.get("/goals");
      commit("SET_GOALS", response.data.goals);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async CREATE_GOAL({}, goal) {
    try {
      await this.$axios.post("/goals", goal);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async UPDATE_GOAL({}, goal) {
    try {
      await this.$axios.put(`/goals/${goal.id}`, goal);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async DELETE_GOAL({}, id) {
    try {
      await this.$axios.delete(`/goals/${id}`);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async GET_MOVEMENTS_BY_GOAL({ commit }, id) {
    try {
      const response = await this.$axios.get(`/goals/${id}/movements`);
      commit("SET_MOVEMENTS", response.data.movements);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};
