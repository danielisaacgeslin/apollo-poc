import { MongoClient } from 'mongodb';

import { ChannelAPI } from './channel/ChannelAPI';

export interface DataSources {
  channelAPI: ChannelAPI;
}
const uri = 'mongodb+srv://dbUser:aFakePassword0@cluster0-thluu.mongodb.net/test?retryWrites=true&w=majority'; // i don't really care about securing this POC db
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect();

export const dataSources = () => ({
  channelAPI: new ChannelAPI(client.db('apollo-poc').collection('channels'))
});
