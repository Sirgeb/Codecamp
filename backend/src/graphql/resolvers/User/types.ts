export interface UserArgs {
  id: string;
}

export interface SignUpArgs {
  input: { 
    firstname: string;
    lastname: string;
    email: string;
    password: string; 
  };
}

export interface SignInArgs {
  input: { 
    email: string;
    password: string; 
  };
}

export interface ChangePasswordArgs {
  input: { 
    newPassword: string; 
    newPasswordRepeat: string;
    userId: string;
  };
}

export interface GoogleAuthInput {
  input: {
    code: string;
  }
}

export interface GoogleAuthCode {
  code: string;
}

export interface ForgotPasswordArg {
  input: { email: string };
}
