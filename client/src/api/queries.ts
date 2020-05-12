import { gql } from 'apollo-boost';

export const GET_FULL_CHANNEL_LIST = gql`
  {
    channels {
      id
      name
      type
    }
  }
`;
