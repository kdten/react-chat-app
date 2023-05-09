import React, { createContext } from 'react';

interface Channel {
  id: string;
  [key: string]: any;
}

interface ChannelContextValue {
  currentChannels: Channel[];
  setCurrentChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
}

const ChannelContext = createContext<ChannelContextValue>({
  currentChannels: [],
  setCurrentChannels: () => {},
});

export default ChannelContext;
