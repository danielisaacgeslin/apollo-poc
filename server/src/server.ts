import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { dataSources, initDataSources } from './datasources';

export const getServer = async () => {
  await initDataSources();
  return new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs,
    resolvers,
    dataSources,
    context: {}
  });
}

