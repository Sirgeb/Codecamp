import { gql } from '@apollo/client';

export const SIGN_IN_WITH_CREDENTIALS = gql`
  mutation signInWithCredentials($input: SignInInput!) {
    signInWithCredentials(input: $input) {
      id 
      token
    }
  }
`;
