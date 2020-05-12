import { IResolvers } from 'apollo-server';

import { DataSources } from './datasources';
import { Channel } from './channel/ChannelAPI';

interface Deps {
  dataSources: DataSources
}

export const resolvers: IResolvers = {
  Query: {
    channels: (_, _2, { dataSources }: Deps) => dataSources.channelAPI.getChannelList(),
    channel: (_, args, { dataSources }: Deps) => dataSources.channelAPI.getChannelById(args.id),
  },
  Mutation: {
    createChannel: (_, { channel }, { dataSources }: Deps) => dataSources.channelAPI.createOne(channel as Channel),
    updateChannel: (_, { id, channel }, { dataSources }: Deps) => dataSources.channelAPI.updateOne(id, channel as Channel),
    deleteChannel: (_, { id }, { dataSources }: Deps) => dataSources.channelAPI.deleteOne(id)
  }
};
