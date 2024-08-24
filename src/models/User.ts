/* TODO: integrate this new model with old user schema*/
import { Schema, model } from 'mongoose';

interface User {
	id: string;
	username: string;
	email: string;
	password_hash: string;
	created_at: Date;
	updated_at: Date;
}

const userSchema = new Schema<User>({
	id: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password_hash: { type: String, required: true },
	created_at: { type: Date, required: true, default: Date.now },
	updated_at: { type: Date, required: true, default: Date.now },
});

const UserModel = model<User>('User', userSchema);
export default UserModel;
