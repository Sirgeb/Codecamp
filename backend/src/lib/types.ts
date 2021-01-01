import { Collection, ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId | string;
  firstname: string;
  lastname: string;
}

export interface Database {
  users: Collection<User>;
}
