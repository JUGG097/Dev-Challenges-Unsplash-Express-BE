const dotenv = require("dotenv");
dotenv.config();

export default {
	MONGO_URI: process.env.MONGO_URI,
};
