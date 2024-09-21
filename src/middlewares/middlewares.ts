import { NextFunction, Request, Response } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

import ErrorResponse from '../interfaces/ErrorResponse';
import { AuthRequest } from '../interfaces/AuthRequest';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.admin = decoded; // In order to use this in the next middleware
  } catch (err) {
    console.log(err);
    return res.status(403).send("Invalid Token");
  }
  return next();
}