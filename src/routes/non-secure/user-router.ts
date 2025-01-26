import { Request, Response, Router } from "express";

import UserModels from "src/models/interface/user-models";
import { loginUserController, signupUserController } from "@controllers/user-controller";

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
    const credentials: UserModels.IAuthRequest = req.body;
    const result = await signupUserController(credentials);
    return res.send(result);
});

/**
 * login a user.
 * 
 * @returns tokens for access and refresh. also send isAdmin bool
 */
router.post(p.login, async (req: Request, res: Response) => {
    const credentials: UserModels.IAuthRequest = req.body;
    const result = await loginUserController(credentials);
    return res.send(result);
});

export default router;
