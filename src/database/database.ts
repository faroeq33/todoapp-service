import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

class Database {
	private static _database: Database
	private constructor() {
		// let uri = "";
		// if (process.env.NODE_ENV === "production") {
		// 	if (!process.env.MONGODB_CONNECTIONSTRING) {
		// 		throw new Error("MONGODB_CONNECTIONSTRING is not defined");
		// 	}
		// 	uri = process.env.MONGODB_CONNECTIONSTRING;

		// } else {
		// 	uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
		// 	console.log("connectionstring: ", uri)
		// }
		const dbUrl = process.env.DB_URL
		if (dbUrl) {
			mongoose.connect(dbUrl)
				.then(() => console.log('Connected with database'))
				.catch(() => console.log('Not connected with database'))
		}
		if (!dbUrl) {
			console.log('DB_URL is not defined')
		}
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