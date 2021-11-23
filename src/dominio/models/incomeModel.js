import mongoose from "mongoose";
import Account from "./accountModel.js";

const incomeSchema = new mongoose.Schema(
  {
    type: { type: String, required: false, default: "income" },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    account: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Account",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User", required: true },
    category: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Category",
      required: true,
    },
    goal: { type: mongoose.Schema.Types.ObjectID, ref: "Goal", default: null },
  },
  {
    timestamps: true,
  }
);
const Income = mongoose.model("Income", incomeSchema);

export default Income;
