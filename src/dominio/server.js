import http from "http";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import accountRouter from "./routers/accountRouter.js";
import incomeRouter from "./routers/incomeRouter.js";
import expenseRouter from "./routers/expenseRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import goalRouter from "./routers/goalRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/mis-gastos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/category", categoryRouter);
app.use("/api/goals", goalRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
