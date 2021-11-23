export const state = () => ({
  totalIncomes: 0,
  totalExpenses: 0,
  movements: [],
});

export const mutations = {
  SET_MOVEMENTS(state, movements) {
    state.movements = movements;
  },
  SET_TOTAL_INCOMES(state, totalIncomes) {
    state.totalIncomes = totalIncomes;
  },
  SET_TOTAL_EXPENSES(state, totalExpenses) {
    state.totalExpenses = totalExpenses;
  },
};

export const getters = {
  lastestMovement: (state) => {
    return state.movements.slice(0, 3);
  },
  getMovementById: (state) => (id) => {
    return state.movements.find((movement) => movement._id === id);
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
    return this.$axios.get("/movements").then((response) => {
      commit("SET_MOVEMENTS", response.data.movements);
      commit("SET_TOTAL_INCOMES", response.data.totalIncomes);
      commit("SET_TOTAL_EXPENSES", response.data.totalExpenses);
    });
  },
  GET_MOVEMENTS_BY_MONTH_AND_YEAR({ commit }, { month, year }) {
    return this.$axios
      .get(`/movements?month=${month}&year=${year}`)
      .then((response) => {
        commit("SET_MOVEMENTS", response.data.movements);
        commit("SET_TOTAL_INCOMES", response.data.totalIncomes);
        commit("SET_TOTAL_EXPENSES", response.data.totalExpenses);
      });
  },
  async CREATE_MOVEMENT({}, movement) {
    let movementUrl = "";

    switch (movement.type) {
      case "income":
        movementUrl = "/income";
        break;
      case "expense":
        movementUrl = "/expense";
        break;
      case "transfer":
        movementUrl = "/accounts/transfer";
        break;
    }

    let data = {
      name: movement.name,
      amount: movement.amount,
      date: new Date(movement.date),
      goal: movement.goal,
      account: movement.account,
    };

    if (movement.type === "transfer") {
      data.accountTo = movement.accountTo;
    } else {
      data.category = movement.category;
    }
    try {
      await this.$axios.post(movementUrl, data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async UPDATE_MOVEMENT({}, movement) {
    let movementUrl = "";

    switch (movement.type) {
      case "income":
        movementUrl = "/income";
        break;
      case "expense":
        movementUrl = "/expense";
        break;
      case "transfer":
        movementUrl = "/transfer";
        break;
    }

    let data = {
      name: movement.name,
      amount: movement.amount,
      date: movement.date,
      account: movement.account,
    };

    if (movement.type === "transfer") {
      data.accountTo = movement.accountTo;
    } else {
      data.category = movement.category;
      data.goal = movement.goal;
    }
    try {
      await this.$axios.put(`${movementUrl}/${movement.id}`, data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  async DELETE_MOVEMENT({}, { type, id }) {
    let movementUrl = "";

    switch (type) {
      case "income":
        movementUrl = "/income";
        break;
      case "expense":
        movementUrl = "/expense";
        break;
      case "transfer":
        movementUrl = "/transfer";
        break;
    }

    try {
      await this.$axios.delete(`${movementUrl}/${id}`);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};
