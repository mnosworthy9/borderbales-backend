import { Request, Response, Router } from "express";
import userController from "src/controllers/user-controller";


// Constants
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
    const {email, password} = req.body;
    const result = await userController.signupUser(email, password);
    return res.send(result);
});

/**
 * login a user.
 * 
 * @returns tokens for access and refresh. also send is_admin bool
 */
router.post(p.login, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await userController.loginUser(email, password);
    return res.send(result);
});

// Export default
export default router;
