import React, { useState, createContext } from 'react';

interface Topic {
  id: string;
  name: string;
}

interface Channel {
  id: string;
  name: string;
  serverid: string;
  topics: Topic[];
}

interface ChannelContextValue {
  currentChannels: Channel[];
  setCurrentChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
}

const ChannelContext = createContext<ChannelContextValue>({
  currentChannels: [],
  setCurrentChannels: () => {},
});

interface ChannelProviderProps {
  children: React.ReactNode;
}


export const ChannelProvider: React.FC<ChannelProviderProps> = ({ children }) => {
  const [currentChannels, setCurrentChannels] = useState<Channel[]>([]);

  return (
    <ChannelContext.Provider value={{ currentChannels, setCurrentChannels }}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelContext;
