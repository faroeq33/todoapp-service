import mongoose from 'mongoose';

export const connectDB = async () => {
	let uri = "";
	if (process.env.NODE_ENV === "production") {
		if (!process.env.MONGODB_CONNECTIONSTRING) {
			throw new Error("MONGODB_CONNECTIONSTRING is not defined");
		}
		uri = process.env.MONGODB_CONNECTIONSTRING;
		;
	} else {
		uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
		console.log("connectionstring: ", uri)
	}

	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Could not connect to MongoDB...", err);
	}
}