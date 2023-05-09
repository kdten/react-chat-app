import React, { useState, createContext } from 'react';

interface PopupContextValue {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupContext = createContext<PopupContextValue>({
  showPopup: false,
  setShowPopup: () => {},
});

export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
      {children}
    </PopupContext.Provider>
  );
};


export default PopupContext;