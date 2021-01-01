import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
  }

  type Query {
    user: Boolean!
  }
`;