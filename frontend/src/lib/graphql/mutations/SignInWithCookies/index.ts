import { gql } from '@apollo/client';

export const SIGN_IN_WITH_COOKIES = gql`
  mutation signInWithCookies {
    signInWithCookies {
      id 
      token
    }
  }
`;
