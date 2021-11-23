import express from "express";
import expressAsyncHandler from "express-async-handler";
import Account from "../models/accountModel.js";
import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
import Transfer from "../models/transferModel.js";
import { isAuth } from "../utils.js";

const accountRouter = express.Router();

accountRouter.use(isAuth);

accountRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const accounts = await Account.find({ user: user._id });
    res.send({ accounts });
  })
);

accountRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id).populate();
    if (account) {
      res.send(account);
    } else {
      res.status(404).send({ message: "Account Not Found" });
    }
  })
);

accountRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const account = await Account.findOne({
      user: user._id,
      name: req.body.name,
    });
    if (account) {
      res.status(400).send({ message: "Account already exists" });
    } else {
      const newAccount = new Account({
        name: req.body.name,
        user: user._id,
        currency: req.body.currency,
        amount: req.body.amount,
      });
      const savedAccount = await newAccount.save();
      res.send(savedAccount);
    }
  })
);

accountRouter.post(
  "/transfer",
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const name = req.body.name;

    const account = await Account.findById(req.body.account);
    const accountTo = await Account.findById(req.body.accountTo);

    if (!account) {
      res.status(400).send({ message: "From account not exists" });
    } else if (!accountTo) {
      res.status(400).send({ message: "To account not exists" });
    } else {
      account.amount -= parseInt(req.body.amount);
      accountTo.amount += parseInt(req.body.amount);

      await account.save();
      await accountTo.save();

      const newTransfer = new Transfer({
        name,
        amount: req.body.amount,
        date: req.body.date,
        from: account._id,
        to: accountTo._id,
        user: user._id,
      });

      const savedTransfer = await newTransfer.save();
      res.send(savedTransfer);
    }
  })
);

accountRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);
    if (account) {
      account.name = req.body.name;
      account.currency = req.body.currency;
      account.amount = req.body.amount;

      const updatedAccount = await account.save();
      res.send({ message: "Account Updated", account: updatedAccount });
    } else {
      res.status(404).send({ message: "Account Not Found" });
    }
  })
);

accountRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);

    if (account) {
      const totalIncomes = await Income.find({ account: account._id });
      const totalExpenses = await Expense.find({ account: account._id });

      if (totalIncomes.length > 0 || totalExpenses.length > 0) {
        res.status(400).send({ message: "Account has incomes or expenses" });
      } else {
        await Account.findByIdAndDelete(req.params.id);
        res.send({ message: "Account Deleted" });
      }
    } else {
      res.status(404).send({ message: "Account Not Found" });
    }
  })
);

export default accountRouter;
