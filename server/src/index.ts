import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { dataSources } from './datasources';

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  dataSources,
  context: {}
});

(async () => {
  const { url } = await server.listen(4000);
  console.log(`Server running at ${url}`);
})();
