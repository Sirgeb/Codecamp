import { gql } from '@apollo/client';

export const GET_GOOGLE_AUTH_URL = gql`
  query authUrl {
    authUrl {
      code
    }
  }
`;
