import React, { useState, useContext } from 'react'
import { ChannelProvider } from '../contexts/ChannelContext';
import { TopicProvider } from '../contexts/TopicContext';
import PopupContext, { PopupProvider } from '../contexts/PopupContext';
import AddServerPopup from './AddServerPopup';

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
    );
        };


        const PopupRenderer = () => {
          const { showPopup, setShowPopup } = useContext(PopupContext);
        
          const handleClose = () => {
            setShowPopup({ type: "", show: false });
          };
        
          return (
            <>
              {showPopup.show && showPopup.type === "ADD_SERVER" && (
                <AddServerPopup onClose={handleClose} />
              )}
            </>
          );
        };

export default Layout