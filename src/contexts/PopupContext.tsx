import React, { useState, createContext } from 'react';

interface PopupContextValue {
  showPopup: { type: string; show: boolean };
  setShowPopup: React.Dispatch<React.SetStateAction<{ type: string; show: boolean }>>;
}

const PopupContext = createContext<PopupContextValue>({
  showPopup: { type: '', show: false },
  setShowPopup: () => {},
});

export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState({ type: '', show: false });

  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContext;