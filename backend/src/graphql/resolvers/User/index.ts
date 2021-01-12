import { IResolvers } from 'apollo-server-express';
import { Request, Response } from 'express';
import crypto from "crypto";
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { Database, User, UserCredentials } from '../../../lib/types';
import { SignUpArgs, SignInArgs, UserArgs } from './types';
import { cookieOptions, authorize, logInViaCookie } from '../../../lib/utils';

export const userResolvers: IResolvers = {
  Query: {
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
