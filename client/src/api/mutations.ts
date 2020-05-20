import { gql } from 'apollo-boost';

export const CREATE_CHANNEL = gql`
  mutation($name: String!, $type: String!) {
    createChannel(channel: { name: $name, type: $type }) {
      id
    }
  }
`;

export const DELETE_CHANNEL = gql`
  mutation($id: ID!) {
    deleteChannel(id: $id)
  }
`;
