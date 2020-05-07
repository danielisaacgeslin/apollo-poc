import { IResolvers } from 'apollo-server';

import { DataSources } from './datasources';

interface Deps {
  dataSources: DataSources
}

export const resolvers: IResolvers = {
  Query: {
    channels: (_, _2, { dataSources }: Deps) => dataSources.channelAPI.getChannelList(),
    channel: (_, args: { id: string }, { dataSources }: Deps) => dataSources.channelAPI.getChannelById(args.id)
  }
};
