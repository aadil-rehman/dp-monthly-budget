require("dotenv").config();
const express = require("express");
const mongoDBConnect = require("./config/database");
const userRouter = require("./routes/user");
const transactionRouter = require("./routes/transaction");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 5000;

app.use("/", userRouter);
app.use("/transaction", transactionRouter);

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
