import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
	username: string;
	email: string;
	password: string;
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true }, // Add unique property
	password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err: unknown) {
		const error = err as Error;
		next(error);
	}
});

export default model<IUser>('User', userSchema);
