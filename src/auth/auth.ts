import jwt, { TokenExpiredError } from "jsonwebtoken";
import {jwtDecode} from "jwt-decode";
import { Request, NextFunction, Response } from "express";
import * as dotenv from "dotenv";
import path from "path";
import { ObjectId } from "mongodb";
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
// if (dotenvResult.error) {
//   console.error("Error loading .env file:", dotenvResult.error);
// }
const config = process.env;
interface JwtPayload {
  user_id: string;
  userName: string;
  iat: number;
  exp: number;
}
const auth = (type = "none") => {
  return async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { db, redis } = req.app.locals;
    const token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    console.log();
    const newtoken = req.header("Authorization").replace("Bearer ", "");
    // const token =
    //   req.body.token || req.query.token || req.headers["x-access-token"];

    try {
      // const decoded = jwt.verify(token, config.TOKEN_KEY as string);
      const decodedToken = jwtDecode<JwtPayload>(newtoken);
      const { user_id } = decodedToken;
      req.user = user_id;
      next();
    } catch (e) {
      console.log(e);
      if (e instanceof TokenExpiredError) {
        return res.status(404).send({
          status: 404,
          code: "Session Expired",
          error: "Session Expired, Please try to login again",
        });
      }
      // if (!e.status) captureException(e);
      // res.status(e.status || 500).send({
      //   status: e.status || 500,
      //   code: e.status ? e.code : "UNKNOWN_ERROR",
      //   error: e.status ? e.message : "Something went wrong",
      // });
    }
  };
};

export default auth;

// function captureException(e: any) {
//   throw new Error("Function not implemented.");
// }