import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { default as ChannelList, Props } from './ChannelList';

describe('ChannelList', () => {
  let props: Props;

  beforeEach(() => {
    props = {
      isLoading: false,
      isDeleting: false,
      error: undefined,
      channelList: [
        { id: 'a', name: 'first', type: 'dm' },
        { id: 'b', name: 'second', type: 'group' }
      ],
      onDelete: jest.fn()
    };
  });

  it('should render', () => {
    const { container } = render(<ChannelList {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with no results', () => {
    const { container } = render(<ChannelList {...props} channelList={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    const { container } = render(<ChannelList {...props} isLoading={true} channelList={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with error', () => {
    const { container } = render(<ChannelList {...props} error={{ message: 'error message' } as any} channelList={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should NOT delete when NOT confirmed', () => {
    window.confirm = () => false;
    const { getAllByTestId } = render(<ChannelList {...props} />);
    fireEvent.click(getAllByTestId('channel-delete')[0]);
    expect(props.onDelete).not.toBeCalled();
  });

  it('should delete when confirmed', () => {
    window.confirm = () => true;
    const { getAllByTestId } = render(<ChannelList {...props} />);
    fireEvent.click(getAllByTestId('channel-delete')[0]);
    expect(props.onDelete).toBeCalledWith(props.channelList[0].id);
  });

  it('should NOT delete when is deleting', () => {
    window.confirm = () => true;
    const { getAllByTestId } = render(<ChannelList {...props} isDeleting={true} />);
    fireEvent.click(getAllByTestId('channel-delete')[0]);
    expect(props.onDelete).not.toBeCalledWith(props.channelList[0].id);
  });
});
