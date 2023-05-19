import React, { useState, createContext } from 'react';

interface Topic {
  id: string;
  name: string;
  channelid: string;
}

interface TopicContextValue {
  currentTopics: Topic[];
  setCurrentTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

const TopicContext = createContext<TopicContextValue>({
  currentTopics: [],
  setCurrentTopics: () => {},
});

interface TopicProviderProps {
  children: React.ReactNode;
}

export const TopicProvider: React.FC<TopicProviderProps> = ({ children }) => {
  const [currentTopics, setCurrentTopics] = useState<Topic[]>([]);

  return (
    <TopicContext.Provider value={{ currentTopics, setCurrentTopics }}>
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContext;
