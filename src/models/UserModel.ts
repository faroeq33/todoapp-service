/* TODO: integrate this new model with old user schema*/
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export type TUser = {
  // id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

const userSchema = new Schema<TUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
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

userSchema.methods.toJSON = function removeVersionKey() {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

const UserModel = model<TUser>("User", userSchema);
export default UserModel;
