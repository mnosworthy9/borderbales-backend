import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
    logout: "/logout",
} as const;

/**
 * Logout the user.
 */
router.get(p.logout, (_: Request, res: Response) => {
    return res.status(OK).end();
});

// Export router
export default router;
