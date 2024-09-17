import Database from "../database/database";
import { ErrorHelper } from "../helpers/ErrorHelper";
import { ValidationHelper } from "../helpers/ValidationHelper";
import { TUser } from "../models/UserModel";

export class AuthController {
	async login(req: Request, res: Response) {
		// Your login logic here
	}

	static async register(userInput: TUser): Promise<{
		statusCode: number;
		message: string;
	}> {
		if (ValidationHelper.hasEmptyFields(userInput)) {
			return {
				statusCode: 400,
				message: "Missing email, password or username fields. Check if you have any typos"
			};
		}
		try {
			await Database.registerUser(userInput);

			return {
				statusCode: 201,
				message: "Account has been created"
			}
		} catch (error) {
			if (ErrorHelper.isDuplicate(error)) {
				return {
					statusCode: 400,
					message: 'A user with this this unique key already exists!',
				};
			}

			// logs the error to the console, so it won't expose the error to the user
			console.log(error);

			return {
				statusCode: 500,
				message: 'Internal server error'
			};
		}
		// Your register logic here
	}

	async logout(req: Request, res: Response) {
		// Your logout logic here
	}
}