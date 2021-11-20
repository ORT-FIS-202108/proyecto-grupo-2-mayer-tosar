export const state = () => ({
  accounts: [
    {
      _id: 1,
      name: "Cuenta 1",
      amount: 1000,
      currency: "UYU",
    },
    {
      _id: 2,
      name: "Cuenta 2",
      amount: 6000,
      currency: "USD",
    },
  ],
  currencies: [
    { text: "UYU", value: "UYU" },
    { text: "USD", value: "USD" },
    { text: "EUR", value: "EUR" },
    { text: "ARS", value: "ARS" },
    { text: "BRL", value: "BRL" },
  ],
});

export const getters = {
  getAccountById: (state) => (id) => {
    return state.accounts.find((account) => account._id === id);
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
    return state.accounts.find((account) => account._id === id).currency;
  },
};
