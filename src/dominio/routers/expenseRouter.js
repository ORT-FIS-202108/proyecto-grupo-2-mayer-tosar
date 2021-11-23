import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Account from "../models/accountModel.js";
import Expense from "../models/expenseModel.js";
import Goal from "../models/goalModel.js";
import { isAuth } from "../utils.js";

const expenseRouter = express.Router();

expenseRouter.use(isAuth);

expenseRouter.get("/", async (req, res) => {
  const month = req.query.month || new Date().getMonth();
  const year = req.query.year || new Date().getFullYear();
  const currency = req.query.currency || "UYU";
  const date = new Date(year, month);

  const expenses = await Expense.find({
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), 1),
      $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    },
    currency: currency,
  });

  const totalExpenses = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  res.send({ expenses, totalExpenses });
});

expenseRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const expense = new Expense({
      name: req.body.name,
      amount: req.body.amount,
      date: new Date(req.body.date),
      user: new mongoose.mongo.ObjectId(req.user._id),
      account: new mongoose.mongo.ObjectId(req.body.account),
      category: new mongoose.mongo.ObjectId(req.body.category),
      goal: req.body.goal ? new mongoose.mongo.ObjectId(req.body.goal) : null,
    });

    const account = await Account.findById(expense.account);
    account.amount -= expense.amount;
    await account.save();

    const goal = await Goal.findById(req.body.goal);
    goal.currentAmount -= expense.amount;
    await goal.save();

    const createdExpense = await expense.save();
    res.send({ message: "Expense Created", expense: createdExpense });
  })
);

expenseRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const expenseId = req.params.id;
    const expense = await Expense.findById(expenseId);
    if (expense) {
      const oldAmount = expense.amount;
      const oldAccountId = expense.account;

      expense.amount = req.body.amount || expense.amount;
      expense.date = new Date(req.body.date) || new Date(expense.date);
      expense.name = req.body.title || expense.name;
      expense.account = req.body.account || expense.account;
      expense.category = req.body.category || expense.category;
      expense.goal = req.body.goal || expense.goal;

      const updatedExpense = await expense.save();

      if (oldAccountId !== updatedExpense.account._id.toString()) {
        const oldAccount = await Account.findById(oldAccountId);
        oldAccount.amount += oldAmount;
        await oldAccount.save();

        const newAccount = await Account.findById(updatedExpense.account._id);
        newAccount.amount -= updatedExpense.amount;
        await newAccount.save();
      } else {
        const account = await Account.findById(updatedExpense.account._id);
        account.amount += updatedExpense.amount - oldAmount;
        await account.save();
      }

      const goal = await Goal.findById(req.body.goal);
      goal.currentAmount -= expense.amount;
      await goal.save();

      res.send({ message: "Expense Updated", expense: updatedExpense });
    } else {
      res.status(404).send({ message: "Expense Not Found" });
    }
  })
);

expenseRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (expense) {
      const account = await Account.findById(expense.account._id);
      account.amount += expense.amount;
      await account.save();

      const deleteExpense = await expense.remove();
      res.send({ message: "Expense Deleted", expense: deleteExpense });
    } else {
      res.status(404).send({ message: "Expense Not Found" });
    }
  })
);

export default expenseRouter;
