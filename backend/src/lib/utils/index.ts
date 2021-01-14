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

export const validateEmail = (email: string): void => {
  if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    throw new Error("Error: Invalid e-mail address");
  }
}

export const validateId = (Id: string): string | ObjectId => {
  let userId;
  const isValid = ObjectId.isValid(Id);

  if (!isValid) {
    return userId = Id
  } else {
    return userId = new ObjectId(Id);
  }
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
  
  const userId = validateId(req.signedCookies.data);
  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    { $set: { token } },
    { returnOriginal: false }
  );

  const authUser = updateRes.value;

  if (!authUser) {
    res.clearCookie("data", cookieOptions);
  }

  return {
    id: authUser?._id.toString(),
    token
  };
};
