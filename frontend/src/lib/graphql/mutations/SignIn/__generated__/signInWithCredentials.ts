/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: signInWithCredentials
// ====================================================

export interface signInWithCredentials_signInWithCredentials {
  __typename: "UserCredentials";
  id: string | null;
  token: string;
}

export interface signInWithCredentials {
  signInWithCredentials: signInWithCredentials_signInWithCredentials;
}

export interface signInWithCredentialsVariables {
  input: SignInInput;
}
