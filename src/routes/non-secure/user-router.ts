import { Request, Response, Router } from "express";

import UserController from "./../../controllers/user-controller";

import UserModels from "src/models/interface/user-models";

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
    const result = await UserController.signup(credentials);
    return res.send(result);
});

/**
 * login a user.
 * 
 * @returns tokens for access and refresh. also send is_admin bool
 */
router.post(p.login, async (req: Request, res: Response) => {
    const credentials: UserModels.IAuthRequest = req.body;
    const result = await UserController.login(credentials);
    return res.send(result);
});

export default router;
