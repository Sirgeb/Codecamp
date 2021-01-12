import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import { Database, User, UserCredentials } from '../types';

export const authorize = async (db: Database, req: Request): Promise<User | null> => {
  const token = req.get("X-CSRF-TOKEN");
  const user = await db.users.findOne({ 
    _id: req.signedCookies.data, 
    token
  });

  return user;
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true
};

export const logInViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<UserCredentials | undefined> => {
  const updateRes = await db.users.findOneAndUpdate(
    { _id: new ObjectId(req.signedCookies.data) },
    { $set: { token } },
    { returnOriginal: false }
  );

  let authUser = updateRes.value;

  if (!authUser) {
    res.clearCookie("data", cookieOptions);
  }

  return {
    id: authUser?._id.toString(),
    token
  };
};
