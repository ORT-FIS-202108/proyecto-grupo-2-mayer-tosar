import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Account from "../models/accountModel.js";
import Goal from "../models/goalModel.js";
import Income from "../models/incomeModel.js";
import { isAuth } from "../utils.js";

const incomeRouter = express.Router();

incomeRouter.use(isAuth);

incomeRouter.get("/", async (req, res) => {
  const month = req.query.month || new Date().getMonth();
  const year = req.query.year || new Date().getFullYear();
  const currency = req.query.currency || "UYU";
  const date = new Date(year, month);

  const incomes = await Income.find({
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), 1),
      $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    },
    currency: currency,
  });

  const totalIncomes = incomes.reduce((acc, income) => {
    return acc + income.amount;
  }, 0);

  res.send({ incomes, totalIncomes });
});

incomeRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const income = new Income({
      name: req.body.name,
      amount: req.body.amount,
      date: new Date(req.body.date),
      user: new mongoose.mongo.ObjectId(req.user._id),
      account: new mongoose.mongo.ObjectId(req.body.account),
      category: new mongoose.mongo.ObjectId(req.body.category),
      goal: req.body.goal ? new mongoose.mongo.ObjectId(req.body.goal) : null,
    });

    const account = await Account.findById(income.account._id);
    account.amount += income.amount;
    await account.save();

    const goal = await Goal.findById(req.body.goal);
    goal.currentAmount += income.amount;
    await goal.save();

    const createdIncome = await income.save();
    res.send({ message: "Income Created", income: createdIncome });
  })
);

incomeRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const incomeId = req.params.id;
    const income = await Income.findById(incomeId);
    if (income) {
      const oldAmount = income.amount;
      const oldAccountId = income.account;

      income.amount = req.body.amount || income.amount;
      income.date = new Date(req.body.date) || new Date(income.date);
      income.name = req.body.title || income.name;
      income.account = req.body.account || income.account;
      income.category = req.body.category || income.category;
      income.goal = req.body.goal || income.goal;

      const updatedIncome = await income.save();

      if (oldAccountId !== updatedIncome.account._id.toString()) {
        const oldAccount = await Account.findById(oldAccountId);
        oldAccount.amount -= oldAmount;
        await oldAccount.save();

        const newAccount = await Account.findById(updatedIncome.account._id);
        newAccount.amount += updatedIncome.amount;
        await newAccount.save();
      } else {
        const account = await Account.findById(updatedIncome.account._id);
        account.amount += updatedIncome.amount - oldAmount;
        await account.save();
      }

      const goal = await Goal.findById(req.body.goal);
      goal.currentAmount += income.amount;
      await goal.save();

      res.send({ message: "Income Updated", income: updatedIncome });
    } else {
      res.status(404).send({ message: "Income Not Found" });
    }
  })
);

incomeRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const income = await Income.findById(req.params.id);
    if (income) {
      const account = await Account.findById(income.account._id);
      account.amount -= income.amount;
      await account.save();

      const deleteIncome = await income.remove();
      res.send({ message: "Income Deleted", income: deleteIncome });
    } else {
      res.status(404).send({ message: "Income Not Found" });
    }
  })
);

export default incomeRouter;
