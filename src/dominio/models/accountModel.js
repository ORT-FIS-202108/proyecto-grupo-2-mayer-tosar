import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    currency: { type: String, required: false, default: 'UYU' },
    amount: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
  }
);
const Account = mongoose.model('Account', accountSchema);

export default Account;
