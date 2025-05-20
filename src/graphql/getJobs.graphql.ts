import { gql } from '@apollo/client';

export const GET_USER_JOBS = gql`
  query GetUserJobs($username: String!) {
    user(username: $username) {
      username
      jobs {
        title
        description
        endDate
      }
    }
  }
`;
