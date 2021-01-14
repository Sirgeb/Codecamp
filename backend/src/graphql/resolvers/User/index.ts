import { IResolvers } from 'apollo-server-express';
import { Request, Response } from 'express';
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { Database, User, UserCredentials } from '../../../lib/types';
import { 
  SignUpArgs, 
  SignInArgs, 
  UserArgs, 
  ForgotPasswordArg, 
  GoogleAuthInput, 
  GoogleAuthCode,
  ChangePasswordArgs
} from './types';
import { 
  cookieOptions, 
  authorize, 
  logInViaCookie,
  validateId,
  validateEmail
} from '../../../lib/utils';
import { Google } from '../../../lib/api';

export const userResolvers: IResolvers = {
  Query: {
    authUrl: (): GoogleAuthCode => {
      try {
        return {
          code: Google.authUrl
        }
      } catch (error) {
        throw new Error("Error: Unable to get Google Auth Url");
      }
    },
    user: async (_root: undefined, { id }: UserArgs, { db, req }: { db: Database, req: Request }): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: new ObjectId(id) });

        if (!user) {
          throw new Error("Error: User can't be found");
        }

        const authUser = await authorize(db, req);

        if (authUser && authUser._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (error){
        throw new Error("Error: Unable to process user");
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

      if (!email.trim() || !password.trim()) {
        throw new Error('Error: All field must be filled')
      }

      validateEmail(email);

      const user = await db.users.findOne({ email });

      if (!user) {
        throw new Error('Error: Unable to login')
      }
  
      const isMatch = await bcrypt.compare(password, user.password as any);
  
      if (!isMatch) {
        throw new Error('Error: Unable to login');
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
        throw new Error('Error: All field must be filled')
      }
      
      validateEmail(email);

      const user = await db.users.findOne({ email });

      if (user) {
        throw new Error("Email already in use by another user");
      }

      const hashedpassword = await bcrypt.hash(password, 8);

      const token = crypto.randomBytes(16).toString("hex");

      const insertResult = await db.users.insertOne({
        token,
        firstname,
        lastname,
        avatar: "",
        email,
        password: hashedpassword,
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
    forgotPassword: async (
      _root: undefined,
      { input }: ForgotPasswordArg,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<boolean> => {
      const { email } = input;

      validateEmail(email);

      const user = await db.users.findOne({ email });

      if (!user) {
        throw new Error("Error: Unable to recover password");
      }
 
      sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
      sgMail.send({
        to: email,
        from: 'admin@codecamp-sirgeb.herokuapp.com',
        subject: 'Password Reset Link',
        html: `
          <span>
            We're sorry to hear that you forgot your password. <br /> 
            Please follow this link to change your password
          </span>
          <a href='${process.env.NODE_ENV === 'development' ? 'http://localhost:3000':'https://codecamp-sirgeb.herokuapp.com'}/change-password/${user._id}'>
            Password Reset Link
          </a>
        `
      });

      return true
    }, 
    changePassword:  async (
      _root: undefined,
      { input }: ChangePasswordArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<UserCredentials> => {
      const token = crypto.randomBytes(16).toString("hex");
      const { newPassword, newPasswordRepeat, userId } = input;

      if (!newPassword.trim() || !newPasswordRepeat.trim()) {
        throw new Error('Error: All field must be filled')
      }

      const hashedpassword = await bcrypt.hash(newPassword, 8);

      const id = validateId(userId);
      const updateRes = await db.users.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            token,
            password: hashedpassword
          }
        },
        { returnOriginal: false }
      );
    
      const user = updateRes.value;

      if (!user) {
        throw new Error("Unable to Change Password");
      }

      res.cookie("data", user._id, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000
      });

      return {
        id: user._id.toString(),
        token
      }
    }
  },
  User: {
    id: (user: User): string | undefined => {
      return user._id.toString();
    }
  }
}
