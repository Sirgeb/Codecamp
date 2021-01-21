import merge from 'lodash.merge';
import { userResolvers } from './User';
import { bootcampResolvers } from './Bootcamp';
import { reviewResolvers } from './Review';

export const resolvers = merge(
  userResolvers,
  bootcampResolvers,
  reviewResolvers
);
