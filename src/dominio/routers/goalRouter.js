import express from "express";
import expressAsyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";
import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
import { isAuth } from "../utils.js";

const goalRouter = express.Router();

goalRouter.use(isAuth);

goalRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const goals = await Goal.find({ user: user._id });

    res.json({ goals });
  })
);

goalRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id).populate();

    if (goal) {
      res.send({ goal, totalGoal });
    } else {
      res.status(404).send({ message: "Goal Not Found" });
    }
  })
);

goalRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const goal = await Goal.findOne({
      user: user._id,
      name: req.body.name,
    });

    if (goal) {
      res.status(400).send({ message: "Goal already exists" });
    } else {
      const newGoal = new Goal({
        user: user._id,
        name: req.body.name,
        currency: req.body.currency,
        targetAmount: req.body.targetAmount,
        date: new Date(req.body.date),
      });
      const savedGoal = await newGoal.save();
      res.send(savedGoal);
    }
  })
);

goalRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const goalId = req.params.id;
    const goal = await Goal.findById(goalId);
    if (goal) {
      goal.name = req.body.name || goal.name;
      goal.currency = req.body.currency || goal.currency;
      goal.targetAmount = req.body.targetAmount || goal.targetAmount;
      goal.date = new Date(req.body.date) || goal.date;

      const updatedGoal = await goal.save();
      res.send({ message: "Goal Updated", goal: updatedGoal });
    } else {
      res.status(404).send({ message: "Goal Not Found" });
    }
  })
);

goalRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (goal) {
      await Income.updateMany({ goal: goal._id }, { $set: { goal: null } });
      await Expense.updateMany({ goal: goal._id }, { $set: { goal: null } });
      await goal.remove();
      res.send({ message: "Goal Deleted" });
    } else {
      res.status(404).send({ message: "Goal Not Found" });
    }
  })
);

goalRouter.get(
  "/:id/movements",
  expressAsyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id).populate();
    if (goal) {
      const incomes = await Income.find({ goal: goal._id });
      const expenses = await Expense.find({ goal: goal._id });

      const movements = incomes.concat(expenses).sort((a, b) => {
        return a.date - b.date;
      });

      res.send({ movements });
    } else {
      res.status(404).send({ message: "Goal Not Found" });
    }
  })
);

export default goalRouter;
