import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    currency: { type: String, required: false, default: "UYU" },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, required: true, default: 0 },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
