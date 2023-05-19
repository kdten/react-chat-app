import React, { useState, createContext } from 'react';

interface Topic {
  id: string;
  name: string;
}

interface SelectedTopicContextValue {
  selectedTopic: Topic | null;
  setSelectedTopic: React.Dispatch<React.SetStateAction<Topic | null>>;
}

const SelectedTopicContext = createContext<SelectedTopicContextValue>({
  selectedTopic: null,
  setSelectedTopic: () => {},
});

interface SelectedTopicProviderProps {
  children: React.ReactNode;
}

export const SelectedTopicProvider: React.FC<SelectedTopicProviderProps> = ({ children }) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <SelectedTopicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
      {children}
    </SelectedTopicContext.Provider>
  );
};

export default SelectedTopicContext;
