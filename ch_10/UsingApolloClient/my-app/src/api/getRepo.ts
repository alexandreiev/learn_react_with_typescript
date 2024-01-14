import { gql } from '@apollo/client';
import { RepoData, SearchCriteria } from './types';

export const GET_REPO = gql`
  query GetRepo($org: String!, $repo: String!) {
    repository(owner: $org, name: $repo) {
      id
      name
      description
      viewerHasStarred
      stargazers {
        totalCount
      }
    }
  }
`;
