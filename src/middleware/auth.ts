import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../database";
import { pool } from "../database/db";

const auth = (...roles: ('admin' | 'customer') []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];   
      if (!token) {
       throw new Error("You're not authorized")
      }
      const decoded = Jwt.verify(token, config.jwtSecret as string
      ) as JwtPayload;
      // console.log({ decoded });
      const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      decoded.email,
    ]);

    if (user.rows.length === 0) {
      throw new Error("Users not found");
    }
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("not authorized")
      }

      next();
  };
};

export default auth;
