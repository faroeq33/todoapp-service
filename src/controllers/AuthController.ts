import Database from "../database/database";
import { ErrorHelper } from "../helpers/ErrorHelper";
import { ValidationHelper } from "../helpers/ValidationHelper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TUser } from "../models/UserModel";

type AuthResponse = Promise<{
  statusCode: number;
  message: string;
  token?: string;
  expiresIn?: number;
}>;

export class AuthController {
  static async register(userInput: TUser): AuthResponse {
    if (ValidationHelper.hasEmptyFields(userInput)) {
      return {
        statusCode: 400,
        message:
          "Missing email, password or username fields. Check if you have any typos",
      };
    }

    try {
      await Database.registerUser(userInput);

      return {
        statusCode: 201,
        message: "Account has been created",
      };
    } catch (error) {
      if (ErrorHelper.isDuplicate(error)) {
        return {
          statusCode: 400,
          message: "A user with this this unique key already exists!",
        };
      }

      // logs the error to the console, so it won't expose the error to the user
      console.log(error);

      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  static async login(userInput: TUser): AuthResponse {
    if (ValidationHelper.hasEmptyFields(userInput)) {
      return {
        statusCode: 400,
        message:
          "Missing email, password or username fields. Check if you have any typos",
      };
    }

    try {
      const dbUser = await Database.findUserByEmail(userInput.email);
      if (!dbUser) {
        return {
          statusCode: 404,
          message: "User not found",
        };
      }

      // check if password is correct
      const isPasswordValid = await bcrypt.compare(
        userInput.password,
        dbUser.password
      );

      if (!isPasswordValid) {
        return {
          statusCode: 400,
          message: "Invalid password",
        };
      }

      // create a token
      const token = await jwt.sign(
        { _id: dbUser._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "12h",
        }
      );

      return {
        statusCode: 201,
        token,
        expiresIn: 43200,
        message: "User logged in",
      };
    } catch (err: any) {
      // logs the error to the console, so it won't expose the error to the user
      console.log(err);

      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async logout(req: Request, res: Response) {
    // Your logout logic here
  }
}
