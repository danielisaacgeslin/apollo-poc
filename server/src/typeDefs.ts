import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    channels: [Channel]
    channel(id: ID): Channel
  }

  type Channel {
    id: ID
    name: String
    type: String
  }
`;
