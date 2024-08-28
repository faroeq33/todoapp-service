import { JwtPayload } from "jsonwebtoken";

export default interface CustomRequest extends Request {
	admin: string | JwtPayload;
}