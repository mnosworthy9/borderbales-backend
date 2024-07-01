import StatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

import { cookieProps } from "@routes/secure/user-router";
import jwtUtil from "@util/jwt-util";


// Constants
const { UNAUTHORIZED } = StatusCodes;
const jwtNotPresentErr = "JWT not present in signed cookie.";

enum UserRoles {
    Admin,
    User
}

/**
 * Middleware to verify if user is an admin.
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export async function adminMw(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.headers.authorization !== undefined) {
            const accessToken = req.headers.authorization.split(" ")[1]
            try {
              if (process.env.JWT_ACCESS_SECRET !== undefined) {
                jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
              }
              next()
            } catch (error) {
              res.sendStatus(401)
            }
          } else {
            res.sendStatus(401)
          }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
}
