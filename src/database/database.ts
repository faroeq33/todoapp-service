import User, { TUser } from "../models/UserModel";
import mongoose from "mongoose";
import { config as env } from "../config";

class Database {
  private static _database: Database;

  private constructor() {
    const { CONNECTIONSTRING } = env;

    if (env.NODE_ENV === "DEV" && CONNECTIONSTRING) {
      console.log(CONNECTIONSTRING);
    }

    if (!CONNECTIONSTRING) {
      console.log("DB_URL is not defined");
    }

    mongoose
      .connect(CONNECTIONSTRING)
      .then(() => console.log("Connected with database"))
      .catch(() => console.log("Not connected with database"));
  }

  static getInstance() {
    if (this._database) {
      return this._database;
    }
    this._database = new Database();
    return this._database;
  }

  static async registerUser(userInput: TUser) {
    const admin = new User(userInput);
    return await admin.save();
  }

  static async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }
}

export { Database };
