import { Request, Response, Router } from "express";

import { loginUserController, signupUserController } from "@controllers/user-controller";
import { UserCredentials } from "@models/database/user-types";

const router = Router();

// Paths
export const p = {
    signup: "/signup",
    login: "/login",
} as const;

/**
 * Signup a user.
 * 
 * @returns true or false
 */
router.post(p.signup, async (req: Request, res: Response) => {
    const credentials: UserCredentials = req.body;
    const result = await signupUserController(credentials);
    return res.send(result);
});

/**
 * login a user.
 * 
 * @returns tokens for access and refresh. also send bool
 */
router.post(p.login, async (req: Request, res: Response) => {
    const credentials: UserCredentials = req.body;
    const result = await loginUserController(credentials);
    return res.send(result);
});

export default router;
