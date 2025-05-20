import { gql } from '@apollo/client';

export const ADDJOB = gql`
  mutation CreateJob($job: JobInput!) {
    createJob(job: $job) {
      message
      error
    }
  }
`;
