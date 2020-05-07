import { ChannelAPI } from "./channel/ChannelAPI";

export interface DataSources {
  channelAPI: ChannelAPI;
}

export const dataSources = () => ({
  channelAPI: new ChannelAPI()
});
