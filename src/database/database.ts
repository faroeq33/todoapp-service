import User, { TUser } from '../models/UserModel';
import mongoose from "mongoose";
import { DB_URL } from '../config'

class Database {
	private static _database: Database

	private constructor() {
		const dbUrl = DB_URL

		if (process.env.NODE_ENV === 'DEV' && dbUrl) {
			console.log(dbUrl)
		}

		if (dbUrl) {
			const testurl = 'mongodb://mongoadmin:secret@localhost:27017'
			console.log('current db url', dbUrl)
			mongoose.connect(testurl)
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

	static async registerUser(userInput: TUser) {
		const admin = new User(userInput);
		return await admin.save();
	}
}

export default Database