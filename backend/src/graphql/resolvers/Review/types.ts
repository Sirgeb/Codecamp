import { Review } from '../../../lib/types';

export interface BootcampReviewArgs {
  input: { 
    bootcampId: string;
    text: string;
    rating: number;
  };
}

export interface BootcampReviewsArgs {
  id?: string;
  limit: number;
  page: number;
}

export interface BootcampReviewsData {
  total: number; 
  result: Review[];
}
