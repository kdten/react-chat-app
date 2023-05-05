import React, { useState, useEffect } from 'react'
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
)
        }

export default Layout