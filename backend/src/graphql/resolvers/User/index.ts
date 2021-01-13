import { IResolvers } from 'apollo-server-express';
import { Request, Response } from 'express';
import crypto from "crypto";
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { Database, User, UserCredentials } from '../../../lib/types';
import { SignUpArgs, SignInArgs, UserArgs, GoogleAuthInput, GoogleAuthCode } from './types';
import { cookieOptions, authorize, logInViaCookie } from '../../../lib/utils';
import { Google } from '../../../lib/api';

export const userResolvers: IResolvers = {
  Query: {
    authUrl: (): GoogleAuthCode => {
      try {
        return {
          code: Google.authUrl
        }
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
      }
    },
    user: async (_root: undefined, { id }: UserArgs, { db, req }: { db: Database, req: Request }): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: new ObjectId(id) });

        if (!user) {
          throw new Error("user can't be found");
        }

        const authUser = await authorize(db, req);

        if (authUser && authUser._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (error){
        throw new Error(`Failed to query user: ${error}`);
      }
    }
  },
  Mutation: {
    signInWithCredentials: async (
      _root: undefined,
      { input }: SignInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<UserCredentials | undefined> => {
      const token = crypto.randomBytes(16).toString("hex");

      const { email, password } = input;

      const user = await db.users.findOne({ email });

      if (!user) {
        throw new Error('Unable to login')
      }
  
      const isMatch = await bcrypt.compare(password, user.password as any);
  
      if (!isMatch) {
        throw new Error('Unable to login');
      }

      res.cookie("data", user._id, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000
      });

      return {
        id: user._id.toString(),
        token
      };
    },
    signUpWithCredentials: async (
      _root: undefined,
      { input }: SignUpArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<UserCredentials> => {
      const { firstname, lastname, email, password } = input;

      if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()) {
        throw new Error('All field must be filled')
      }
      
      if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        throw new Error("Invalid Email")
      }

      const user = await db.users.findOne({ email });

      if (user) {
        throw new Error("Email already in use by another user");
      }

      const hashpassword = await bcrypt.hash(password, 8);

      const token = crypto.randomBytes(16).toString("hex");

      const insertResult = await db.users.insertOne({
        token,
        firstname,
        lastname,
        avatar: "",
        email,
        password: hashpassword,
        bootcamps: [],
        reviews: [],
        isAdmin: false
      });
    
      const authUser = insertResult.ops[0];
    
      res.cookie("data", authUser._id, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000
      });
    
      return {
        id: authUser._id.toString(),
        token
      };
    },
    signInWithCookies: async (
      _root: undefined, {}, { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<UserCredentials | undefined> => { 
      const token = crypto.randomBytes(16).toString("hex");
      return logInViaCookie(token, db, req, res);
    },
    signInWithGoogle: async (
      _root: undefined, { input: { code } } : GoogleAuthInput, { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<UserCredentials | undefined> => { 
      const { user } = await Google.logIn(code);
      const token = crypto.randomBytes(16).toString("hex");
      
      if (!user) {
        throw new Error("Google login error");
      }
    
      // Name/Photo/Email Lists
      const userNamesList = user.names && user.names.length ? user.names : null;
      const userPhotosList = user.photos && user.photos.length ? user.photos : null;
      const userEmailsList =
        user.emailAddresses && user.emailAddresses.length
          ? user.emailAddresses
          : null;
    
      // User Display Name
      const userName = userNamesList ? userNamesList[0].displayName : null;
    
      // User Id
      const userId =
        userNamesList &&
        userNamesList[0].metadata &&
        userNamesList[0].metadata.source
          ? userNamesList[0].metadata.source.id
          : null;
    
      // User Avatar
      const userAvatar =
        userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
    
      // User Email
      const userEmail =
        userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;
    
      if (!userId || !userName || !userAvatar || !userEmail) {
        throw new Error("Google login error");
      }
    
      const updateRes = await db.users.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            token
          }
        },
        { returnOriginal: false }
      );
    
      let authUser = updateRes.value;
      
      if (!authUser) {
        const name = userName.split(" "); 
        const insertResult = await db.users.insertOne({
          _id: userId,
          firstname: name[0],
          lastname: name[1],
          avatar: userAvatar,
          email: userEmail,
          bootcamps: [],
          reviews: [],
          isAdmin: false,
          token
        });
    
        authUser = insertResult.ops[0];
      }
    
      res.cookie("data", userId, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000
      });
    
      return {
        id: authUser._id.toString(),
        token
      };
    },
    signOut: (
      _root: undefined,
      _args: {},
      { res }: { res: Response }
    ): boolean => {
      try {
        res.clearCookie("data", cookieOptions);
        return true
      } catch (error) {
        throw new Error(`Failed to sign out: ${error}`);
      }
    },
  },
   User: {
    id: (user: User): string | undefined => {
      return user._id.toString();
    }
  },
}
