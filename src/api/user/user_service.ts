import { Db, ObjectId } from "mongodb";
import { COL } from "../../constant/constant";
import ApiError from "../../utils/ApiError";
import { ObjectIdWithErrorHandler, creatingHash, generateAccessAndRefereshTokens, isPasswordCorrect, verifyTokenWithJwt } from "../../helpers/helper";

const findUser = async (db: Db, payload: {email: string, userName: string, password: string}) => {
    //check the user with the help of payload data
    //if not found return error
    //if found but password not matching return errror wrong credentials
    //generate access and refresh tokens
    //get the new updated user

    const {email, userName, password} = payload;
    if(!email && !password) throw new ApiError(400, "Please Enter credentials");
    const user = await db.collection(COL.user).findOne({$or: [{email},{userName}]});
    if(!user) throw new ApiError(404, "User with these credentials doesn't exists");

    const isPasswordMatched = await isPasswordCorrect(password, user?.password);
    if(!isPasswordMatched) throw new ApiError(400, "Please enter correct password");

    const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(db, user?._id);

    const loggedInUser = await db.collection(COL.user).findOne({_id: user?._id}, {projection: {password:0, refreshToken:0}});
    
    return {loggedInUser, refreshToken, accessToken};
  };

const createUser = async (db: Db, payload: {email?: string, userName?: string, password: string}) => {
  const { userName, email, password } = payload;

  if (!userName && !email) throw new ApiError(400, "Please send credentials");

  const user = await db.collection(COL.user).findOne({ $or: [{ userName }, { email }] });

  if (user) throw new ApiError(409, "User already exists");
  const hashedPassword = await creatingHash(password);
  const data = await db.collection(COL.user).insertOne({
    ...payload,
    password: hashedPassword,
    createdAt: new Date(),
  });
  if(!data) throw new ApiError(501, "Failed to create new user");
  return data;
};

const refreshAccessToken = async (db: Db, incomingRefreshToken: string) => {
    const decodedToken:any = verifyTokenWithJwt(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    const user = await db.collection(COL.user).findOne({_id: ObjectIdWithErrorHandler(decodedToken?._id)})
    if(!user) throw new ApiError(407,"Invalid refresh token");
    if(incomingRefreshToken!==user?.refreshToken) throw new ApiError(401,"Refresh token is expired");
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(db, user?._id);
    return {accessToken, refreshToken} ;
  };

const logoutUser = async (db: Db, user: any) => {
  await db.collection(COL.user).updateOne(
    {
      _id: user?._id,
    },
    {
      $unset: { refreshToken: "" },
    }
  );
  return {};
};
  
export default {
    findUser,
    createUser,
    refreshAccessToken,
    logoutUser
}
