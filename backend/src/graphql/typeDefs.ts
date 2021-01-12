import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    avatar: String!
    email: String!
    bootcamps(limit: Int!, page: Int!): Bootcamps!
    reviews(limit: Int!, page: Int!): Reviews!
    isAdmin: Boolean!
  }

  type UserCredentials {
    id: ID
    token: String!
  }

  type Bootcamp {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    address: String!
    fee: Int!
    rating: Float!
    students: Int!
    duration: String!
    courses: [String!]!
    reviews(limit: Int!, page: Int!): Reviews!
    userIsACandidate: Boolean!
  }

  type Review {
    id: ID!
    text: String!
    reviewer: User!
    rating: Float!
    bootcamp: Bootcamp!
  }

  type Bootcamps {
    total: Int! 
    result: [Bootcamp!]!
  }

  type Reviews {
    total: Int! 
    result: [Review!]!
  }

  input SignUpInput { 
    firstname: String!
    lastname: String!
    email: String!
    password: String! 
  }

  input SignInInput { 
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User! 
  }

  type Mutation {
    signUpWithCredentials(input: SignUpInput): UserCredentials!
    signInWithCredentials(input: SignInInput): UserCredentials!
    signInWithCookies: UserCredentials!
    signOut: Boolean!
  }
`;
