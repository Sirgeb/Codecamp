/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GoogleAuthInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: signInWithGoogle
// ====================================================

export interface signInWithGoogle_signInWithGoogle {
  __typename: "UserCredentials";
  id: string | null;
  token: string;
}

export interface signInWithGoogle {
  signInWithGoogle: signInWithGoogle_signInWithGoogle;
}

export interface signInWithGoogleVariables {
  input: GoogleAuthInput;
}
