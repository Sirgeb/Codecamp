/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: signUpWithCredentials
// ====================================================

export interface signUpWithCredentials_signUpWithCredentials {
  __typename: "UserCredentials";
  id: string | null;
  token: string;
}

export interface signUpWithCredentials {
  signUpWithCredentials: signUpWithCredentials_signUpWithCredentials;
}

export interface signUpWithCredentialsVariables {
  input: SignUpInput;
}
