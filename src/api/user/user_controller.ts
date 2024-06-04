import { Request, NextFunction, Response } from "express";
import * as dotenv from "dotenv";
import path from "path";
import service from "./user_service";
import { cookieOptions } from "../../constant/constant";
import ApiError from "../../utils/ApiError";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
export const getUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  try {
    const { loggedInUser, accessToken, refreshToken } = await service.findUser(
      db,
      req.body
    );
    res
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .send({ status: 200, data: loggedInUser, message: "User logged in successfully" });
  } catch (e) {
    next(e);
  }
};

export const addUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  try {
    const data = await service.createUser(db, req.body);
    res.send({ status: 200, data, message: "New user created successfully" });
  } catch (e) {
    next(e);
  }
};

export const refreshAccessToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    if(!incomingRefreshToken) throw new ApiError(401,"Unauthorized Request");
  
    const {accessToken, refreshToken} = await service.refreshAccessToken(db, incomingRefreshToken);
    res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .send({ status: 200, data: {}, message: "User logged in successfully" });
  } catch (e) {
    next(e);
  }
};

export const logoutUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  try {
  
    const data = await service.logoutUser(db, req.user);
    res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .send({ status: 200, data: data, message: "User logged out successfully" });
  } catch (e) {
    next(e);
  }
};

export const me = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { db } = req.app.locals;
  try {
    res.send({ status: 200, data: req.user, message: "User logged out successfully" });
  } catch (e) {
    next(e);
  }
};
