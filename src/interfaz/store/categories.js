export const state = () => ({
  categories: [],
});

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
};

export const getters = {
  getCategoryNameById: (state) => (id) => {
    return state.categories.find((category) => category._id === id).name;
  },
  getCategories: (state) => {
    return state.categories.map((category) => {
      return {
        text: category.name,
        value: category._id,
      };
    });
  },
  getCategoryById: (state) => (id) => {
    return state.categories.find((category) => category._id === id);
  },
  getCategoriesExcludeId: (state) => (id) => {
    return state.categories
      .filter((category) => category._id !== id)
      .map((category) => {
        return {
          text: category.name,
          value: category._id,
        };
      });
  },
};

export const actions = {
  async GET_CATEGORIES({ commit }) {
    try {
      const response = await this.$axios.get("/categories");
      commit("SET_CATEGORIES", response.data.categories);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async CREATE_CATEGORY({}, category) {
    try {
      await this.$axios.post("/categories", category);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async UPDATE_CATEGORY({}, category) {
    try {
      await this.$axios.put(`/categories/${category._id}`, category);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async DELETE_CATEGORY({}, id) {
    try {
      await this.$axios.delete(`/categories/${id}`);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};
