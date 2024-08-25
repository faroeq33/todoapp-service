import { NextFunction, Request, Response } from 'express-serve-static-core';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
	admin: string | JwtPayload;
}

function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		req.admin = decoded; // In order to use this in the next middleware
	} catch (err) {
		console.log(err);
		return res.status(401).send("Invalid Token");
	}
	return next();
}

export default verifyToken;
