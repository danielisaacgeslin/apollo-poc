import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { default as ChannelForm, Props, types } from './ChannelForm';

describe('ChannelForm', () => {
  let props: Props;

  beforeEach(() => {
    props = {
      isLoading: false,
      onSave: jest.fn()
    };
  });

  it('should render', () => {
    const { container } = render(<ChannelForm {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    const { container } = render(<ChannelForm {...props} isLoading={true} />);
    expect(container).toMatchSnapshot();
  });

  it('should create a channel', () => {
    const name = 'a channel';
    const [_, type] = types;
    const { getByTestId } = render(<ChannelForm {...props} />);
    fireEvent.change(getByTestId('channel-name'), { target: { value: name } });
    fireEvent.change(getByTestId('channel-type'), { target: { value: type } });
    fireEvent.click(getByTestId('channel-save'));
    expect(props.onSave).toBeCalledWith(name, type);
  });

  it('should NOT create while loading', () => {
    const name = 'a channel';
    const { getByTestId } = render(<ChannelForm {...props} isLoading={true} />);
    fireEvent.change(getByTestId('channel-name'), { target: { value: name } });
    fireEvent.click(getByTestId('channel-save'));
    expect(props.onSave).not.toBeCalled();
  });

  it('should NOT create with an empty name', () => {
    const { getByTestId } = render(<ChannelForm {...props} isLoading={true} />);
    fireEvent.click(getByTestId('channel-save'));
    expect(props.onSave).not.toBeCalled();
  });

  it('should cancel', () => {
    const name = 'a channel';
    const { getByTestId } = render(<ChannelForm {...props} />);
    fireEvent.change(getByTestId('channel-name'), { target: { value: name } });
    expect((getByTestId('channel-name') as HTMLInputElement).value).toEqual(name);
    fireEvent.click(getByTestId('channel-cancel'));
    expect((getByTestId('channel-name') as HTMLInputElement).value).toEqual('');
  });
});
