import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-boost';

import { typeDefs } from '../src/typeDefs';
import { resolvers } from '../src/resolvers';
import { CREATE_CHANNEL, DELETE_CHANNEL } from '../../client/src/api/mutations'; /** @todo move to a centralized file */
import { GET_FULL_CHANNEL_LIST } from '../../client/src/api/queries'; /** @todo move to a centralized file */

export const GET_CHANNEL_BY_ID = gql`
  query($id: ID!) {
    channel(id: $id) {
      id
      name
      type
    }
  }
`;

export const UPDATE_CHANNEL = gql`
  mutation($id: ID!, $name: String!, $type: String!) {
    updateChannel(id: $id, channel: { name: $name, type: $type })
  }
`;

const getMockChannel = () => ({ id: '1', name: 'channel', type: 'dm' });

const dataSources = () => ({
  channelAPI: {
    getChannelList: async () => [getMockChannel()],
    getChannelById: async () => getMockChannel(),
    createOne: async () => ({ id: getMockChannel().id }),
    updateOne: async () => true,
    deleteOne: async () => true
  } as any
});

describe('Integration', () => {
  let server = new ApolloServer({
    introspection: true,
    typeDefs: typeDefs,
    resolvers: resolvers,
    dataSources,
    context: {}
  });
  let { query, mutate } = createTestClient(server);

  beforeEach(() => {
    server = new ApolloServer({
      introspection: true,
      typeDefs: typeDefs,
      resolvers: resolvers,
      dataSources,
      context: {}
    });
    const client = createTestClient(server);
    query = client.query;
    mutate = client.mutate;
  });

  it('should get channel list', async () => {
    const res = await query({ query: GET_FULL_CHANNEL_LIST });
    expect(res.data.channels).toBeInstanceOf(Array);
    expect(res.data.channels[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String)
    });
  });

  it('should get a single channel', async () => {
    const res = await query({ query: GET_CHANNEL_BY_ID, variables: { id: getMockChannel().id } });
    expect(res.data.channel).toEqual(getMockChannel());
  });

  it('should create a channel', async () => {
    const { name, type } = getMockChannel();
    const res = await mutate({ mutation: CREATE_CHANNEL, variables: { name, type } });
    expect(res.data).toEqual({ createChannel: { id: expect.any(String) } });
  });

  it('should update a channel', async () => {
    const res = await mutate({ mutation: UPDATE_CHANNEL, variables: getMockChannel() });
    expect(res.data).toEqual({ updateChannel: true });
  });

  it('should delete a channel', async () => {
    const res = await mutate({ mutation: DELETE_CHANNEL, variables: { id: getMockChannel().id } });
    expect(res.data).toEqual({ deleteChannel: true });
  });
});
