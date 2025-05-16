import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      user {
        username
      }
      token
      message
      error
    }
  }
`;
