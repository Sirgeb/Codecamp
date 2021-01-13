import { gql } from '@apollo/client';

export const SIGN_IN_WITH_GOOGLE = gql`
  mutation signInWithGoogle($input: GoogleAuthInput!) {
    signInWithGoogle(input: $input) {
      id 
      token
    }
  }
`;
