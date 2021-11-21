import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    account: { type: mongoose.Schema.Types.ObjectID, ref: 'Account' },
  },
  {
    timestamps: true,
  }
);
const Income = mongoose.model('Income', incomeSchema);

export default Income;
