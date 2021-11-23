import express from "express";
import expressAsyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js";
import Income from "../models/incomeModel.js";
import { isAuth } from "../utils.js";

const movementRouter = express.Router();

movementRouter.use(isAuth);

movementRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const month = req.query.month || new Date().getMonth();
    const year = req.query.year || new Date().getFullYear();

    const date = new Date(year, month);
    const userFilter = { user: req.user._id };

    const expenses = await Expense.find({
      ...userFilter,
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      },
    }).populate("account", "currency name");

    const incomes = await Income.find({
      ...userFilter,
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      },
    }).populate("account", "currency name");

    let totalExpenses = 0;
    let totalIncomes = 0;

    expenses.map((expense) => {
      if (expense.account.currency == "UYU") {
        totalExpenses += expense.amount;
      }
    }, {});

    incomes.map((income) => {
      if (income.account.currency == "UYU") {
        totalIncomes += income.amount;
      }
    }, {});

    const movements = expenses.concat(incomes).sort((a, b) => {
      return a.date - b.date;
    });

    res.send({
      movements,
      totalExpenses,
      totalIncomes,
    });
  })
);

export default movementRouter;
