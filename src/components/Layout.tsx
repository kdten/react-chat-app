import React, { useState, useContext } from 'react'
import { ChannelProvider } from '../contexts/ChannelContext';
import { TopicProvider } from '../contexts/TopicContext';
import { PopupProvider } from '../contexts/PopupContext';
import PopupContext from '../contexts/PopupContext';

import Popup from './Popup';
import ServerSidebar from './ServerSidebar'
// import ChannelHeader from './ChannelHeader'
import ChannelSidebar from './ChannelSidebar'
import TopNav from './TopNav'
import MessageArea from './MessageArea'
import MessageInputBar from './MessageInputBar'
import '../App.css';


const Layout = () => {
  const [selectedServer, setSelectedServer] = useState({ id: "wRkznO8i1hxgMqzzCYlz", name: "Global Chat" });


    const handleServerClick = (id, name) => {
      setSelectedServer({ id, name });
    };
  
    return (
      <ChannelProvider>
      <TopicProvider>
      <PopupProvider>
      <div className="flex">
      <ServerSidebar
        onServerClick={handleServerClick}
        selectedServer={selectedServer}
      />
      {/* <ChannelHeader /> */}
      <ChannelSidebar selectedServer={selectedServer} />
      <TopNav />
      {/* <MessageArea />
      <MessageInputBar /> */}
  </div>
  <PopupRenderer />

  </PopupProvider>
  </TopicProvider>
    </ChannelProvider>
)
        };


        const PopupRenderer = () => {
          const { showPopup }: any = useContext(PopupContext);
        
          return (
            <>
              {showPopup && <Popup />}
            </>
          );
        };

export default Layout