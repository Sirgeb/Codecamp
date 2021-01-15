export interface User {
  id: string | null;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  isAdmin: boolean
}

export interface Bootcamp {
  _id: string;
  title: string;
  description: string;
  image: string;
  host: string;
  address: string;
  fee: number;
  rating: number;
  students: number;
  duration: string;
  courses: string[];
  reviews: Review[];
}

export interface Review {
  _id: string;
  text: string;
  reviewer: string;
}  
