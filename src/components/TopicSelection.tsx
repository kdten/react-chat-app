import React, { useContext } from 'react';
import { BsHash } from 'react-icons/bs';
import SelectedTopicContext from '../contexts/SelectedTopicContext';

const TopicSelection = ({ selection }) => {
  const { setSelectedTopic } = useContext(SelectedTopicContext);

  const handleClick = () => {
    setSelectedTopic(selection);
    console.log('Topic clicked:', selection);
  };

  return (
    <div className='dropdown-selection' onClick={handleClick}>
      <BsHash size='24' className='text-gray-400' />
      <h5 className='dropdown-selection-text'>{selection}</h5>
    </div>
  );
};

export default TopicSelection;
