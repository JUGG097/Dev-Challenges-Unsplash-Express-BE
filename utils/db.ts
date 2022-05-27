import mongoose from "mongoose";
import config from "config";

const connectDB = async () => {
	try {
		const mongoUri = config.get<string>("MONGO_URI");
		await mongoose.connect(mongoUri);
		console.log(`MongoDB Connected...`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

export default connectDB;
