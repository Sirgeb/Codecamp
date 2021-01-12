import { Collection, ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId | string;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  password?: string | undefined;
  token: string;
  bootcamps: ObjectId[];
  reviews: ObjectId[];
  authorized?: boolean;
  isAdmin: boolean;
}

export interface UserCredentials {
  id: string | undefined;
  token: string;
}

export interface Database {
  users: Collection<User>;
}
