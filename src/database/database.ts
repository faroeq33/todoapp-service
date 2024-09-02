import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

class Database {
	private static _database: Database
	private constructor() {
		let uri = "";
		if (process.env.NODE_ENV === "production") {
			if (!process.env.MONGODB_CONNECTIONSTRING) {
				throw new Error("MONGODB_CONNECTIONSTRING is not defined");
			}
			uri = process.env.MONGODB_CONNECTIONSTRING;

		} else {
			uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
			console.log("connectionstring: ", uri)
		}

		mongoose.connect(uri)
			.then(() => console.log("Connected to MongoDB"))
			.catch((err) => console.error("Could not connect to MongoDB...", err));

	}
	static getInstance() {
		if (this._database) {
			return this._database
		}
		this._database = new Database()
		return this._database;
	}
}

export default Database