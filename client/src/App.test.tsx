import React from 'react';
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import { render, act, fireEvent } from '@testing-library/react';

import { GET_FULL_CHANNEL_LIST } from './api/queries';
import { CREATE_CHANNEL, DELETE_CHANNEL } from './api/mutations';

import { default as App } from './App';

const getWrappedApp = (mocks: MockedResponse[]) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <App />
  </MockedProvider>
);

describe('App', () => {
  let mocks: MockedResponse[];
  let fetchMock: jest.Mock;
  let createMock: jest.Mock;
  let deleteMock: jest.Mock;
  beforeEach(() => {
    fetchMock = jest.fn();
    createMock = jest.fn();
    deleteMock = jest.fn();
    mocks = [
      {
        request: { query: GET_FULL_CHANNEL_LIST },
        result: () => {
          fetchMock();
          return {
            data: {
              channels: [
                { id: 'a', name: 'first', type: 'dm' },
                { id: 'b', name: 'second', type: 'group' }
              ]
            }
          };
        }
      },
      {
        request: { query: CREATE_CHANNEL, variables: { name: 'new channel', type: 'dm' } },
        result: () => {
          createMock();
          return { data: { createChannel: { id: 'c' } } };
        }
      },
      {
        request: { query: DELETE_CHANNEL, variables: { id: 'a' } },
        result: () => {
          deleteMock();
          return { data: { deleteChannel: true } };
        }
      }
    ];
  });

  it('should render loading', () => {
    const { container } = render(getWrappedApp(mocks));
    expect(container).toMatchSnapshot();
  });

  it('should render with results', async () => {
    const { container } = render(getWrappedApp(mocks));
    await act(() => wait(0));
    expect(container).toMatchSnapshot();
  });

  it('should create a channel', async () => {
    const { getByTestId } = render(getWrappedApp([...mocks, mocks[0]]));
    fireEvent.change(getByTestId('channel-name'), { target: { value: 'new channel' } });
    fireEvent.click(getByTestId('channel-save'));
    await act(() => wait(0));
    expect(createMock).toBeCalled();
  });

  it('should delete a channel', async () => {
    window.confirm = () => true;
    const { getAllByTestId } = render(getWrappedApp([...mocks, mocks[0]]));
    await act(() => wait(0));
    fireEvent.click(getAllByTestId('channel-delete')[0]);
    await act(() => wait(0));
    expect(deleteMock).toBeCalled();
  });
});
