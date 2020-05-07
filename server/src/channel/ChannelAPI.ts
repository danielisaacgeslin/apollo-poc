import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';

export interface Channel {
  id: string;
  name: string;
  type: string;
}

export interface DBChannel extends Pick<Channel, 'name' | 'type'> {
  _id: string;
}

export class ChannelAPI extends MongoDataSource<any, any> {
  mapToDb = (ch: Channel) => ({ _id: ch.id, name: ch.name, type: ch.type });
  mapFromDb = (ch: DBChannel) => ({ id: ch._id, name: ch.name, type: ch.type });

  getChannelList = async () => {
    return (await this.collection.find().toArray()).map(this.mapFromDb);
  };

  getChannelById = (id: ObjectId) => {
    return this.findOneById(new ObjectId(id));
  };
}
