import React, { useEffect, useState, useContext } from 'react';
// import 22 fontawesome icons from 
import { FaCamera, FaCat, FaHashtag, FaLeaf, FaCode, FaWrench, FaCheck, FaList, FaSnowflake, FaTv, FaQuestion, FaMusic, FaBell, FaTag, FaBook, FaTruck, FaMap, FaImage, FaAtom, FaGamepad, FaCampground, FaFilm } from 'react-icons/fa';

import Popup from './Popup';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';

// import { getDatabase } from "firebase/database";
// const database = getDatabase();

const icons: object[] = [FaCamera, FaCat, FaHashtag, FaLeaf, FaCode, FaWrench, FaCheck, FaList, FaSnowflake, FaTv, FaQuestion, FaMusic, FaBell, FaTag, FaBook, FaTruck, FaMap, FaImage, FaAtom, FaGamepad, FaCampground, FaFilm];

const AddServerPopup = ({ onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [serverName, setServerName] = useState("");
  const { firestore } = useFirebase();


  useEffect(() => {
    console.log('selectedIcon:', selectedIcon);
  }, [selectedIcon]);

  const submitServer = async () => {
    if (firestore) {
      const serverRef = doc(collection(firestore, "servers"));
      await setDoc(serverRef, { name: serverName });
      setServerName(""); // reset the input field
      onClose(); // close the popup
    }
  };

  return (
    <Popup title="Create a Server" subtitle="Create a globally available Server">
        <div className="add-server-icon-area">
          {icons.map((Icon, index) => (
            <PopupIcon
              key={index}
              IconComponent={Icon}
              isSelected={selectedIcon === Icon}
              onClick={() => setSelectedIcon(Icon)}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-around">
          <input
            type="text"
            placeholder="Server Name"
            className="server-name-input"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
          <button className="submit-btn" onClick={submitServer}>Submit</button>
        </div>
    </Popup>
  );
};

const PopupIcon = ({ IconComponent, isSelected, onClick }) => {
  return (
    <div
      className={`add-server-icon ${isSelected ? "selected-icon" : ""}`}
      onClick={onClick}
    >
      <IconComponent size="36" />
    </div>
  );
};
  
export default AddServerPopup;
