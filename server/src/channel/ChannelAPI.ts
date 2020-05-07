import { DataSource } from 'apollo-datasource';

const getMockChannel = (id: string) => ({ id, name: 'hello', type: 'group' });

export class ChannelAPI extends DataSource {
  getChannelList = async () => {
    return [getMockChannel('1'), getMockChannel('2'), getMockChannel('3')];
  }

  getChannelById = async (id: string) => {
    return getMockChannel(id);
  }
}
