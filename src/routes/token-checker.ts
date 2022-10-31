import { Request, Response, NextFunction } from "express";
import { Const } from "../config";
import { findUser } from "../services";

export default ({ onlyAdmin }: { onlyAdmin: boolean } = { onlyAdmin: false }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined | null = req.session?.userToken;

    if (!token) {
      return res.json({
        result: "failure",
        timestamp: Date.now(),
        message: "Token Checker: No token in session object",
      });
    }

    const user = await findUser({ "token.token": token });

    if (
      !user.token.neverExpire &&
      Date.now() - user.token.createdAt > Const.tokenExpirationDuration
    ) {
      req.session = null;

      return res.json({
        result: "failure",
        timestamp: Date.now(),
        message: "Token Checker: Token expired, please log in",
      });
    }

    if (onlyAdmin && user.role !== Const.userRoleAdmin) {
      return res.json({
        result: "failure",
        timestamp: Date.now(),
        message: "Token Checker: Forbidden - only admin allowed",
      });
    }

    res.locals.user = user;
    res.locals.isAdmin = user.role === Const.userRoleAdmin;

    next();
  };
