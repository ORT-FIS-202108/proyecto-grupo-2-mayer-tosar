import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
import { isAuth } from "../utils.js";

const categoryRouter = express.Router();

categoryRouter.use(isAuth);

categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const categories = await Category.find({ user: user._id });
    res.send({ categories });
  })
);

categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id).populate();
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const category = await Category.findOne({
      user: user._id,
      name: req.body.name,
    });
    if (category) {
      res.status(400).send({ message: "Category already exist" });
    } else {
      const newCategory = new Category({
        name: req.body.name,
        user: user._id,
      });
      const savedCategory = await newCategory.save();
      res.send(savedCategory);
    }
  })
);

categoryRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
      category.name = req.body.name;

      const updatedCategory = await category.save();
      res.send({ message: "Category Updated", category: updatedCategory });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      const totalIncome = await Income.find({ category: category._id });
      const totalExpense = await Expense.find({ category: category._id });
      if (totalIncome.length > 0 || totalExpense.length > 0) {
        res.status(400).send({ message: "Category has transactions" });
      } else {
        await category.remove();
        res.send({ message: "Category Deleted" });
      }
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

export default categoryRouter;
