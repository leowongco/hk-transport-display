import React, { useState } from "react";
import SaveMTR from "./component/MTRSaveInfo";
import { Button } from "@material-ui/core";
import "./css/SaveStations.css";

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
      {tmlSaveStnArray.length > 0
        ? tmlSaveStnArray?.map((stn) => (
            <SaveMTR line="TML" station={stn} lang={lang} />
          ))
        : ""}
      {wrlSaveStnArray.length > 0
        ? wrlSaveStnArray?.map((stn) => (
            <SaveMTR line="WRL" station={stn} lang={lang} />
          ))
        : ""}

      {tklSaveStnArray.length > 0
        ? tklSaveStnArray?.map((stn) => (
            <SaveMTR line="TKL" station={stn} lang={lang} />
          ))
        : ""}

      {tclSaveStnArray.length > 0
        ? tclSaveStnArray?.map((stn) => (
            <SaveMTR line="TCL" station={stn} lang={lang} />
          ))
        : ""}

      {aelSaveStnArray.length > 0
        ? aelSaveStnArray?.map((stn) => (
            <SaveMTR line="AEL" station={stn} lang={lang} />
          ))
        : ""}
    </div>
  );
}

export default SaveStations;
