import { gql } from 'apollo-boost';

export const CREATE_CHANNEL = gql`
  mutation ($name: String!, $type: String!) {
    createChannel(channel: { name: $name, type: $type }) {
      id
    }
  }
`;
