import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";


// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
    login: "/login",
    logout: "/logout",
} as const;

// Cookie Properties
export const cookieProps = Object.freeze({
    key: "ExpressGeneratorTs",
    secret: process.env.COOKIE_SECRET,
    options: {
        httpOnly: true,
        signed: true,
        path: (process.env.COOKIE_PATH),
        maxAge: Number(process.env.COOKIE_EXP),
        domain: (process.env.COOKIE_DOMAIN),
        secure: (process.env.SECURE_COOKIE === "true"),
    },
});

/**
 * Logout the user.
 */
router.get(p.logout, (_: Request, res: Response) => {
    const { key, options } = cookieProps;
    res.clearCookie(key, options);
    return res.status(OK).end();
});


// Export router
export default router;
