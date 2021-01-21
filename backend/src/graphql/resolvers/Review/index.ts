import { IResolvers } from 'apollo-server-express';
import { Request } from "express";
import { ObjectId } from 'mongodb';
import { Review, Database, User, Bootcamp } from '../../../lib/types';
import { BootcampReviewArgs, BootcampReviewsArgs, BootcampReviewsData } from './types';

export const reviewResolvers: IResolvers = {
  Query: {
    reviews: async (_root: undefined, { page, limit }: BootcampReviewsArgs, { db }: { db: Database }): Promise<BootcampReviewsData> => {
      try {
        const data: BootcampReviewsData = {
          total: 0,
          result: []
        }
        
        let cursor = await db.reviews.find({});
        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);
        // // page = 1; limit = 10; cursor starts at 0
        // // page = 2; limit = 10; cursor starts at 10

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query reviews: ${error}`);
      }
    }
  },
  Review: {
    id: (review: Review): string => {
      return review._id.toString();
    },
    reviewer: async (review: Review, _args: {}, { db }: { db: Database }): Promise<User> => {
      const reviewer = await db.users.findOne({ _id: review.reviewer });
      if (!reviewer) {
        throw new Error("Reviewer can't be found")
      }
      return reviewer;
    },
    bootcamp: async (review: Review, _args: {}, { db }: { db: Database }): Promise<Bootcamp> => {
      const bootcamp = await db.bootcamps.findOne({ _id: review.bootcamp });
      if (!bootcamp) {
        throw new Error("Bootcamp can't be found")
      }
      return bootcamp;
    }
  },
  Mutation: {
    createReview: async(_root: undefined, { input }: BootcampReviewArgs, { db, req }: { db: Database, req: Request }): Promise<Review> => { 
      const { bootcampId, text, rating } = input;
      const userId = req.signedCookies.data;

      const user = await db.users.findOne({ _id: new ObjectId(userId), bootcamps: new ObjectId(bootcampId) });

      if (!user) {
        throw new Error("Sorry, You can't write review when you've not joined bootcamp")
      }

      const hasReviewed = await db.reviews.findOne({ bootcamp: new ObjectId(bootcampId), reviewer: new ObjectId(userId) });

      if (hasReviewed) {
        throw new Error("Oops, You've made a review already")
      } 

      const rev = await db.reviews.insertOne({
        text,
        rating,
        bootcamp: new ObjectId(bootcampId),
        reviewer: new ObjectId(userId)
      });

      const bootcampReviews = await db.reviews.find({ bootcamp: new ObjectId(bootcampId) }).toArray();
      const lenghtOfReviews = bootcampReviews.length;
      const totalRatings = bootcampReviews.reduce((acc, review) => review.rating + acc, 0);
      let averageRating = totalRatings / lenghtOfReviews;
      averageRating = Number(averageRating.toFixed(1));
      await db.bootcamps.findOneAndUpdate({ _id: new ObjectId(bootcampId) }, { $set: { rating: averageRating } });

      return rev.ops[0];
    }
  }
}
