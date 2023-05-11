import React, { useRef, useEffect, useContext, onClose  } from 'react';
import PopupContext from '../contexts/PopupContext';
// import AddServerPopup from './AddServerPopup';
// import AddChannelContent from './AddChannelContent';

const Popup = ({ children, title, subtitle }) => {
  const popupRef = useRef();
  const { setShowPopup } = useContext(PopupContext);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup({ type: '', show: false });
    }
  };

  const handleCloseButtonClick = () => {
    if (onClose) {
      onClose();
    } else {
      setShowPopup({ type: "", show: false });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
    return (
      <div className="popup-overlay">
        <div className="popup" ref={popupRef}>
          <div className="popup-header">
            <h2 className="popup-title">{title}</h2>
            <p className="popup-subtitle">{subtitle}</p>
            <button className="popup-close" onClick={handleCloseButtonClick}>
              <h1>X</h1>
            </button>
          </div>

          <div className="popup-content">{children}</div>
        </div>
      </div>
    );
  };
  
  export default Popup;