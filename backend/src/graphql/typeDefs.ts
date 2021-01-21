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

  type GoogleAuthCode {
    code: String!
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
  
  type Bootcamps {
    total: Int! 
    result: [Bootcamp!]!
  }

  type Review {
    id: ID!
    text: String!
    reviewer: User!
    rating: Float!
    bootcamp: Bootcamp!
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

  input GoogleAuthInput {
    code: String!
  }

  input ForgotPasswordInput { 
    email: String!
  }

  input ChangePasswordInput { 
    newPassword: String!
    newPasswordRepeat: String!
    userId: String!
  }

  input CreateBootcampArgs {
    title: String!
    description: String!
    image: String!
    address: String!
    fee: Int! 
    duration: String!
    courses: [String!]!
  }

  input UpdateBootcampArgs {
    title: String
    description: String
    image: String
    address: String
    fee: Int
    duration: String 
    courses: [String]
  }

  input BootcampReviewArgs {
    bootcampId: ID!
    rating: Float!
    text: String!
  }

  enum BootcampsFilter {
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
  }

  type Query {
    user(id: ID!): User!
    authUrl: GoogleAuthCode!
    bootcamp(id: ID!): Bootcamp!
    bootcamps(filter: BootcampsFilter!, limit: Int!, page: Int!): Bootcamps!
    reviews(id: ID, limit: Int!, page: Int!): Reviews!
  }

  type Mutation {
    signUpWithCredentials(input: SignUpInput!): UserCredentials!
    signInWithCredentials(input: SignInInput!): UserCredentials!
    signInWithGoogle(input: GoogleAuthInput!): UserCredentials!
    signInWithCookies: UserCredentials!
    signOut: Boolean!
    forgotPassword(input: ForgotPasswordInput!): Boolean!
    changePassword(input: ChangePasswordInput!): UserCredentials!
    createBootcamp(input: CreateBootcampArgs): Bootcamp!
    updateBootcamp(input: UpdateBootcampArgs, id: ID!): Bootcamp!
    deleteBootcamp(id: ID!): Boolean!
    createReview(input: BootcampReviewArgs): Review!
  }
`;
