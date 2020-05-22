import React, { memo } from 'react';
import { ApolloError } from 'apollo-boost';

import { Channel } from '../../../server/src/channel/ChannelAPI'; /** @todo move to a shared location */
import { DangerButton } from '../shared/DangerButton';
import { item } from './styles';

export interface Props {
  isLoading: boolean;
  isDeleting: boolean;
  error: ApolloError | undefined;
  channelList: Channel[];
  onDelete: (id: string) => void;
}

const ChannelList = ({ channelList = [], onDelete, isLoading, isDeleting, error }: Props) => {
  const onDeleteChannel = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"`)) onDelete(id);
  };

  return (
    <div>
      <h4>Channel list</h4>
      <div>
        {isLoading && <p>loading list...</p>}
        {error && <p>ups: {error?.message}</p>}
        {!channelList.length && !isLoading && <p>no results.</p>}
        <div>
          {channelList.map(({ id, name, type }) => (
            <p key={id} className={item}>
              <DangerButton data-testid="channel-delete" disabled={isDeleting} onClick={() => onDeleteChannel(id, name)}>
                x
              </DangerButton>{' '}
              {name} <small>({type})</small>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ChannelList);
