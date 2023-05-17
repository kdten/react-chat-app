import React from 'react';
import TopNav from './TopNav';
import MessagesContainer from './MessagesContainer';
import '../App.css';

const MessageArea = () => {
  return (
    <div className="message-area">
      <TopNav />
      <MessagesContainer />
    </div>
  )
}

// Components:
// Message (reusable for each message)
// PinnedMessages (optional, based on the existence of pinned messages)

export default MessageArea