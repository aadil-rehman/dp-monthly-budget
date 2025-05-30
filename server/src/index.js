require("dotenv").config();
const express = require("express");
const mongoDBConnect = require("./config/database");
const userRouter = require("./routes/user");
const transactionRouter = require("./routes/transaction");
const cookieParser = require("cookie-parser");
const budgetRouter = require("./routes/budget");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(
	cors({
		origin: "http://localhost:5173",
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
		app.listen(PORT, () => {
			console.log(`Server listening on Port ${PORT}....`);
		});
	})
	.catch((err) => {
		console.log("Database cannot be connected");
		console.log(err);
	});
