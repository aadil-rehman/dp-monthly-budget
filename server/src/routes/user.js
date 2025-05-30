const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
	const { name, emailId, password } = req.body;

	try {
		const passwordHash = await bcrypt.hash(password, 10);

		const user = new User({ name, emailId, password: passwordHash });

		await user.save();

		console.log(passwordHash);

		res.json({
			status: 1,
			message: "User registered successfully",
			data: user,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

userRouter.post("/login", async (req, res) => {
	const { emailId, password } = req.body;

	try {
		const user = await User.findOne({ emailId: emailId });

		if (!user) {
			throw new Error("No user found!");
		}

		const passwordHash = user.password;
		const inputPassword = password;

		const isValidPassword = await bcrypt.compare(inputPassword, passwordHash);

		if (isValidPassword) {
			//1. create jwt token
			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});
			//2. add token to cookie
			res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "None", // allow cross-site
				expires: new Date(Date.now() + 8 * 3600000),
			});

			res.json({ status: 1, message: "Login successfull!", data: user });
		} else {
			throw new Error("Invalid crednetials");
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

userRouter.get("/profile", userAuth, (req, res) => {
	try {
		const loggedinUser = req.user;

		res.json({
			status: 1,
			message: "User feteched successfully",
			data: loggedinUser,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

userRouter.post("/logout", (req, res) => {
	try {
		res
			.cookie("token", null, {
				httpOnly: true,
				secure: true,
				sameSite: "None",
				expires: new Date(Date.now()),
			})
			.json({ status: 1, message: "Logout successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = userRouter;
