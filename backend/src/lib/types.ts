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

export interface Bootcamp {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string | ObjectId;
  address: string;
  geometry: {
    lat: number, 
    lng: number 
  },
  fee: number;
  rating: number;
  students: number;
  duration: string;
  courses: string[];
}

export interface Review {
  _id: ObjectId;
  text: string;
  rating: number;
  reviewer: ObjectId;
  bootcamp: ObjectId;
}  

export interface Database {
  bootcamps: Collection<Bootcamp>;
  users: Collection<User>;
  reviews: Collection<Review>;
}
