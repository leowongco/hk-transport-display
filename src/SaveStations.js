import React, { useState } from "react";
import SaveMTR from "./component/MTRSaveInfo";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
} from "@mui/material";
import "./css/SaveStations.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "react-tabs/style/react-tabs.css";

import DictM from "./component/MTR_Dict.js";
import DictL from "./component/LRT_Dict.js";

import LrtInfo from "./component/LRTSaveInfo";

function SaveStations() {
  const [expanded, setExpended] = useState("");
  const [haveData, setHaveData] = useState(false);

  const handleChange = (panel) => (newExpanded) => {
    if (panel !== expanded) {
      setExpended(newExpanded ? panel : false);
    } else {
      setExpended("");
    }
  };

  const storage = window.localStorage;
  const ealSaveStnArray = JSON.parse(storage.getItem("EAL_SaveStn"));
  const tklSaveStnArray = JSON.parse(storage.getItem("TKL_SaveStn"));
  const tclSaveStnArray = JSON.parse(storage.getItem("TCL_SaveStn"));
  const aelSaveStnArray = JSON.parse(storage.getItem("AEL_SaveStn"));
  const tmlSaveStnArray = JSON.parse(storage.getItem("TML_SaveStn"));
  const lrtSaveStnArray = JSON.parse(storage.getItem("LrtSaveStn"));
  const hkTramStnArray = JSON.parse(storage.getItem("HKTramSaveStn"));
  const lang = storage.getItem("savedLanguage");
  var newArray = [];

  if (storage.getItem("EAL_SaveStn") === null) {
    storage.setItem("EAL_SaveStn", JSON.stringify(newArray));
  }
  if (storage.getItem("TKL_SaveStn") === null) {
    storage.setItem("TKL_SaveStn", JSON.stringify(newArray));
  }
  if (storage.getItem("TCL_SaveStn") === null) {
    storage.setItem("TCL_SaveStn", JSON.stringify(newArray));
  }
  if (storage.getItem("AEL_SaveStn") === null) {
    storage.setItem("AEL_SaveStn", JSON.stringify(newArray));
  }
  if (storage.getItem("TML_SaveStn") === null) {
    storage.setItem("TML_SaveStn", JSON.stringify(newArray));
  }
  if (storage.getItem("LrtSaveStn") === null) {
    storage.setItem("LrtSaveStn", JSON.stringify(newArray));
  }
  if (storage.getItem("HKTramSaveStn") === null) {
    storage.setItem("HKTramSaveStn", JSON.stringify(newArray));
  }
  if (storage.getItem("savedLanguage") === null) {
    storage.setItem("savedLanguage", "tc");
  }
  if (storage.getItem("statusInMtrETA") === null) {
    storage.setItem("statusInMtrETA", true);
  }

  if (
    ealSaveStnArray?.length === 0 &&
    tklSaveStnArray?.length === 0 &&
    tclSaveStnArray?.length === 0 &&
    aelSaveStnArray?.length === 0 &&
    tmlSaveStnArray?.length === 0 &&
    lrtSaveStnArray?.length === 0 &&
    hkTramStnArray?.length === 0
  ) {
    return (
      <div className="saveStations">
        <div className="saveStations_BlankContainer">
          <div className="saveStations_BlankHeading">請先儲存車站</div>
          <div className="saveStations_BlankHeading">
            Please Save Stations First
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="saveStations">
        <div className="controlBtns"></div>
        <div className="saveStnTabs">
          <Tabs>
            <TabList>
              {ealSaveStnArray?.length > 0 ? (
                <Tab
                  style={{
                    backgroundColor: DictM.MtrLines.EAL.colorCode,
                    color: "white",
                  }}
                >
                  {DictM.MtrLines.EAL[lang + "_name"]}
                </Tab>
              ) : null}
              {tmlSaveStnArray?.length > 0 ? (
                <Tab
                  style={{
                    backgroundColor: DictM.MtrLines.TML.colorCode,
                    color: "white",
                  }}
                >
                  {DictM.MtrLines.TML[lang + "_name"]}
                </Tab>
              ) : null}
              {tklSaveStnArray?.length > 0 ? (
                <Tab
                  style={{
                    backgroundColor: DictM.MtrLines.TKL.colorCode,
                    color: "white",
                  }}
                >
                  {DictM.MtrLines.TKL[lang + "_name"]}
                </Tab>
              ) : null}
              {tclSaveStnArray?.length > 0 ? (
                <Tab
                  style={{
                    backgroundColor: DictM.MtrLines.TCL.colorCode,
                    color: "white",
                  }}
                >
                  {DictM.MtrLines.TCL[lang + "_name"]}
                </Tab>
              ) : null}
              {aelSaveStnArray?.length > 0 ? (
                <Tab
                  style={{
                    backgroundColor: DictM.MtrLines.AEL.colorCode,
                    color: "white",
                  }}
                >
                  {DictM.MtrLines.AEL[lang + "_name"]}
                </Tab>
              ) : null}
              {lrtSaveStnArray?.length > 0 ? (
                <Tab style={{ backgroundColor: "#02077b", color: "white" }}>
                  {DictM.MtrLines.LR[lang + "_name"]}
                </Tab>
              ) : null}
            </TabList>

            {/* Tab Content */}
            {ealSaveStnArray?.length > 0 ? (
              <TabPanel>
                <Stack
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="stretch"
                  spacing={1}
                >
                  {ealSaveStnArray?.map((stn) => (
                    <SaveMTR line="EAL" station={stn} lang={lang} />
                  ))}
                </Stack>
              </TabPanel>
            ) : null}
            {tmlSaveStnArray?.length > 0 ? (
              <TabPanel>
                <Stack
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="stretch"
                  spacing={1}
                >
                  {tmlSaveStnArray?.map((stn) => (
                    <SaveMTR line="TML" station={stn} lang={lang} />
                  ))}
                </Stack>
              </TabPanel>
            ) : null}
            {tklSaveStnArray?.length > 0 ? (
              <TabPanel>
                <Stack
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="stretch"
                  spacing={1}
                >
                  {tklSaveStnArray?.map((stn) => (
                    <SaveMTR line="TKL" station={stn} lang={lang} />
                  ))}
                </Stack>
              </TabPanel>
            ) : null}

            {tclSaveStnArray?.length > 0 ? (
              <TabPanel>
                <Stack
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="stretch"
                  spacing={1}
                >
                  {tclSaveStnArray?.map((stn) => (
                    <SaveMTR line="TCL" station={stn} lang={lang} />
                  ))}
                </Stack>
              </TabPanel>
            ) : null}
            {aelSaveStnArray?.length > 0 ? (
              <TabPanel>
                <Stack
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="stretch"
                  spacing={1}
                >
                  {aelSaveStnArray?.map((stn) => (
                    <SaveMTR line="AEL" station={stn} lang={lang} />
                  ))}
                </Stack>
              </TabPanel>
            ) : null}
            {lrtSaveStnArray?.length > 0 ? (
              <TabPanel>
                {lrtSaveStnArray?.map((stn) => (
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
                          <b>{DictL.lrtStations[stn][lang + "_name"]}</b>

                          {" (" +
                            DictL.lrtZoneNames[DictL.lrtStations[stn].zone][
                              lang + "_name"
                            ] +
                            ")"}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="lrtSaveStn__container">
                          <LrtInfo sid={stn} lang={lang} />
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              </TabPanel>
            ) : null}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default SaveStations;
