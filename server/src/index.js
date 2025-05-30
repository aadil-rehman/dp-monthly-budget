require("dotenv").config();
const express = require("express");
const mongoDBConnect = require("./config/database");
const userRouter = require("./routes/user");
const transactionRouter = require("./routes/transaction");
const cookieParser = require("cookie-parser");
const budgetRouter = require("./routes/budget");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: "https://dp-monthly-budget.vercel.app",
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.use("/transaction", transactionRouter);
app.use("/budget", budgetRouter);

mongoDBConnect()
	.then(() => {
		console.log("Database connection established");
		app.listen(PORT, "0.0.0.0", () => {
			console.log(`Server listening on Port ${PORT}....`);
		});
	})
	.catch((err) => {
		console.log("Database cannot be connected");
		console.log(err);
	});
