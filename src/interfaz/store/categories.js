export const state = () => ({
  categories: [
    { name: "Hogar", _id: 1 },
    { name: "Comida", _id: 2 },
    { name: "Transporte", _id: 3 },
  ],
});

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
