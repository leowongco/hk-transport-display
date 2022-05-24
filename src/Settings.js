import React, { useState, useEffect } from "react";
import "./css/Settings.css";

import {
  Chip,
  ButtonGroup,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Marquee from "react-fast-marquee";

import DictM from "./dict/MTR_Dict.js";
import DictL from "./dict/LRT_Dict.js";
import DictB from "./dict/MTRBus_Dict.js";

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
      tc_name: "刪除所有車站",
      en_name: "Delete All",
    },
    dataSource: {
      tc_name: "資料來源",
      en_name: "Data Sources",
    },
    devSource: {
      tc_name: "開發資源",
      en_name: "Develop Resources",
    },
    confirmTitle: {
      tc_name: "確定?",
      en_name: "Confirm?",
    },
    confirmContent: {
      tc_name: "需要刪除所有車站嗎？動作不能回復。",
      en_name: "Confirm to Delete All Station? Action cannot be recover.",
    },
    emptySaveStn: {
      tc_name: "沒有儲存車站。",
      en_name: "No Saved Station",
    },
    cancelBtn: {
      tc_name: "取消",
      en_name: "Cancel",
    },
    confirmBtn: {
      tc_name: "確定",
      en_name: "Confirm",
    },
    installApp: {
      tc_name: "如何安裝到裝置上",
      en_name: "How to install to device",
    },
    tutorialBtn: {
      tc_name: "教學",
      en_name: "Tutorial",
    },
    mtrstatus: {
      tc_name: "到站時間內頁顯示港鐵車務狀態",
      en_name: "Showing MTR Sataus on MTR ETA Page",
    },
    onBtn: {
      tc_name: "開",
      en_name: "On",
    },
    offBtn: {
      tc_name: "關",
      en_name: "Off",
    },
  };

  const storage = window.localStorage;
  const [ealSaveStnArray, setEalSaveStnArray] = useState();
  const [tklSaveStnArray, setTklSaveStnArray] = useState();
  const [tclSaveStnArray, setTclSaveStnArray] = useState();
  const [aelSaveStnArray, setAelSaveStnArray] = useState();
  const [tmlSaveStnArray, setTmlSaveStnArray] = useState();
  const [lrtSaveStnArray, setLrtSaveStnArray] = useState();
  const [mtrBusSaveStnArray, setMtrBusSaveStnArray] = useState();
  const [lang, setLang] = useState("");
  const [open, setOpen] = useState(false);
  const [delLine, setDelLine] = useState("");
  const [mtrstatus, setMtrStatus] = useState(false);
  const newArray = [];

  useEffect(() => {
    setEalSaveStnArray(JSON.parse(storage.getItem("EAL_SaveStn")));
    setTklSaveStnArray(JSON.parse(storage.getItem("TKL_SaveStn")));
    setTclSaveStnArray(JSON.parse(storage.getItem("TCL_SaveStn")));
    setAelSaveStnArray(JSON.parse(storage.getItem("AEL_SaveStn")));
    setTmlSaveStnArray(JSON.parse(storage.getItem("TML_SaveStn")));
    setLrtSaveStnArray(JSON.parse(storage.getItem("LrtSaveStn")));
    setMtrBusSaveStnArray(JSON.parse(storage.getItem("MTRBus_SaveStn")));
    setLang(storage.getItem("savedLanguage"));
    setMtrStatus(storage.getItem("statusInMtrETA"));
  }, [storage]);

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
      case "eal":
        return setEalSaveStnArray(tempArr);
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
      case "MTRBus":
        return setMtrBusSaveStnArray(tempArr);
      default:
        return null;
    }
  };

  const handleDeleteAll = (line) => {
    setDelLine(line);
    if (!open) {
      setOpen(true);
    } else {
      switch (delLine) {
        case "eal":
          storage.setItem("EAL_SaveStn", JSON.stringify(newArray));
          setTklSaveStnArray(newArray);
          break;
        case "tkl":
          storage.setItem("TKL_SaveStn", JSON.stringify(newArray));
          setTklSaveStnArray(newArray);
          break;
        case "tcl":
          storage.setItem("TCL_SaveStn", JSON.stringify(newArray));
          setTclSaveStnArray(newArray);
          break;
        case "ael":
          storage.setItem("AEL_SaveStn", JSON.stringify(newArray));
          setAelSaveStnArray(newArray);
          break;
        case "tml":
          storage.setItem("TML_SaveStn", JSON.stringify(newArray));
          setTmlSaveStnArray(newArray);
          break;
        case "lrt":
          storage.setItem("LrtSaveStn", newArray);
          setLrtSaveStnArray(newArray);
          break;
        case "MTRBus":
          storage.setItem("MTRBus_SaveStn", JSON.stringify(newArray));
          setMtrBusSaveStnArray(newArray);
          break;
        default:
          return null;
      }
      setOpen(false);
    }
  };

  const handleLangChange = (langChoice) => {
    storage.setItem("savedLanguage", langChoice);
    setLang(langChoice);
  };

  const handleMtrStatusChange = (choice) => {
    storage.setItem("statusInMtrETA", choice);
    setMtrStatus(choice);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="settings">
      <div className="settingPart">
        <div className="settingRow">
          {langDict.languageHead.tc_name + "/" + langDict.languageHead.en_name}
          <div style={{ flex: "1 0 0" }} />
          <ButtonGroup size="small" color="primary" variant="contained">
            <Button
              onClick={() => handleLangChange("tc")}
              disabled={lang === "tc"}
            >
              中文
            </Button>
            <Button
              onClick={() => handleLangChange("en")}
              disabled={lang === "en"}
            >
              English
            </Button>
          </ButtonGroup>
        </div>
        <div className="settingRow">
          {langDict.mtrstatus[lang + "_name"]}
          <div style={{ flex: "1 0 0" }} />
          <ButtonGroup size="small" color="primary" variant="contained">
            <Button
              onClick={() => handleMtrStatusChange(true)}
              disabled={mtrstatus}
            >
              {langDict.onBtn[lang + "_name"]}
            </Button>
            <Button
              onClick={() => handleMtrStatusChange(false)}
              disabled={!mtrstatus}
            >
              {langDict.offBtn[lang + "_name"]}
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Divider />
      <div className="settingPart">
        <div className="settingHeading">
          {langDict.saveStnHeading[lang + "_name"]}
        </div>

        <div className="settingRow">
          <div
            className="saveStnLine"
            style={{ background: DictM.MtrLines.EAL.colorCode }}
          >
            {DictM.MtrLines.EAL.tc_name + " " + DictM.MtrLines.EAL.en_name}
          </div>
        </div>
        <div className="settingRow">
          {ealSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {ealSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "tkl")}
                  color="primary"
                />
              ))}
            </div>
          ) : (
            langDict.emptySaveStn[lang + "_name"]
          )}

          <div className="saveStnActions">
            {" "}
            {ealSaveStnArray?.length === 0 ? null : (
              <Button
                onClick={() => {
                  handleDeleteAll("eal");
                }}
                variant="outlined"
              >
                {langDict.delAll[lang + "_name"]}
              </Button>
            )}
          </div>
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
          {tklSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {tklSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "tcl")}
                  color="primary"
                />
              ))}
            </div>
          ) : (
            langDict.emptySaveStn[lang + "_name"]
          )}
          <div className="saveStnActions">
            {" "}
            {tklSaveStnArray?.length === 0 ? null : (
              <Button
                onClick={() => {
                  handleDeleteAll("tcl");
                }}
                variant="outlined"
              >
                {langDict.delAll[lang + "_name"]}
              </Button>
            )}
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
          {tclSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {tclSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "tcl")}
                  color="primary"
                />
              ))}
            </div>
          ) : (
            langDict.emptySaveStn[lang + "_name"]
          )}
          <div className="saveStnActions">
            {" "}
            {tclSaveStnArray?.length === 0 ? null : (
              <Button
                onClick={() => {
                  handleDeleteAll("tcl");
                }}
                variant="outlined"
              >
                {langDict.delAll[lang + "_name"]}
              </Button>
            )}
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
          {aelSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {aelSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "ael")}
                  color="primary"
                />
              ))}
            </div>
          ) : (
            langDict.emptySaveStn[lang + "_name"]
          )}
          <div className="saveStnActions">
            {" "}
            {aelSaveStnArray?.length === 0 ? null : (
              <Button
                onClick={() => {
                  handleDeleteAll("ael");
                }}
                variant="outlined"
              >
                {langDict.delAll[lang + "_name"]}
              </Button>
            )}
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
          {tmlSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {tmlSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "tml")}
                  color="primary"
                />
              ))}
            </div>
          ) : (
            langDict.emptySaveStn[lang + "_name"]
          )}
          <div className="saveStnActions">
            {tmlSaveStnArray?.length === 0 ? null : (
              <Button
                onClick={() => {
                  handleDeleteAll("tml");
                }}
                variant="outlined"
              >
                {langDict.delAll[lang + "_name"]}
              </Button>
            )}
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
          {lrtSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {lrtSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictL.lrtStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "lrt")}
                  color="primary"
                />
              ))}
            </div>
          ) : (
            langDict.emptySaveStn[lang + "_name"]
          )}
          <div className="saveStnActions">
            {lrtSaveStnArray?.length === 0 ? null : (
              <Button
                onClick={() => {
                  handleDeleteAll("lrt");
                }}
                variant="outlined"
              >
                {langDict.delAll[lang + "_name"]}
              </Button>
            )}
          </div>
        </div>

        {/* MTR Bus */}
        <div className="settingRow">
          <div className="saveStnLine" style={{ background: "navy" }}>
            {DictB.common.mtrBus.tc_name + " " + DictB.common.mtrBus.en_name}
          </div>
        </div>
        <div className="settingRow">
          {mtrBusSaveStnArray?.length > 0 ? (
            <div className="saveStnDetails">
              {mtrBusSaveStnArray?.map((stn, i) => (
                <Chip
                  label={DictM.MtrStations[stn][lang + "_name"]}
                  onDelete={() => handleDelete(stn, "MTRBus")}
                  color="primary"
                />
              ))}
            </div>
          ) : (
            langDict.emptySaveStn[lang + "_name"]
          )}
          <div className="saveStnActions">
            {mtrBusSaveStnArray?.length === 0 ? null : (
              <Button
                onClick={() => {
                  handleDeleteAll("MTRBus");
                }}
                variant="outlined"
              >
                {langDict.delAll[lang + "_name"]}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Divider />
      <div className="settingPart">
        <div className="settingHeading">
          {langDict.dataSource[lang + "_name"]}
        </div>
        <div className="settingRow">
          <a href="https://data.gov.hk/" target="_blank" rel="noreferrer">
            資料一線通 DATA.GOV.HK
          </a>
        </div>
        <div className="settingRow">
          <a href="http://www.mtr.com.hk/" target="_blank" rel="noreferrer">
            港鐵 MTR
          </a>
        </div>
        <div className="settingRow">
          <a href="https://hktramways.com/" target="_blank" rel="noreferrer">
            香港電車 HK Tramways
          </a>
        </div>
        <div className="settingRow">
          <a href="http://www.hko.gov.hk/" target="_blank" rel="noreferrer">
            香港天文台 Hong Kong Observatory
          </a>
        </div>
        <div className="settingRow">
          <a href="https://www.metwarn.com/" target="_blank" rel="noreferrer">
            天氣預警 MET WARN <small>(天氣圖案 Weather Icons)</small>
          </a>
        </div>
      </div>
      <Divider />
      <div className="settingPart">
        <div className="settingHeading">
          {langDict.devSource[lang + "_name"]}
        </div>
        <Marquee gradientWidth={50} pauseOnHover="true" speed={35}>
          <div className="settingRowTicker">
            <a href="https://reactjs.org" target="_blank" rel="noreferrer">
              React.JS
            </a>
          </div>
          <div className="settingRowTicker">
            <a
              href="https://material-ui.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "grey" }}
            >
              Material-UI
            </a>
          </div>
          <div className="settingRowTicker">
            <a href="https://axios-http.com" target="_blank" rel="noreferrer">
              axios
            </a>
          </div>
          <div className="settingRowTicker">
            <a
              href="https://github.com/nashwaan/xml-js"
              target="_blank"
              rel="noreferrer"
              style={{ color: "grey" }}
            >
              xml-js
            </a>
          </div>
          <div className="settingRowTicker">
            <a
              href="https://github.com/braposo/react-text-loop"
              target="_blank"
              rel="noreferrer"
            >
              react-text-loop
            </a>
          </div>
          <div className="settingRowTicker">
            <a
              href="https://www.react-fast-marquee.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "grey" }}
            >
              React FAST Marquee
            </a>
          </div>
          <div className="settingRowTicker">
            <a
              href="https://react-icons.github.io/react-icons"
              target="_blank"
              rel="noreferrer"
            >
              React Icons
            </a>
          </div>
          <div className="settingRowTicker">
            <a
              href="https://github.com/10secondsofcode/react-blink-text"
              target="_blank"
              rel="noreferrer"
              style={{ color: "grey" }}
            >
              react-blink-text
            </a>
          </div>
          <div className="settingRowTicker">
            <a href="https://leafletjs.com" target="_blank" rel="noreferrer">
              Leaflet
            </a>
          </div>
        </Marquee>
      </div>
      <Divider />
      <div className="settingFooter"></div>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle id="confirmation-dialog-title">
          {langDict.confirmTitle[lang + "_name"]}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {langDict.confirmContent[lang + "_name"]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color="secondary">
            {langDict.cancelBtn[lang + "_name"]}
          </Button>
          <Button color="primary" onClick={handleDeleteAll}>
            {" "}
            {langDict.confirmBtn[lang + "_name"]}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Settings;
