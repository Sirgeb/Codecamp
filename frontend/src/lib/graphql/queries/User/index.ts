import { gql } from '@apollo/client';

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id 
      firstname 
      lastname
      avatar
      email
      isAdmin
    }
  }
`;
