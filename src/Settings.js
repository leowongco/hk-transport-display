import React, { useEffect, useState } from "react";
import "./css/Settings.css";

import DictM from "./component/MTR_Dict.js";
import DictL from "./component/LRT_Dict.js";

function Settings() {
  const storage = window.localStorage;
  const [haveLrtRecords, setHaveLrtRecords] = useState(false);

  const wrlSaveStnArray = JSON.parse(storage.getItem("WRL_SaveStn"));
  const tklSaveStnArray = JSON.parse(storage.getItem("TKL_SaveStn"));
  const tclSaveStnArray = JSON.parse(storage.getItem("TCL_SaveStn"));
  const aelSaveStnArray = JSON.parse(storage.getItem("AEL_SaveStn"));
  const tmlSaveStnArray = JSON.parse(storage.getItem("TML_SaveStn"));
  const lrtSaveStnArray = JSON.parse(storage.getItem("LrtSaveStn"));

  useEffect(() => {
    if (storage.getItem("LrtSaveStn") === null) {
      setHaveLrtRecords(true);
    }
  }, []);

  return (
    <div className="settings">
      <div className="settingPart">
        <div className="settingHeading">Save Stations</div>

        <div className="settingRow">
          <div className="saveStnLine">{DictM.MtrLines.TKL.tc_name}</div>
          <div className="saveStnCount">
            已儲存數目: {tklSaveStnArray?.length}
          </div>
          <div className="saveStnDetails">
            {tklSaveStnArray?.map((stn, i) => DictM.MtrStations[stn].tc_name)}
          </div>
          <div className="saveStnActions">
            {" "}
            {tklSaveStnArray.length === 0 ? "" : "Delete All"}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnLine">{DictM.MtrLines.TCL.tc_name}</div>
          <div className="saveStnCount">
            已儲存數目: {tclSaveStnArray?.length}
          </div>
          <div className="saveStnDetails">
            {tclSaveStnArray?.map((stn, i) => DictM.MtrStations[stn].tc_name)}
          </div>
          <div className="saveStnActions">
            {" "}
            {tclSaveStnArray.length === 0 ? "" : "Delete All"}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnLine">{DictM.MtrLines.AEL.tc_name}</div>
          <div className="saveStnCount">
            已儲存數目: {aelSaveStnArray?.length}
          </div>
          <div className="saveStnDetails">
            {aelSaveStnArray?.map((stn, i) => DictM.MtrStations[stn].tc_name)}
          </div>
          <div className="saveStnActions">
            {" "}
            {aelSaveStnArray.length === 0 ? "" : "Delete All"}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnLine">{DictM.MtrLines.TML.tc_name}</div>
          <div className="saveStnCount">
            已儲存數目: {tmlSaveStnArray?.length}
          </div>
          <div className="saveStnDetails">
            {tmlSaveStnArray?.map((stn, i) => DictM.MtrStations[stn].tc_name)}
          </div>
          <div className="saveStnActions">
            {tmlSaveStnArray.length === 0 ? "" : "Delete All"}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnLine">{DictL.lrtCommon.tc.lrt}</div>
          <div className="saveStnCount">
            已儲存數目: {lrtSaveStnArray?.length}
          </div>
          <div className="saveStnDetails">
            {lrtSaveStnArray?.map((stn, i) => DictL.lrtStations[stn].tc_name)}
          </div>
          <div className="saveStnActions">
            {lrtSaveStnArray.length === 0 ? "" : "Delete All"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
