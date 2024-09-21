import { TUser } from "../models/UserModel";

export class ValidationHelper {
  static hasEmptyFields(user: TUser) {
    if (!user.email || !user.password || !user.username) {
      return true;
    }
    return false;
  }
}
