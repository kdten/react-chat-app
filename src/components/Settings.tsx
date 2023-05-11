import React from "react";

import "../App.css";

const Settings = () => {
  return (
    <div
      aria-orientation="vertical"
      aria-label="User Settings"
      className="dropdown-selection-text ml-2"
    >
      <div className="item selected">My Account</div>
      <div className="separator"></div>
      <div className="item">Dark Mode</div>
      <div className="item">Privacy &amp; Safety</div>
      <div className="item">Created Servers</div>
    </div>
  );
};

export default Settings;
