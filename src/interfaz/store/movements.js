export const state = () => ({
  totalIncomes: 6000,
  totalExpenses: 4000,
  movements: [
    {
      _id: "5e9f9c8f9c8f9c8f9c8f9c6f",
      name: "Transferencia 1",
      amount: 1000,
      date: "2021-11-19",
      type: "transfer",
      objectiveId: null,
      categoryId: 1,
      accountFromId: 1,
      accountToId: 2,
    },
    {
      _id: "5e9f9c8f9c8f9c8f9c8f9c7f",
      name: "Gasto 1",
      amount: 1000,
      date: "2021-11-19",
      type: "expense",
      objectiveId: null,
      categoryId: 2,
      accountId: 1,
    },
    {
      _id: "5e9f9c8f9c8f9c8f9c8f9c8f",
      name: "Ingreso 1",
      amount: 1000,
      date: "2021-11-19",
      type: "income",
      objectiveId: null,
      categoryId: 1,
      accountId: 1,
    },
    {
      _id: "5e9f9c8f9c8f9c8f9c8f9c5f",
      name: "Transferencia 1",
      amount: 1000,
      date: "2021-11-19",
      type: "transfer",
      objectiveId: null,
      categoryId: 1,
      accountFromId: 1,
      accountToId: 2,
    },
    {
      _id: "5e9f9c8f9c8f9c8f9c8f9c4f",
      name: "Gasto 1",
      amount: 1000,
      date: "2021-11-19",
      type: "expense",
      objectiveId: null,
      categoryId: 1,
      accountId: 1,
    },
    {
      _id: "5e9f9c8f9c8f9c8f9c8f9c3f",
      name: "Ingreso 1",
      amount: 1000,
      date: "2021-11-19",
      type: "income",
      objectiveId: "5e9f8f8f8f8f8f8f8f8f8f8",
      categoryId: 1,
      accountId: 2,
    },
  ],
});

export const mutations = {
  SET_MOVEMENTS(state, movements) {
    state.movements = movements;
  },
};

export const getters = {
  lastestMovement: (state) => {
    return state.movements.slice(0, 3);
  },
  getMovementById: (state) => (id) => {
    return state.movements.find((movement) => movement._id === id);
  },
  getMovementsByObjectiveId: (state) => (id) => {
    return state.movements.filter((movement) => movement.objectiveId === id);
  },
  getTotalByObjectiveId: (state) => (id) => {
    return state.movements
      .filter((movement) => movement.objectiveId === id)
      .reduce((total, movement) => {
        if (movement.type === "income") {
          return total + movement.amount;
        } else {
          return total - movement.amount;
        }
      }, 0);
  },
  getMovementsAgruptedByCategoryAndType: (state) => (type) => {
    const movements = state.movements.slice();
    const movementsAgruptedByCategory = {};
    movements.forEach((movement) => {
      if (movement.type === type && type !== "transfer") {
        if (!movementsAgruptedByCategory[movement.categoryId]) {
          movementsAgruptedByCategory[movement.categoryId] = {
            categoryId: movement.categoryId,
            totalAmount: 0,
          };
        }
        movementsAgruptedByCategory[movement.categoryId].totalAmount +=
          movement.type === "income" ? movement.amount : -movement.amount;
      }
    });
    return Object.values(movementsAgruptedByCategory);
  },
};

export const actions = {
  GET_MOVEMENTS({ commit }) {
    return this.$axios.$get("/movements").then((response) => {
      commit("SET_MOVEMENTS", response.data);
    });
  },
};
