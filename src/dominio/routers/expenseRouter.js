import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Account from '../models/accountModel.js';
import Expense from '../models/expenseModel.js';
import { isAdmin, isAuth } from '../utils.js';

const expenseRouter = express.Router();

expenseRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const date = req.query.date || '';
    const author = req.query.author || '';
    const account = req.query.account || '';

    const dateFilter = date ? { date: { $regex: date, $options: 'i' } } : {};
    const authorFilter = author ? { author: new mongoose.mongo.ObjectId(author) } : {};
    const accountFilter = account ? { account: new mongoose.mongo.ObjectId(account) } : {};
    
    const expenses = await Expense.find({
      ...dateFilter,
      ...authorFilter,
      ...accountFilter
    })
      .populate('author', '_id isAdmin name email')
      .populate('account', 'name amount currency');

    res.send({ expenses, total: expenses.length });
  })
);

expenseRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id).populate();
    if (expense) {
      res.send(expense);
    } else {
      res.status(404).send({ message: 'Expense Not Found' });
    }
  })
);

expenseRouter.post(
  '/',
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const expense = new Expense({
      amount: req.body.amount,
      date: req.body.date,
      title: req.body.title,
      author: req.user._id,
      account: new mongoose.mongo.ObjectId(req.body.account)
    });

    const account = await Account.findById(expense.account._id);
    account.amount -= expense.amount;
    const updatedAccount = await account.save();

    const createdExpense = await expense.save();
    res.send({ message: 'Expense Created', expense: createdExpense });
  })
);
expenseRouter.put(
  '/:id',
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const expenseId = req.params.id;
    const expense = await Expense.findById(expenseId);
    if (expense) {
      expense.amount = req.body.amount || expense.amount;
      expense.date = req.body.date || expense.date;
      expense.title = req.body.title || expense.title;

      const updatedExpense = await expense.save();
      res.send({ message: 'Expense Updated', expense: updatedExpense });
    } else {
      res.status(404).send({ message: 'Expense Not Found' });
    }
  })
);

expenseRouter.delete(
  '/:id',
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const expense = await Income.findById(req.params.id);
    if (expense) {
      const deleteExpense = await income.remove();
      res.send({ message: 'Expense Deleted', income: deleteExpense });
    } else {
      res.status(404).send({ message: 'Expense Not Found' });
    }
  })
);

export default expenseRouter;
