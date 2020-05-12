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
  mapToDb = (ch: Channel) => ({ _id: ch?.id, name: ch?.name, type: ch?.type });
  mapFromDb = (ch: DBChannel) => ({ id: ch?._id, name: ch?.name, type: ch?.type });

  getChannelList = async () => {
    return (await this.collection.find().toArray()).map(this.mapFromDb);
  };

  getChannelById = async (id: ObjectId): Promise<Channel> => {
    const channel = await this.findOneById(new ObjectId(id));
    return this.mapFromDb(channel);
  };

  createOne = async (channel: Channel): Promise<Channel> => {
    const { ops } = await this.collection.insertOne(this.mapToDb(channel));
    return this.mapFromDb(ops[0]);
  };

  updateOne = async (id: ObjectId, channel: Channel): Promise<boolean> => {
    const preparedChannel = Object.fromEntries(Object.entries(this.mapToDb(channel)).filter(([key]) => key !== '_id'));
    const { modifiedCount } = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: preparedChannel });
    return !!modifiedCount;
  };

  deleteOne = async (id: ObjectId): Promise<boolean> => {
    const { result } = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return !!result.n;
  };
}
