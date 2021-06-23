import React, { useState } from "react";
import SaveMTR from "./component/MTRSaveInfo";
import { Button } from "@material-ui/core";
import "./css/SaveStations.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import DictM from "./component/MTR_Dict.js";

function SaveStations() {
  const [lang, setLang] = useState("tc");
  const [swapLang, setSwapLang] = useState(false);

  const storage = window.localStorage;
  const wrlSaveStnArray = JSON.parse(storage.getItem("WRL_SaveStn"));
  const tklSaveStnArray = JSON.parse(storage.getItem("TKL_SaveStn"));
  const tclSaveStnArray = JSON.parse(storage.getItem("TCL_SaveStn"));
  const aelSaveStnArray = JSON.parse(storage.getItem("AEL_SaveStn"));
  const tmlSaveStnArray = JSON.parse(storage.getItem("TML_SaveStn"));

  if (storage.getItem("WRL_SaveStn") === null) {
    var newArray = [];
    storage.setItem("WRL_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("TKL_SaveStn") === null) {
    var newArray = [];
    storage.setItem("TKL_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("TCL_SaveStn") === null) {
    var newArray = [];
    storage.setItem("TCL_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("AEL_SaveStn") === null) {
    var newArray = [];
    storage.setItem("AEL_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("TML_SaveStn") === null) {
    var newArray = [];
    storage.setItem("TML_SaveStn", JSON.stringify(newArray));
  }

  if (swapLang === true) {
    setTimeout(() => {
      if (lang === "en") {
        setLang("tc");
      } else {
        setLang("en");
      }
    }, 8000);
  }

  return (
    <div className="saveStations">
      <div className="controlBtns">
        <div style={{ flex: "1 0 0" }} />
        <Button
          onClick={() => setLang("en")}
          disabled={lang === "en" || swapLang === true}
          variant="contained"
          color="primary"
          className="langButton"
          size="small"
        >
          English
        </Button>
        <Button
          onClick={() => setLang("tc")}
          disabled={lang === "tc" || swapLang === true}
          variant="contained"
          color="primary"
          className="langButton"
          size="small"
        >
          中文
        </Button>
      </div>
      <div className="saveStnTabs">
        <Tabs>
          <TabList>
            <Tab style={{ backgroundColor: "#9a3b26", color: "white" }}>
              {DictM.MtrLines.TML[lang + "_name"]}
            </Tab>
            <Tab style={{ backgroundColor: "#a40084", color: "white" }}>
              {DictM.MtrLines.WRL[lang + "_name"]}
            </Tab>
            <Tab style={{ backgroundColor: "#6b208b", color: "white" }}>
              {DictM.MtrLines.TKL[lang + "_name"]}
            </Tab>
            <Tab style={{ backgroundColor: "#fe7f1d", color: "white" }}>
              {DictM.MtrLines.TCL[lang + "_name"]}
            </Tab>
            <Tab style={{ backgroundColor: "#1c7670", color: "white" }}>
              {DictM.MtrLines.AEL[lang + "_name"]}
            </Tab>
          </TabList>

          <TabPanel>
            {tmlSaveStnArray?.length > 0 ? (
              tmlSaveStnArray?.map((stn) => (
                <SaveMTR line="TML" station={stn} lang={lang} />
              ))
            ) : (
              <p align="center">
                請先儲存{DictM.MtrLines.TML.tc_name}車站。 Please Save Stations
                for {DictM.MtrLines.TML.en_name}.
              </p>
            )}
          </TabPanel>
          <TabPanel>
            {wrlSaveStnArray?.length > 0 ? (
              wrlSaveStnArray?.map((stn) => (
                <SaveMTR line="WRL" station={stn} lang={lang} />
              ))
            ) : (
              <p align="center">
                請先儲存{DictM.MtrLines.WRL.tc_name}車站。 Please Save Stations
                for {DictM.MtrLines.WRL.en_name}.
              </p>
            )}
          </TabPanel>
          <TabPanel>
            {tklSaveStnArray?.length > 0 ? (
              tklSaveStnArray?.map((stn) => (
                <SaveMTR line="TKL" station={stn} lang={lang} />
              ))
            ) : (
              <p align="center">
                請先儲存{DictM.MtrLines.TKL.tc_name}車站。 Please Save Stations
                for {DictM.MtrLines.TKL.en_name}.
              </p>
            )}
          </TabPanel>
          <TabPanel>
            {tclSaveStnArray?.length > 0 ? (
              tclSaveStnArray?.map((stn) => (
                <SaveMTR line="TCL" station={stn} lang={lang} />
              ))
            ) : (
              <p align="center">
                請先儲存{DictM.MtrLines.TCL.tc_name}車站。 Please Save Stations
                for {DictM.MtrLines.TCL.en_name}.
              </p>
            )}
          </TabPanel>
          <TabPanel>
            {aelSaveStnArray?.length > 0 ? (
              aelSaveStnArray?.map((stn) => (
                <SaveMTR line="AEL" station={stn} lang={lang} />
              ))
            ) : (
              <p align="center">
                請先儲存{DictM.MtrLines.AEL.tc_name}車站。 Please Save Stations
                for {DictM.MtrLines.AEL.en_name}.
              </p>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default SaveStations;
