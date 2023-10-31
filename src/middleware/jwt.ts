import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../const";

export interface AuthState {
  user: {
    id: string;
  };
}

export default class JWTMiddleware {
  constructor() {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  }

  public auth: RequestHandler<unknown, unknown, unknown, unknown, AuthState> = (
    req,
    res,
    next
  ) => {
    try {
      const token = req.header("Authorization")!.replace("Bearer ", "");

      const { id } = verify(token, JWT_SECRET!) as JwtPayload;

      if (typeof id !== "string") throw new Error(`Unexpected id value: ${id}`);

      res.locals = {
        user: { id: id },
      };

      return next();
    } catch (error) {
      return res.status(403).send(`Forbidden: ${error}`);
    }
  };
}
