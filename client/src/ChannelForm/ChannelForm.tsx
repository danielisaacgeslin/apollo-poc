import React, { memo, useState, useCallback, ChangeEvent, useEffect } from 'react';

import { SuccessButton } from '../shared/SuccessButton';
import { Button } from '../shared/Button';
import { Select } from '../shared/Select';
import { Input } from '../shared/Input';
import { buttonContainer, container, controlContainer, input } from './styles';

const types = ['dm', 'group'];
const initialState = { name: '', type: types[0] };

export interface Props {
  isLoading: boolean;
  onSave: (name: string, type: string) => void;
}

const ChannelForm = ({ isLoading, onSave }: Props) => {
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
  const onSaveChannel = useCallback(() => onSave(state.name, state.type), [state, onSave]);

  useEffect(() => onCancel(), [isLoading, onCancel]);

  return (
    <div className={container}>
      <h4>create a new channel</h4>
      <div className={controlContainer}>
        <Input placeholder="type a channel name" value={state.name} onChange={onNameChange} className={input} />
        <Select value={state.type} onChange={onTypeChange}>
          {types.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
      <div className={buttonContainer}>
        <SuccessButton disabled={isLoading || !state.name} style={{ marginRight: 5 }} onClick={onSaveChannel}>
          save
        </SuccessButton>
        <Button disabled={isLoading} onClick={onCancel}>
          cancel
        </Button>
      </div>
    </div>
  );
};

export default memo(ChannelForm);
