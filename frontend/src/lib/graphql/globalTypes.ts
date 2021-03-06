/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface ChangePasswordInput {
  newPassword: string;
  newPasswordRepeat: string;
  userId: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface GoogleAuthInput {
  code: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
