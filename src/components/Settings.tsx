import React from "react";

import "../assets/settings.css";

const Settings = () => {
  return (
    <div
      aria-orientation="vertical"
      aria-label="User Settings"
    >
      <div
        className="item selected"
        aria-selected="true"
        aria-disabled="false"
        aria-label="My Account"
        aria-controls="my-account-tab"
      >
        My Account
      </div>
      <div
        className="item"
        aria-selected="false"
        aria-disabled="false"
        aria-label="Profiles"
      >
        Profiles
      </div>
      <div
        className="item"
        aria-selected="false"
        aria-disabled="false"
      >
        Privacy &amp; Safety
      </div>
      <div
        className="item"
        aria-selected="false"
        aria-disabled="false"
      >
        Authorized Apps
      </div>
      <div
        className="item"
        aria-selected="false"
        aria-disabled="false"
        aria-label="Devices"
      >
        Devices
      </div>
      <div
        className="item"
        aria-selected="false"
        aria-disabled="false"
        aria-label="Connections"
      >
        Connections
      </div>
      <div
        className="item"
        aria-selected="false"
        aria-disabled="false"
      >
        Friend Requests
      </div>
      <div className="separator"></div>
    </div>
  );
};

export default Settings;
