import { Bootcamp, Review } from '../../../lib/types';

export enum BootcampsFilter {
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW"
}

export interface CreateBootcampArgs {
  input: {
    title: string;
    description: string;
    image: string;
    address: string;
    geometry: {
      lat: number, 
      lng: number 
    },
    fee: number; 
    duration: string; 
    courses: string[];
  }
}

export interface UpdateBootcampArgs {
  input: {
    id: string;
    title?: string;
    description?: string;
    image?: string;
    address?: string;
    fee?: number; 
    duration?: string; 
    courses: string[];
  }
}

export interface BootcampArg {
  id: string;
}

export interface BootcampsArgs {
  limit: number;
  page: number;
}

export interface BootcampData {
  total: number; 
  result: Bootcamp[];
}

export interface BootcampsArgs {
  filter: BootcampsFilter;
  limit: number;
  page: number;
}

export interface BootcampsData {
  total: number;
  result: Bootcamp[];
}

export interface BootcampReviewsArgs {
  limit: number;
  page: number;
}

export interface BootcampReviewsData {
  total: number; 
  result: Review[];
}
