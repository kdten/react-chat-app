import React, { useState, useEffect } from 'react';
import { BsPlus, BsGlobe, BsGearFill } from 'react-icons/bs';
// import { FaCamera, FaCat, FaHashtag, FaLeaf, FaCode, FaWrench, FaCheck, FaList, FaSnowflake, FaTv, FaQuestion, FaMusic, FaBell, FaTag, FaBook, FaTruck, FaMap, FaImage, FaAtom, FaGamepad, FaCampground, FaFilm } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa';
import { getFirestore, collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
// import { Link } from 'next/link'
// import { useState } from 'react';

import '../App.css';

const ServerSidebar = ({ onServerClick, selectedServer }) => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const serversRef = collection(db, 'servers');
      const q = query(serversRef, orderBy('name'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const serversData = [];
        querySnapshot.forEach((doc) => {
          serversData.push({ id: doc.id, ...doc.data() });
        });
        setServers(serversData);
        // console.log('Servers:', serversData);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const getIconElement = (iconString) => {
    switch (iconString) {
      case 'FaFire':
        return <FaFire size="28" />;
      case 'BsGlobe':
        return <BsGlobe size="28" />;
      case 'BsPlus':
        return <BsPlus size="32" />;
      case 'BsGearFill':
        return <BsGearFill size="22" />;
      // case 'BsPlus':
      //   return <BsPlus size="28" />;
      // add other cases for other icons you want to support
      default:
        return <BsGlobe size="28" />; // default icon
    }
  };

  // group servers for mapping in correct places below
  const directMessagesServer = servers.find((server: any) => server.id === 'OcEzrrD1p0pLEohpJ6nG');
  const globalChatServer = servers.find((server: any) => server.id === 'wRkznO8i1hxgMqzzCYlz');
  const addServer = servers.find((server: any) => server.id === '8W28zAzrF5jHBbNvq4CI');
  const settingsServer = servers.find((server: any) => server.id === 'ulzj52o2cbECX8pMxKWy');
  const otherServers = servers.filter((server: any) => !['directmessages', 'settings', 'addserver', 'globalchat'].includes(server.dataserver));


  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg">
  {directMessagesServer && (
    <ServerSidebarIcon
      id={directMessagesServer.id}
      icon={getIconElement(directMessagesServer.icon)}
      text={directMessagesServer.name}
      dataserver={directMessagesServer.dataserver}
      onClick={() => onServerClick(directMessagesServer.id, directMessagesServer.name)}
      selectedServerId={selectedServer.id}
    />
  )}

  <Divider />

  {globalChatServer && (
    <ServerSidebarIcon
      id={globalChatServer.id}
      icon={getIconElement(globalChatServer.icon)}
      text={globalChatServer.name}
      dataserver={globalChatServer.dataserver}
      onClick={() => onServerClick(globalChatServer.id, globalChatServer.name)}
      selectedServerId={selectedServer.id}/>
  )}

  {otherServers.map((server: any) => (
    <ServerSidebarIcon
      id={server.id}
      icon={getIconElement(server.icon)}
      text={server.name}
      dataserver={server.dataserver}
      onClick={() => onServerClick(server.id, server.name)}
      selectedServerId={selectedServer.id}/>
  ))}

  <Divider />

  {addServer && (
    <ServerSidebarIcon
      id={addServer.id}
      icon={getIconElement(addServer.icon)}
      text={addServer.name}
      dataserver={addServer.dataserver}
      onClick={() => onServerClick(addServer.id, addServer.name)}
      selectedServerId={selectedServer.id}/>
  )}

  {settingsServer && (
    <ServerSidebarIcon
      id={settingsServer.id}
      icon={getIconElement(settingsServer.icon)}
      text={settingsServer.name}
      dataserver={settingsServer.dataserver}
      onClick={() => onServerClick(settingsServer.id, settingsServer.name)}
      selectedServerId={selectedServer.id}/>
  )}
</div>

  );
};

const ServerSidebarIcon = ({ icon, text, id, name, onClick, selectedServerId }) => {
  return (
    <div className={`sidebar-icon group ${selectedServerId === id ? 'selected' : ''}`} onClick={() => onClick(id, name)}>
      <span
        className={`sidebar-icon-pill ${selectedServerId === id ? 'h-10' : 'group-hover:h-6'}`}
      ></span>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};




const Divider = () => <hr className="sidebar-hr" />;

export default ServerSidebar