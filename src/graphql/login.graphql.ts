import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
       token
    user {
      username
      name
      surname
      email
      jobs {
        title
        description
        endDate
      }
    }
    message
    error
  }
  }
`;
