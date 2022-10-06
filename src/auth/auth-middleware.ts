 /* eslint-disable */
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken"

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization !== undefined) {
    const accessToken = req.headers.authorization.split(" ")[1]
    try {
      let decodedToken: any;
      if (process.env.JWT_ACCESS_SECRET !== undefined) {
        decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      }
      next()
    } catch (error) {
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(401)
  }
}
