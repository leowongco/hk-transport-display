import React, { useState } from "react";
import SaveMTR from "./component/MTRSaveInfo";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@material-ui/core";
import "./css/SaveStations.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "react-tabs/style/react-tabs.css";

import DictM from "./component/MTR_Dict.js";
import DictL from "./component/LRT_Dict.js";

import LrtInfo from "./component/LrtInfo.js";

function SaveStations() {
  const [lang, setLang] = useState("tc");
  const [swapLang, setSwapLang] = useState(false);
  const [expanded, setExpended] = useState("");

  const handleChange = (panel) => (newExpanded) => {
    if (panel != expanded) {
      setExpended(newExpanded ? panel : false);
    } else {
      setExpended("");
    }
  };

  const storage = window.localStorage;
  const wrlSaveStnArray = JSON.parse(storage.getItem("WRL_SaveStn"));
  const tklSaveStnArray = JSON.parse(storage.getItem("TKL_SaveStn"));
  const tclSaveStnArray = JSON.parse(storage.getItem("TCL_SaveStn"));
  const aelSaveStnArray = JSON.parse(storage.getItem("AEL_SaveStn"));
  const tmlSaveStnArray = JSON.parse(storage.getItem("TML_SaveStn"));
  const lrtSaveStnArray = JSON.parse(storage.getItem("LrtSaveStn"));
  var newArray = [];

  if (storage.getItem("WRL_SaveStn") === null) {
    storage.setItem("WRL_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("TKL_SaveStn") === null) {
    storage.setItem("TKL_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("TCL_SaveStn") === null) {
    storage.setItem("TCL_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("AEL_SaveStn") === null) {
    storage.setItem("AEL_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("TML_SaveStn") === null) {
    storage.setItem("TML_SaveStn", JSON.stringify(newArray));
  } else if (storage.getItem("LrtSaveStn") === null) {
    storage.setItem("LrtSaveStn", JSON.stringify(newArray));
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
            <Tab
              style={{
                backgroundColor: DictM.MtrLines.TML.colorCode,
                color: "white",
              }}
            >
              {DictM.MtrLines.TML[lang + "_name"]}
            </Tab>
            <Tab
              style={{
                backgroundColor: DictM.MtrLines.WRL.colorCode,
                color: "white",
              }}
            >
              {DictM.MtrLines.WRL[lang + "_name"]}
            </Tab>
            <Tab
              style={{
                backgroundColor: DictM.MtrLines.TKL.colorCode,
                color: "white",
              }}
            >
              {DictM.MtrLines.TKL[lang + "_name"]}
            </Tab>
            <Tab
              style={{
                backgroundColor: DictM.MtrLines.TCL.colorCode,
                color: "white",
              }}
            >
              {DictM.MtrLines.TCL[lang + "_name"]}
            </Tab>
            <Tab
              style={{
                backgroundColor: DictM.MtrLines.AEL.colorCode,
                color: "white",
              }}
            >
              {DictM.MtrLines.AEL[lang + "_name"]}
            </Tab>
            <Tab style={{ backgroundColor: "#02077b", color: "white" }}>
              {DictL.lrtCommon[lang].lrt}
            </Tab>
          </TabList>

          <TabPanel>
            {tmlSaveStnArray?.length > 0 ? (
              tmlSaveStnArray?.map((stn) => (
                <SaveMTR line="TML" station={stn} lang={lang} />
              ))
            ) : (
              <div>
                <p align="center">請先儲存{DictM.MtrLines.TML.tc_name}車站。</p>
                <p align="center">
                  {" "}
                  Please Save Station for {DictM.MtrLines.TML.en_name}.
                </p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {wrlSaveStnArray?.length > 0 ? (
              wrlSaveStnArray?.map((stn) => (
                <SaveMTR line="WRL" station={stn} lang={lang} />
              ))
            ) : (
              <div>
                <p align="center">請先儲存{DictM.MtrLines.WRL.tc_name}車站。</p>
                <p align="center">
                  {" "}
                  Please Save Station for {DictM.MtrLines.WRL.en_name}.
                </p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {tklSaveStnArray?.length > 0 ? (
              tklSaveStnArray?.map((stn) => (
                <SaveMTR line="TKL" station={stn} lang={lang} />
              ))
            ) : (
              <div>
                <p align="center">請先儲存{DictM.MtrLines.TKL.tc_name}車站。</p>
                <p align="center">
                  {" "}
                  Please Save Station for {DictM.MtrLines.TKL.en_name}.
                </p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {tclSaveStnArray?.length > 0 ? (
              tclSaveStnArray?.map((stn) => (
                <SaveMTR line="TCL" station={stn} lang={lang} />
              ))
            ) : (
              <div>
                <p align="center">請先儲存{DictM.MtrLines.TCL.tc_name}車站。</p>
                <p align="center">
                  {" "}
                  Please Save Station for {DictM.MtrLines.TCL.en_name}.
                </p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {aelSaveStnArray?.length > 0 ? (
              aelSaveStnArray?.map((stn) => (
                <SaveMTR line="AEL" station={stn} lang={lang} />
              ))
            ) : (
              <div>
                <p align="center">請先儲存{DictM.MtrLines.AEL.tc_name}車站。</p>
                <p align="center">
                  {" "}
                  Please Save Station for {DictM.MtrLines.AEL.en_name}.
                </p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {lrtSaveStnArray?.length > 0 ? (
              lrtSaveStnArray?.map((stn) => (
                <div className="lrtSaveStns">
                  <Accordion
                    square
                    expanded={expanded === stn}
                    onChange={handleChange(stn)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={stn}
                      id={stn + "-header"}
                      className="accordion-header"
                    >
                      <Typography>
                        <b>{DictL.lrtStation[lang][stn]}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="lrtSaveStn__container">
                        <LrtInfo sid={stn} lang={lang} />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))
            ) : (
              <div>
                <p align="center">請先儲存{DictL.lrtCommon.tc.lrt}車站。</p>
                <p align="center">
                  {" "}
                  Please Save Station for {DictL.lrtCommon.en.lrt}.
                </p>
              </div>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default SaveStations;
