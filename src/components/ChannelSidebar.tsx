import React, { useState, useEffect, useContext } from 'react';
import PopupContext from '../contexts/PopupContext';
import ChannelContext from '../contexts/ChannelContext';
import TopicContext from '../contexts/TopicContext';
import SelectedTopicContext from '../contexts/SelectedTopicContext';

import { FaPlus, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { BsHash } from 'react-icons/bs';
import Settings from './Settings';

import { doc, getDoc, where } from "firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from '../firebase';


const ChannelSidebar = ( {selectedServer} ) => {
  const { currentChannels, setCurrentChannels } = useContext(ChannelContext);
  const { currentTopics, setCurrentTopics } = useContext(TopicContext);
  const { showPopup, setShowPopup } = useContext(PopupContext);

  useEffect(() => {
    // Fetch the channels from the database
    if (selectedServer) {
      // Channel fetching
      const db = getFirestore();
      const channelsCollection = collection(db, "channels");
      const channelsCollectionForServerIdQuery = query(channelsCollection, where("serverid", "==", selectedServer.id));


      interface Topic {
        id: string;
        name: string;
        channelid: string;
      }

      interface Channel {
        id: string;
        name: string;
        serverid: string;
        topics: Topic[];
      }

      // Use onSnapshot for real-time updates on the channels
      const unsubscribe = onSnapshot(channelsCollectionForServerIdQuery, async (querySnapshot) => {
        const channels: Channel[] = []; // Channels array with specified type
        querySnapshot.forEach((doc) => {
          channels.push({ id: doc.id, ...doc.data() } as Channel);
        });
        setCurrentChannels(channels);
        console.log('Channels:', [...channels]);
        // console.log('Channels:', channels.map(channel => channel.id));

        // Topic fetching after fetching channels
        const topicsCollection = collection(db, "topics");
        const channelIds = channels.map((channel) => channel.id);
        const topicsForChannelIdsQuery = query(topicsCollection, where("channelid", "in", channelIds));
        const topicQuerySnapshot = await getDocs(topicsForChannelIdsQuery);
        const topics: Topic[] = []; // Topics array with specified type
        topicQuerySnapshot.forEach((doc) => {
          topics.push({ id: doc.id, ...doc.data() } as Topic);
        });
        setCurrentTopics(topics);
        
      });
      
      return () => unsubscribe();
    }

  }, [selectedServer]);

  // if selectedServer is the settings server, render the settings component
  if (selectedServer.id === "ulzj52o2cbECX8pMxKWy") {
    return (   
    <div className="channel-bar shadow-lg">
      <ChannelBlock selectedServer={selectedServer} />
      <div className="channel-container">
        <Settings />
      </div>
    </div>
    )
  }

  return (
    <div className="channel-bar shadow-lg">
      <ChannelBlock selectedServer={selectedServer} />
      <div className="channel-container">
        { currentChannels.map((channel) => {
    const topicsForChannel = currentTopics.filter((topic) => topic.channelid === channel.id);
    const topicNames = topicsForChannel.map((topic) => topic.name);
    return (
      <ChannelDropdown
        header={channel.name}
        topicTopics={topicNames}
        selectedServer={selectedServer}
      />
          );
        })}
      </div>
    </div>
  );
};

const ChannelDropdown = ({ header, topicTopics, selectedServer }) => {
  const [expanded, setExpanded] = useState(true);
  const { showPopup, setShowPopup } = useContext(PopupContext);
  const { setSelectedTopic } = useContext(SelectedTopicContext);


  return (
    <div className='dropdown'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          {header}
        </h5>
        <div className="ml-auto p-1" onClick={() => setShowPopup({type: 'popupType', show: true})}>        
          <FaPlus size='12' className='text-accent text-opacity-80 my-auto ml-auto' />
        </div>
      </div>
      {expanded &&
        topicTopics &&
        topicTopics.map((topicName) => <TopicButton topicName={topicName} />)}
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

const TopicButton = ({ topicName }) => {
  const { setSelectedTopic } = useContext(SelectedTopicContext);

  const handleClick = () => {
    setSelectedTopic(topicName);
    console.log('Topic clicked:', topicName);
  };

  return (
    <div className='dropdown-selection' onClick={handleClick}>
      <BsHash size='24' className='text-gray-400' />
      <h5 className='dropdown-selection-text'>{topicName}</h5>
    </div>
  );
};

const ChannelBlock = ({ selectedServer }) => (
  <div className='channel-block'>
    <h5 className='channel-block-text'>{selectedServer.name}</h5>
  </div>
);

// Component:
// ServerName
// TextChannel (reusable for each text channel)
// AddChannelButton
// MembersListButton

export default ChannelSidebar