import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    type: { type: String, required: false, default: "transfer" },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    from: { type: mongoose.Schema.Types.ObjectID, ref: "Account" },
    to: { type: mongoose.Schema.Types.ObjectID, ref: "Account" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;
