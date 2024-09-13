import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

class Database {
	private static _database: Database

	private constructor() {
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