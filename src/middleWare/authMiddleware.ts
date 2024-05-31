import { Request, NextFunction, Response } from "express";
import { verifyTokenWithJwt } from "../helpers/helper";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { COL } from "../constant/constant";
import { UpdatedRequest } from "../interfaces/common.interface";
import { ObjectIdWithErrorHandler } from "../helpers/helper";

const auth = () => {
  return async (
    req: UpdatedRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { db } = req.app.locals;
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) throw new ApiError(401, "Unauthorized Request");
      const data: any = verifyTokenWithJwt(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
      const user = await db
        .collection(COL.user)
        .findOne({ _id: ObjectIdWithErrorHandler(data?._id) }, {projection: {userName:1, email:1}});
      if (!user) throw new ApiError(401, "Invalid access token");
      req.user = user;
      next();
    } catch (e: any) {
      next(e);
    }
  };
};

export default auth;
