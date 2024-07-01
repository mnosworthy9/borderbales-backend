import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import StatusCodes from "http-status-codes";
import express, { Request, Response } from "express";
import cors from "cors";

import "express-async-errors";

import BaseRouter from "./routes/non-secure/api";
import SecureRouter from "./routes/secure/api-secure";
import logger from "jet-logger";
import { cookieProps } from "@routes/secure/user-router";
import { CustomError } from "@shared/errors";
import authMiddleware from "./auth/auth-middleware";

const app = express();



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
    app.use(helmet());
}

app.use(cors());

// Add APIs
app.use("/api", BaseRouter);
app.use("/secure/api", authMiddleware, SecureRouter);

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return status;
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// Set views directory (html)
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// Nav to login pg by default
app.get("/", (_: Request, res: Response) => {
    res.sendFile("login.html", {root: viewsDir});
});

// Redirect to login if not logged in.
app.get("/users", (req: Request, res: Response) => {
    const jwt = req.signedCookies[cookieProps.key];
    if (!jwt) {
        res.redirect("/");
    } else {
        res.sendFile("users.html", {root: viewsDir});
    }
});



/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;
