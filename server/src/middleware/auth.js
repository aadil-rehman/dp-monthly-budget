const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return res.status(401).json({ error: "Please login" });
		}

		const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

		const { _id } = decodedObj;

		const user = await User.findOne({ _id: _id });

		if (!user) {
			throw new Error("User not found!");
		}

		req.user = user;

		next();
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = userAuth;
