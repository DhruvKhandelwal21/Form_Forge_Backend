import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";
import { Db, ObjectId } from "mongodb";
import { COL } from "../constant/constant";
import { bcryptConfig } from "../constant/constant";

export const generateAccessToken = (user: any) => {
  const { _id, email, userName } = user;
  return jwt.sign(
    {
      _id: _id,
      userName: userName,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const generateRefreshToken = (_id: ObjectId) => {
  return jwt.sign(
    {
      _id: _id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const isPasswordCorrect = async (
  inputPassword: string,
  password: string
) => {
  return await bcrypt.compare(inputPassword, password);
};

export const creatingHash = async (
  password: string | undefined
): Promise<string> => {
  // @ts-ignore
  return bcrypt.hash(password, parseFloat(bcryptConfig.saltCount));
};

export const verifyTokenWithJwt = (token: string, key: string) => {
  try{
   let data = jwt.verify(token, key);
   return data;
  }catch(e){
     throw new ApiError(401, "Access Token Expired");
  }
};

export const generateAccessAndRefereshTokens = async (
  db: Db,
  userId: ObjectId
) => {
  try {
    const user: any = await db.collection(COL.user).findOne({ _id: userId });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user?._id);

    await db.collection(COL.user).findOneAndUpdate(
      {
        _id: userId,
      },

      {
        $set: {
          refreshToken: refreshToken,
        },
      }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

export const ObjectIdWithErrorHandler = (id: string | ObjectId | undefined) => {
  try {
    return new ObjectId(id);
  } catch (e) {
    throw new ApiError(400, "Invalid resource id");
  }
};
