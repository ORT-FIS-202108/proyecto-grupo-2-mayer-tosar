export const state = () => ({
  objectives: [
    {
      _id: "5e9f8f8f8f8f8f8f8f8f8f8",
      name: "Comprar computadora",
      currentAmount: 800,
      objectiveAmount: 1400,
      finalDate: "2022-01-01",
      currency: "USD",
    },
    {
      _id: "5e9f8f8f8f8f8f8f8f8f8f7",
      name: "Viaje a Colombia",
      currentAmount: 2300,
      objectiveAmount: 5000,
      finalDate: "2022-06-01",
      currency: "USD",
    },
  ],
});

export const getters = {
  getObjectiveById: (state) => (id) => {
    return state.objectives.find((objective) => objective._id === id);
  },
  getObjectivesByCurrency: (state) => (currency) => {
    return state.objectives
      .filter((objective) => objective.currency === currency)
      .map((objective) => ({
        text: objective.name,
        value: objective._id,
      }));
  },
};
