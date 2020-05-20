import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Channel } from '../../server/src/channel/ChannelAPI'; /** @todo move to a shared location */
import { GET_FULL_CHANNEL_LIST } from './api/queries';
import { CREATE_CHANNEL, DELETE_CHANNEL } from './api/mutations';
import { mainCointainer, button, successButton, dangerButton } from './styles';

const types = ['custom', 'group'];
const initialState = { name: '', type: types[0] };

export default () => {
  const { loading, error, data, refetch } = useQuery<{ channels: Channel[] }>(GET_FULL_CHANNEL_LIST);
  const [createChannel, creationStatus] = useMutation<{ createChannel: { id: string } }>(CREATE_CHANNEL);
  const [deleteChannel, deletionStatus] = useMutation<{ deleteChannel: boolean }>(DELETE_CHANNEL);
  const [state, setState] = useState<{ name: string; type: string }>(initialState);

  const onNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value: name } = event.target;
    setState(prevState => ({ ...prevState, name }));
  }, []);
  const onTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const { value: type } = event.target;
    setState(prevState => ({ ...prevState, type }));
  }, []);
  const onCancel = useCallback(() => setState(prevState => ({ ...prevState, ...initialState })), []);
  const onSave = useCallback(() => createChannel({ variables: { name: state.name, type: state.type } }), [createChannel, state]);
  const onDelete = (id: string) => deleteChannel({ variables: { id } });

  const isLoading = loading || creationStatus.loading || deletionStatus.loading;

  useEffect(() => {
    if (!creationStatus.data?.createChannel?.id && !deletionStatus.data?.deleteChannel) return;
    setState(prevState => ({ ...prevState, ...initialState }));
    refetch({});
  }, [creationStatus, deletionStatus, refetch]);

  return (
    <div className={mainCointainer}>
      <div>
        <h4>create a new channel</h4>
        <div>
          <input placeholder="type a channel name" value={state.name} onChange={onNameChange} />
          <select value={state.type} onChange={onTypeChange}>
            {types.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 15 }}>
          <button disabled={isLoading || !state.name} className={`${button} ${successButton}`} style={{ marginRight: 5 }} onClick={onSave}>
            save
          </button>
          <button disabled={isLoading} className={button} onClick={onCancel}>
            cancel
          </button>
        </div>
      </div>
      <br />
      <h4>Channel list</h4>
      <div>
        {loading && <p>loading list...</p>}
        {error && <p>ups: {error?.message}</p>}
        {data && !data.channels.length && <p>no results.</p>}
        <div>
          {data?.channels.map(({ id, name, type }) => (
            <p key={id} style={{ marginTop: 5 }}>
              <button disabled={isLoading} className={`${button} ${dangerButton}`} onClick={() => onDelete(id)}>
                x
              </button>{' '}
              {name} <small>({type})</small>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
