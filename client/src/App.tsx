import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Channel } from '../../server/src/channel/ChannelAPI'; /** @todo move to a shared location */
import { GET_FULL_CHANNEL_LIST } from './api/queries';
import { CREATE_CHANNEL } from './api/mutations';

const types = ['custom', 'group'];
const initialState = { name: '', type: types[0] };

export default () => {
  const { loading, error, data, refetch } = useQuery<{ channels: Channel[] }>(GET_FULL_CHANNEL_LIST);
  const [createChannel, creationStatus] = useMutation<{ createChannel: { id: string } }>(CREATE_CHANNEL);

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

  useEffect(() => {
    if (!creationStatus.data?.createChannel?.id) return;
    setState(prevState => ({ ...prevState, ...initialState }))
    refetch({});
  }, [creationStatus, refetch]);

  return (
    <>
      <div>
        <h4>create a new channel</h4>
        <div>
          <label>name</label>
          <input placeholder="type a channel name" value={state.name} onChange={onNameChange} />
        </div>
        <div>
          <label>type</label>
          <select value={state.type} onChange={onTypeChange}>
            {types.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={onSave}>save</button>
          <button onClick={onCancel}>cancel</button>
        </div>
      </div>
      <br />
      <h4>list</h4>
      <div>
        {loading && <p>loading list...</p>}
        {error && <p>ups: {error?.message}</p>}
        {data && !data.channels.length && <p>no results.</p>}
        <div>
          {data?.channels.map(({ id, name, type }) => (
            <p key={id}>
              {type} - {name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
