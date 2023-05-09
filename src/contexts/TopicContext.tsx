import React, { createContext } from 'react';

interface Topic {
  id: string;
  [key: string]: any;
}

interface TopicContextValue {
  currentTopics: Topic[];
  setCurrentTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

const TopicContext = createContext<TopicContextValue>({
  currentTopics: [],
  setCurrentTopics: () => {},
});

export default TopicContext;
