import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Account from '../models/accountModel.js';
import Income from '../models/incomeModel.js';
import { isAdmin, isAuth } from '../utils.js';

const incomeRouter = express.Router();

incomeRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const date = req.query.date || '';
    const author = req.query.author || '';
    const account = req.query.account || '';

    const dateFilter = date ? { date: { $regex: date, $options: 'i' } } : {};
    const authorFilter = author ? { author: new mongoose.mongo.ObjectId(author) } : {};
    const accountFilter = account ? { account: new mongoose.mongo.ObjectId(account) } : {};
    
    const income = await Income.find({
      ...dateFilter,
      ...authorFilter,
      ...accountFilter
    })
      .populate('author', '_id isAdmin name email')
      .populate('account', 'name amount currency');

    res.send({ income, total: income.length });
  })
);

incomeRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const income = await Income.findById(req.params.id).populate();
    if (income) {
      res.send(income);
    } else {
      res.status(404).send({ message: 'Income Not Found' });
    }
  })
);

incomeRouter.post(
  '/',
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const income = new Income({
      amount: req.body.amount,
      date: req.body.date,
      title: req.body.title,
      author: req.user._id,
      account: new mongoose.mongo.ObjectId(req.body.account)
    });

    const account = await Account.findById(income.account._id);
    account.amount += income.amount;
    const updatedAccount = await account.save();

    const createdIncome = await income.save();
    res.send({ message: 'Income Created', income: createdIncome });
  })
);
incomeRouter.put(
  '/:id',
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const incomeId = req.params.id;
    const income = await Income.findById(incomeId);
    if (income) {
      income.amount = req.body.amount || income.amount;
      income.date = req.body.date || income.date;
      income.title = req.body.title || income.title;

      const updatedIncome = await income.save();
      res.send({ message: 'Income Updated', income: updatedIncome });
    } else {
      res.status(404).send({ message: 'Income Not Found' });
    }
  })
);

incomeRouter.delete(
  '/:id',
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const income = await Income.findById(req.params.id);
    if (income) {
      const deleteIncome = await income.remove();
      res.send({ message: 'Income Deleted', income: deleteIncome });
    } else {
      res.status(404).send({ message: 'Income Not Found' });
    }
  })
);

export default incomeRouter;
