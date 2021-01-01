import { IResolvers } from 'apollo-server-express';

export const userResolvers: IResolvers = {
  Query: {
    user: (): Boolean => {
      return true
    }
  }
}
