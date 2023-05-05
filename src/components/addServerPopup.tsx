import React from 'react';
import { useState } from 'react';
// import 22 fontawesome icons from 
import { FaCamera, FaCat, FaHashtag, FaLeaf, FaCode, FaWrench, FaCheck, FaList, FaSnowflake, FaTv, FaQuestion, FaMusic, FaBell, FaTag, FaBook, FaTruck, FaMap, FaImage, FaAtom, FaGamepad, FaCampground, FaFilm } from 'react-icons/fa';
import { BsPlus } from 'react-icons/bs';

const icons: object[] = [FaCamera, FaCat, FaHashtag, FaLeaf, FaCode, FaWrench, FaCheck, FaList, FaSnowflake, FaTv, FaQuestion, FaMusic, FaBell, FaTag, FaBook, FaTruck, FaMap, FaImage, FaAtom, FaGamepad, FaCampground, FaFilm];

const AddServerPopup = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
  
    return (
        <div className="add-server-popup-overlay">
        <div className="add-server-popup">
        <div className="popup-header">
          <h2 className="popup-title">Create a server</h2>
          <p className="popup-subtitle">
            Your server is where you and your friends hang out.
          </p>
          <button className="popup-close">
            X
          </button>
        </div>
        <div className="popup-content">
        <div className="icon-grid scrollbar-hide">
        

              </div>
            </div>
        {/* Add the content div in the next step */}
      </div>
    </div>
    );
  };
  
  export default AddServerPopup;