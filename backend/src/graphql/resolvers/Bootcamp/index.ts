import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';
import { Bootcamp, Database, User } from '../../../lib/types';
import { validateId } from '../../../lib/utils';
import { ObjectId } from 'mongodb';
import { BootcampArg, BootcampsArgs, BootcampsData, BootcampsFilter, BootcampReviewsArgs, BootcampReviewsData, CreateBootcampArgs, UpdateBootcampArgs } from './types';

export const bootcampResolvers: IResolvers = {
  Query: {
    bootcamp: async (_root: undefined, { id }: BootcampArg, { db, req }: { db: Database; req: Request }): Promise<Bootcamp> => {
      try { 
        const bootcamp = await db.bootcamps.findOne({ _id: new ObjectId(id) });
        
        if (!bootcamp) {
          throw new Error("bootcamp can't be found");
        }

        return bootcamp;
      } catch (error) {
        throw new Error(`Failed to query bootcamp: ${error}`);
      }
    },
    bootcamps: async (_root: undefined, { filter, limit, page }: BootcampsArgs, { db }: { db: Database }): Promise<BootcampsData> => {
      try {
        const data: BootcampsData = {
          total: 0,
          result: []
        }

        let cursor = await db.bootcamps.find({});
 
        if (filter && filter === BootcampsFilter.PRICE_LOW_TO_HIGH) {
          cursor = cursor.sort({ price: 1 });
        }

        if (filter && filter === BootcampsFilter.PRICE_HIGH_TO_LOW) {
          cursor = cursor.sort({ price: -1 });
        }

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);
        // page = 1; limit = 10; cursor starts at 0
        // page = 2; limit = 10; cursor starts at 10

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
      }
    }
  },
  Bootcamp: {
    id: (bootcamp: Bootcamp): string => {
      return bootcamp._id.toString();
    },
    host: async (bootcamp: Bootcamp, _args: {}, { db }: { db: Database }): Promise<User> => {
      const id = validateId(bootcamp.host as string);
      const host = await db.users.findOne({ _id: id });
      if (!host) {
        throw new Error("host can't be found")
      }
      return host;
    },
    reviews: async (bootcamp: Bootcamp, { page, limit }: BootcampReviewsArgs , { db }: { db: Database }): Promise<BootcampReviewsData> => {
      const data: BootcampReviewsData = {
        total: 0,
        result: []
      }

      let cursor = await db.reviews.find({ bootcamp: bootcamp._id });

      cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
      cursor = cursor.limit(limit);

      data.total = await cursor.count();
      data.result = await cursor.toArray();

      return data;
    },
    userIsACandidate: async (bootcamp: Bootcamp, _args: {}, { db, req }: { db: Database, req: Request }): Promise<boolean> => {
      const userId = req.signedCookies.data;
      const id = validateId(userId);
      const user = await db.users.findOne({ _id: id, bootcamps: bootcamp._id });
      if (!user) return false;
      return true
    }
  },
  Mutation: {
    createBootcamp: async (_root: undefined, { input }: CreateBootcampArgs, { db, req }: { db: Database, req: Request }): Promise<Bootcamp> => {
      const { title, description, image, address, geometry, fee, duration, courses } = input
      const userId = req.signedCookies.data;

      const id = validateId(userId);

      const isAdmin = await db.users.findOne({ _id: id, isAdmin: true });

      if (!isAdmin) {
        throw new Error("You ain't an admin")
      }

      const bootcampExist = await db.bootcamps.findOne({ title, fee });

      if (bootcampExist) { 
        throw new Error("Sorry, this bootcamp is already in our collection");
      }

      const bootcamp = await db.bootcamps.insertOne({
        title, 
        description, 
        image,
        host: id,
        address, 
        fee, 
        geometry,
        rating: 0,
        students: 0,
        duration,
        courses
      });

      return bootcamp.ops[0]
    },
    updateBootcamp: async (_root: undefined, { input, id: bootcampId }: UpdateBootcampArgs & BootcampArg, { db, req }: { db: Database, req: Request }): Promise<Bootcamp | undefined> => {
      const userId = req.signedCookies.data;
      const id = validateId(userId);
      
      const isAdmin = await db.users.findOne({ _id: id, isAdmin: true });

      if (!isAdmin) {
        throw new Error("You ain't an admin")
      }

      const bootcamp = await db.bootcamps.findOne({ _id: new ObjectId(bootcampId) });

      if (!bootcamp) { 
        throw new Error("Sorry, this bootcamp is not in our collection any longer");
      }

      const updatedBootcamp = await db.bootcamps.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...input } }, { returnOriginal: false });
      return updatedBootcamp.value
    },
    deleteBootcamp: async (_root: undefined, { id: bootcampId }: BootcampArg, { db, req }: { db: Database, req: Request }): Promise<boolean> => {
      const userId = req.signedCookies.data;
      const id = validateId(userId);
          
      const isAdmin = await db.users.findOne({ _id: id, isAdmin: true });

      if (!isAdmin) {
        throw new Error("You ain't an admin")
      }

      const bootcamp = await db.bootcamps.findOne({ _id: new ObjectId(bootcampId) });

      if (!bootcamp) { 
        throw new Error("Sorry, this bootcamp is not in our collection any longer");
      }

      await db.bootcamps.deleteOne({ _id: new ObjectId(id) });
      return true;
    }
  }
}
