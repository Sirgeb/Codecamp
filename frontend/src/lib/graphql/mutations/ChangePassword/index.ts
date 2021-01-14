import { gql } from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id 
      token
    }
  }
`;
