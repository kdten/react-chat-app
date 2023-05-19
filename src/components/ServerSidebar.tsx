import React, { useState, useEffect, useContext } from 'react';
import PopupContext from '../contexts/PopupContext';
import AddServerPopup from './addServerPopup';
import { BsPlus, BsGlobe, BsGearFill } from 'react-icons/bs';
// import { FaCamera, FaCat, FaHashtag, FaLeaf, FaCode, FaWrench, FaCheck, FaList, FaSnowflake, FaTv, FaQuestion, FaMusic, FaBell, FaTag, FaBook, FaTruck, FaMap, FaImage, FaAtom, FaGamepad, FaCampground, FaFilm } from 'react-icons/fa';
import { FaComments } from 'react-icons/fa';// import { Link } from 'next/link'
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from '../firebase';


import '../App.css';

const ServerSidebar = ({ onServerClick, selectedServer }) => {
  const [servers, setServers] = useState([]);
  const { showPopup, setShowPopup } = useContext(PopupContext);


  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const serversRef = collection(db, "servers");
      const q = query(serversRef, orderBy("name"));

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
      case "FaComments":
        return <FaComments size="28" />;
      case "BsGlobe":
        return <BsGlobe size="28" />;
      case "BsPlus":
        return <BsPlus size="32" />;
      case "BsGearFill":
        return <BsGearFill size="22" />;
      // case 'BsPlus':
      //   return <BsPlus size="28" />;
      // add other cases for other icons you want to support
      default:
        return <BsGlobe size="28" />; // default icon
    }
  };

  // group servers for mapping in correct places below
  const directMessagesServer = servers.find(
    (server: any) => server.id === "OcEzrrD1p0pLEohpJ6nG"
  );
  const globalChatServer = servers.find(
    (server: any) => server.id === "wRkznO8i1hxgMqzzCYlz"
  );
  const addServer = servers.find(
    (server: any) => server.id === "8W28zAzrF5jHBbNvq4CI"
  );
  const settingsServer = servers.find(
    (server: any) => server.id === "ulzj52o2cbECX8pMxKWy"
  );
  const otherServers = servers.filter(
    (server: any) =>
      ![
        "OcEzrrD1p0pLEohpJ6nG",
        "wRkznO8i1hxgMqzzCYlz",
        "8W28zAzrF5jHBbNvq4CI",
        "ulzj52o2cbECX8pMxKWy",
      ].includes(server.id)
  );

  const handleServerClick = (id, name) => {
    if (id === "8W28zAzrF5jHBbNvq4CI") {
      setShowPopup({ type: "ADD_SERVER", show: true });
    } else {
      onServerClick(id, name);
    }
  };

  return (
    <div className="server-sidebar">
      {directMessagesServer && (
        <ServerSidebarIcon
          id={directMessagesServer.id}
          icon={getIconElement(directMessagesServer.icon)}
          name={directMessagesServer.name}
          onClick={() =>
            onServerClick(directMessagesServer.id, directMessagesServer.name)
          }
          selectedServerId={selectedServer.id}
        />
      )}

      <Divider />

      {globalChatServer && (
        <ServerSidebarIcon
          id={globalChatServer.id}
          icon={getIconElement(globalChatServer.icon)}
          name={globalChatServer.name}
          onClick={() =>
            onServerClick(globalChatServer.id, globalChatServer.name)
          }
          selectedServerId={selectedServer.id}
        />
      )}

      {otherServers.map((server: any) => (
        <ServerSidebarIcon
          id={server.id}
          icon={getIconElement(server.icon)}
          name={server.name}
          onClick={() => onServerClick(server.id, server.name)}
          selectedServerId={selectedServer.id}
        />
      ))}

      <Divider />

      {addServer && (
        <ServerSidebarIcon
          id={addServer.id}
          icon={getIconElement(addServer.icon)}
          name={addServer.name}
          onClick={() => handleServerClick(addServer.id, addServer.name)}
          selectedServerId={selectedServer.id}
        />
      )}

      {settingsServer && (
        <ServerSidebarIcon
          id={settingsServer.id}
          icon={getIconElement(settingsServer.icon)}
          name={settingsServer.name}
          onClick={() => onServerClick(settingsServer.id, settingsServer.name)}
          selectedServerId={selectedServer.id}
        />
      )}
    </div>
  );
};

type ServerSidebarIconProps = {
  icon: any;
  id: any;
  name: any;
  onClick: any;
  selectedServerId: any;
};

const ServerSidebarIcon = ({ icon, id, name, onClick, selectedServerId }: ServerSidebarIconProps) => {


  return (
    <div className={`sidebar-icon group ${selectedServerId === id ? 'selected' : ''}`} onClick={() => onClick(id, name)}>
      <span
        className={`sidebar-icon-pill ${selectedServerId === id ? 'h-10' : 'group-hover:h-6'}`}
      ></span>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{name}</span>
    </div>
  );
};




const Divider = () => <hr className="sidebar-hr" />;

export default ServerSidebar