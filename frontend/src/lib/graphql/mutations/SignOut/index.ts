import { gql } from '@apollo/client';

export const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`;
