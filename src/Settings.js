import React, { useState, useEffect } from "react";
import "./css/Settings.css";

import { Chip, ButtonGroup, Button } from "@material-ui/core";

import DictM from "./component/MTR_Dict.js";
import DictL from "./component/LRT_Dict.js";

function Settings() {
  const langDict = {
    languageHead: {
      tc_name: "語言",
      en_name: "Language",
    },
    saveStnHeading: {
      tc_name: "儲存車站清單",
      en_name: "Saved Station List",
    },
    saveStn: {
      tc_name: "已儲存數目",
      en_name: "Saved Station",
    },
    delAll: {
      tc_name: "刪除所有",
      en_name: "Delete All",
    },
    dataSource: {
      tc_name: "資料來源",
      en_name: "Data Sources",
    },
  };

  const storage = window.localStorage;
  const [tklSaveStnArray, setTklSaveStnArray] = useState();
  const [tclSaveStnArray, setTclSaveStnArray] = useState();
  const [aelSaveStnArray, setAelSaveStnArray] = useState();
  const [tmlSaveStnArray, setTmlSaveStnArray] = useState();
  const [lrtSaveStnArray, setLrtSaveStnArray] = useState();
  const [lang, setLang] = useState("");
  const newArray = [];

  useEffect(() => {
    setTklSaveStnArray(JSON.parse(storage.getItem("TKL_SaveStn")));
    setTclSaveStnArray(JSON.parse(storage.getItem("TCL_SaveStn")));
    setAelSaveStnArray(JSON.parse(storage.getItem("AEL_SaveStn")));
    setTmlSaveStnArray(JSON.parse(storage.getItem("TML_SaveStn")));
    setLrtSaveStnArray(JSON.parse(storage.getItem("LrtSaveStn")));
    setLang(storage.getItem("savedLanguage"));
  }, []);

  const handleDelete = (station, line) => {
    if (line !== "lrt") {
      var tempArr = JSON.parse(
        storage.getItem(line.toUpperCase() + "_SaveStn")
      );
      let findStn = tempArr?.indexOf(station);
      tempArr.splice(findStn, 1);
      storage.setItem(line.toUpperCase() + "_SaveStn", JSON.stringify(tempArr));
    } else if (line === "lrt") {
      var tempArrL = JSON.parse(storage.getItem("LrtSaveStn"));
      let findStn = tempArr?.indexOf(station);
      tempArrL.splice(findStn, 1);
      storage.setItem("LrtSaveStn", JSON.stringify(tempArrL));
    }

    switch (line) {
      case "tkl":
        return setTklSaveStnArray(tempArr);
      case "tcl":
        return setTclSaveStnArray(tempArr);
      case "ael":
        return setAelSaveStnArray(tempArr);
      case "tml":
        return setTmlSaveStnArray(tempArr);
      case "lrt":
        return setLrtSaveStnArray(tempArrL);
      default:
        return null;
    }
  };

  const handleLangChange = (langChoice) => {
    storage.setItem("savedLanguage", langChoice);
    setLang(langChoice);
  };

  return (
    <div className="settings">
      <div className="settingPart">
        <div className="settingRow">
          {langDict.languageHead.tc_name + "/" + langDict.languageHead.en_name}
          <div style={{ flex: "1 0 0" }} />
          <ButtonGroup size="small" color="primary" variant="contained">
            <Button onClick={() => handleLangChange("tc")}>中文</Button>
            <Button onClick={() => handleLangChange("en")}>English</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="settingPart">
        <div className="settingHeading">
          {langDict.saveStnHeading[lang + "_name"]}
        </div>

        <div className="settingRow">
          <div
            className="saveStnLine"
            style={{ background: DictM.MtrLines.TKL.colorCode }}
          >
            {DictM.MtrLines.TKL.tc_name + " " + DictM.MtrLines.TKL.en_name}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnCount">
            {langDict.saveStn[lang + "_name"] + ": " + tklSaveStnArray?.length}
          </div>
          {tklSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {tklSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "tkl")}
                  color="primary"
                  size="small"
                />
              ))}
            </div>
          ) : null}

          <div className="saveStnActions">
            {" "}
            {tklSaveStnArray?.length === 0
              ? null
              : langDict.delAll[lang + "_name"]}
          </div>
        </div>

        <div className="settingRow">
          <div
            className="saveStnLine"
            style={{ background: DictM.MtrLines.TCL.colorCode }}
          >
            {DictM.MtrLines.TCL.tc_name + " " + DictM.MtrLines.TCL.en_name}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnCount">
            {langDict.saveStn[lang + "_name"] + ": " + tclSaveStnArray?.length}
          </div>
          {tclSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {tclSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "tcl")}
                  color="primary"
                  size="small"
                />
              ))}
            </div>
          ) : null}
          <div className="saveStnActions">
            {" "}
            {tclSaveStnArray?.length === 0
              ? null
              : langDict.delAll[lang + "_name"]}
          </div>
        </div>

        <div className="settingRow">
          <div
            className="saveStnLine"
            style={{ background: DictM.MtrLines.AEL.colorCode }}
          >
            {DictM.MtrLines.AEL.tc_name + " " + DictM.MtrLines.AEL.en_name}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnCount">
            {langDict.saveStn[lang + "_name"] + ": " + aelSaveStnArray?.length}
          </div>
          {aelSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {aelSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "ael")}
                  color="primary"
                  size="small"
                />
              ))}
            </div>
          ) : null}
          <div className="saveStnActions">
            {" "}
            {aelSaveStnArray?.length === 0
              ? null
              : langDict.delAll[lang + "_name"]}
          </div>
        </div>

        <div className="settingRow">
          <div
            className="saveStnLine"
            style={{ background: DictM.MtrLines.TML.colorCode }}
          >
            {DictM.MtrLines.TML.tc_name + " " + DictM.MtrLines.TML.en_name}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnCount">
            {langDict.saveStn[lang + "_name"] + ": " + tmlSaveStnArray?.length}
          </div>
          {tmlSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {tmlSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "tml")}
                  color="primary"
                  size="small"
                />
              ))}
            </div>
          ) : null}
          <div className="saveStnActions">
            {tmlSaveStnArray?.length === 0
              ? null
              : langDict.delAll[lang + "_name"]}
          </div>
        </div>

        <div className="settingRow">
          <div
            className="saveStnLine"
            style={{ background: DictM.MtrLines.LR.colorCode }}
          >
            {DictM.MtrLines.LR.tc_name + " " + DictM.MtrLines.LR.en_name}
          </div>
        </div>
        <div className="settingRow">
          <div className="saveStnCount">
            {langDict.saveStn[lang + "_name"] + ": " + lrtSaveStnArray?.length}
          </div>
          {lrtSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {lrtSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictL.lrtStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "lrt")}
                  color="primary"
                  size="small"
                />
              ))}
            </div>
          ) : null}
          <div className="saveStnActions">
            {lrtSaveStnArray?.length === 0
              ? null
              : langDict.delAll[lang + "_name"]}
          </div>
        </div>
      </div>
      <div className="settingPart">
        <div className="settingHeading">
          {langDict.dataSource[lang + "_name"]}
        </div>
        <div className="settingRow">
          <a href="https://data.gov.hk" target="_blank">
            資料一線通 DATA.GOV.HK
          </a>
        </div>
        <div className="settingRow">
          <a href="http://www.mtr.com.hk/" target="_blank">
            港鐵 MTR
          </a>
        </div>
      </div>
    </div>
  );
}

export default Settings;
