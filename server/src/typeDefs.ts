import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    channels: [Channel]
    channel(id: ID!): Channel
  }

  type Mutation {
    createChannel(channel: ChannelInput!): Channel
    updateChannel(id: ID!, channel: ChannelInput!): Boolean
    deleteChannel(id: ID!): Boolean
  }

  type Channel {
    id: ID
    name: String
    type: String
  }

  input ChannelInput {
    name: String!
    type: String!
  }
`;
