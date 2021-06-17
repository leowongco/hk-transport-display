import React, { useEffect, useState } from "react";
import "./css/Settings.css";

function Settings() {
  const storage = window.localStorage;
  const [haveLrtRecords, setHaveLrtRecords] = useState(false);

  useEffect(() => {
    if (storage.getItem("LrtSaveStn") === null) {
      setHaveLrtRecords(true);
    }
  }, []);

  return (
    <div className="settings">
      {/* Header */}
      {/* Settings */}
      {/* Header */}
    </div>
  );
}

export default Settings;
