import React, { useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Channel } from '../../server/src/channel/ChannelAPI'; /** @todo move to a shared location */
import { GET_FULL_CHANNEL_LIST } from './api/queries';
import { CREATE_CHANNEL, DELETE_CHANNEL } from './api/mutations';
import { mainCointainer } from './styles';
import { ChannelForm } from './ChannelForm';
import { ChannelList } from './ChannelList';

export default () => {
  const { loading, error, data, refetch } = useQuery<{ channels: Channel[] }>(GET_FULL_CHANNEL_LIST);
  const [createChannel, creationStatus] = useMutation<{ createChannel: { id: string } }>(CREATE_CHANNEL);
  const [deleteChannel, deletionStatus] = useMutation<{ deleteChannel: boolean }>(DELETE_CHANNEL);

  const onSave = useCallback((name: string, type: string) => createChannel({ variables: { name, type } }), [createChannel]);
  const onDelete = useCallback((id: string) => deleteChannel({ variables: { id } }), [deleteChannel]);

  useEffect(() => {
    if (!creationStatus.data?.createChannel?.id && !deletionStatus.data?.deleteChannel) return;
    refetch({});
  }, [creationStatus, deletionStatus, refetch]);

  return (
    <div className={mainCointainer}>
      <ChannelForm isLoading={creationStatus.loading} onSave={onSave} />
      <ChannelList isLoading={loading} isDeleting={deletionStatus.loading} channelList={data?.channels as Channel[]} error={error} onDelete={onDelete} />
    </div>
  );
};
