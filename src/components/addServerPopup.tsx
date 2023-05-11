import React, { useEffect, useState } from 'react';
// import 22 fontawesome icons from 
import { FaCamera, FaCat, FaHashtag, FaLeaf, FaCode, FaWrench, FaCheck, FaList, FaSnowflake, FaTv, FaQuestion, FaMusic, FaBell, FaTag, FaBook, FaTruck, FaMap, FaImage, FaAtom, FaGamepad, FaCampground, FaFilm } from 'react-icons/fa';
import { BsPlus } from 'react-icons/bs';
import Popup from './Popup';

const icons: object[] = [FaCamera, FaCat, FaHashtag, FaLeaf, FaCode, FaWrench, FaCheck, FaList, FaSnowflake, FaTv, FaQuestion, FaMusic, FaBell, FaTag, FaBook, FaTruck, FaMap, FaImage, FaAtom, FaGamepad, FaCampground, FaFilm];

const AddServerPopup = ({ onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);


  useEffect(() => {
    console.log('selectedIcon:', selectedIcon);
  }, [selectedIcon]);

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
          />
          <button className="submit-btn">Submit</button>
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
