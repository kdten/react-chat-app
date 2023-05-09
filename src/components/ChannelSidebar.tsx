import React, { useState, useEffect } from 'react';
import { FaPlus, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { BsHash } from 'react-icons/bs';
import Settings from './Settings'; // Adjust the path to the location of your Settings component

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
  const [currentChannels, setCurrentChannels] = useState([]);
  const [currentTopics, setCurrentTopics] = useState([]);


  useEffect(() => {
    // Fetch the channels from the database
    if (selectedServer) {
      // Channel fetching
      const db = getFirestore();
      const channelsCollection = collection(db, "channels");
      const channelsCollectionForServerIdQuery = query(channelsCollection, where("serverid", "==", selectedServer.id));
  
      // Use onSnapshot for real-time updates on the channels
      const unsubscribe = onSnapshot(channelsCollectionForServerIdQuery, async (querySnapshot) => {
        const channels = [];
        querySnapshot.forEach((doc) => {
          channels.push({ id: doc.id, ...doc.data() });
        });
        setCurrentChannels(channels);
        console.log('Channels:', [...channels]);
        // console.log('Channels:', channels.map(channel => channel.id));

        // Topic fetching after fetching channels
        const topicsCollection = collection(db, "topics");
        const channelIds = channels.map((channel) => channel.id);
        const topicsForChannelIdsQuery = query(topicsCollection, where("channelid", "in", channelIds));
        const topicQuerySnapshot = await getDocs(topicsForChannelIdsQuery);
        const topics = [];
        topicQuerySnapshot.forEach((doc) => {
          topics.push({ id: doc.id, ...doc.data() });
        });
        setCurrentTopics(topics);
        
      });
      
      // Topic fetching
      // const topicsCollection = collection(db, "topics");
      // const topicsCollectionForServerIdQuery = query(topicsCollection, where("channelid", "in", channel.topics));
      // Cleanup function to unsubscribe from the snapshot listener when the component is unmounted or selectedServer changes
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
        {currentChannels.map((channel) => {
          const topicsForChannel = currentTopics.filter((topic) => topic.channelid === channel.id);
          const topicNamesForChannel = topicsForChannel.map((topic) => topic.name);
          return (
            <Dropdown
              header={channel.name}
              topicNames={topicNamesForChannel}
              selectedServer={selectedServer}
            />
          );
        })}
      </div>
    </div>
  );
};

const Dropdown = ({ header, topicNames, selectedServer }) => {
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
        topicNames &&
        topicNames.map((selection) => <TopicSelection selection={selection} />)}
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

const ChannelBlock = ({ selectedServer }) => (
  <div className='channel-block'>
    <h5 className='channel-block-text'>{selectedServer.name}</h5>
  </div>
);

// Component:
// ServerName
// ChannelCategory (reusable for each category)
// TextChannel (reusable for each text channel)
// AddChannelButton
// MembersListButton

export default ChannelSidebar