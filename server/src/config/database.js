const mongoose = require("mongoose");

const mongoDBConnect = async () => {
	const mongoURI = process.env.MONGO_URI;
	if (!mongoURI) throw new Error("MONGO_URI not defined in .env");
	await mongoose.connect(mongoURI);
};

module.exports = mongoDBConnect;
