/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: user
// ====================================================

export interface user_user {
  __typename: "User";
  id: string;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  isAdmin: boolean;
}

export interface user {
  user: user_user;
}

export interface userVariables {
  id: string;
}
