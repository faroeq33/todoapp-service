import { MongoError } from "mongodb";

export class ErrorHelper {
  static isDuplicate(error: unknown): boolean {
    return (error as MongoError).code === 11000;
  }
}
