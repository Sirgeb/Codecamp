import { gql } from '@apollo/client';

export const SIGN_UP_WITH_CREDENTIALS = gql`
  mutation signUpWithCredentials($input: SignUpInput!) {
    signUpWithCredentials(input: $input) {
      id 
      token
    }
  }
`;
