import { Router } from "express";
import { adminMw } from "../middleware";
import authRouter from "./user-router";
import userRouter from "../non-secure/user-router";


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", adminMw, userRouter);

// Export default
export default apiRouter;