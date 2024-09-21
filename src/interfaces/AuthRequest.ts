import { Request } from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";
export interface AuthRequest extends Request {
  admin?: string | JwtPayload;
}
