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