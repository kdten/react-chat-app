import React from 'react'
import { FaPlus, FaChevronDown, FaChevronRight} from 'react-icons/fa'
import { BsHash } from 'react-icons/bs'
import { useState } from 'react'

const topics = ['tailwind-css', 'react'];
const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
const random = ['variants', 'plugins'];

const channelSidebar = ({selectedServer})  => {
  return (
    <div className='channel-bar shadow-lg'>
      <ChannelBlock selectedServer={selectedServer}/>
      <div className='channel-container'>
        <Dropdown header='Topics' selections={topics} />
        <Dropdown header='Questions' selections={questions} />
        <Dropdown header='Random' selections={random} />
      </div>
    </div>
  )
}

const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='dropdown'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          {header}
        </h5>
        <FaPlus size='12' className='text-accent text-opacity-80 my-auto ml-auto' />
      </div>
      {expanded &&
        selections &&
        selections.map((selection) => <TopicSelection selection={selection} />)}
    </div>
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};

const TopicSelection = ({ selection }) => (
  <div className='dropdown-selection'>
    <BsHash size='24' className='text-gray-400' />
    <h5 className='dropdown-selection-text'>{selection}</h5>
  </div>
);

const ChannelBlock = ({selectedServer}) => (
  <div className='channel-block'>
    <h5 className='channel-block-text'>{selectedServer.name}</h5>
  </div>
);

// Component:
// ServerName
// ChannelCategory (reusable for each category)
// TextChannel (reusable for each text channel)
// VoiceChannel (reusable for each voice channel)
// AddChannelButton
// MembersListButton

export default channelSidebar