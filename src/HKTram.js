import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import Dict from "./dict/HKTram_Dict.js";
import HKTramInfo from "./component/HKTramInfo";
import "./css/LRT.css";
import HKTLogo from "./img/HKTramLogo.svg";
import GTranslateOutlinedIcon from "@material-ui/icons/GTranslateOutlined";
import RouteIcon from "@material-ui/icons/LinearScale";

import "./css/HKTram.css";

function LRT() {
  const [station, setStation] = useState("");
  const [bound, setBound] = useState("");
  const [swapLang, setSwapLang] = useState(false);
  const [lang, setLang] = useState(
    window.localStorage.getItem("savedLanguage")
  );
  const storage = window.localStorage;
  const hkTramStnArray = JSON.parse(storage.getItem("HKTramSaveStn"));

  if (swapLang === true) {
    setTimeout(() => {
      if (lang === "en") {
        setLang("tc");
      } else {
        setLang("en");
      }
    }, 8000);
  }

  const handleSwapLangBtn = () => {
    if (!swapLang) {
      setSwapLang(true);
    } else {
      setLang(window.localStorage.getItem("savedLanguage"));
      setSwapLang(false);
    }
  };

  const handleBound = (e) => {
    setStation("");
    setBound(e.target.value);
  };

  const handleStation = (e) => {
    setStation(e.target.value);
  };

  function DisplayStation(props) {
    if (bound === "eastBound") {
      return (
        <FormControl className="stationSelect">
          <InputLabel>{Dict.common.station[lang + "_name"]}</InputLabel>
          <Select
            value={station || ""}
            onChange={handleStation}
            label="Stop"
            fullWidth
          >
            {Object.entries(Dict.hkTramStops)
              .filter(([id, details]) => details.bound === "E")
              .map(([id, name]) => (
                <MenuItem value={id}>
                  {name[lang + "_name"] + " (" + id + ")"}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      );
    } else if (bound === "westBound") {
      return (
        <FormControl className="stationSelect">
          <InputLabel>{Dict.common.station[lang + "_name"]}</InputLabel>
          <Select
            value={station || ""}
            onChange={handleStation}
            label="Stop"
            fullWidth
          >
            {Object.entries(Dict.hkTramStops)
              .filter(([id, details]) => details.bound === "W")
              .map(([id, name]) => (
                <MenuItem value={id}>
                  {name[lang + "_name"] + " (" + id + ")"}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      );
    } else {
      return (
        <FormControl className="stationSelect">
          <InputLabel>{Dict.common.station[lang + "_name"]}</InputLabel>
          <Select
            value={station || ""}
            onChange={handleStation}
            label="Stop"
            fullWidth
          >
            {Object.entries(Dict.hkTramStops).map(([id, name]) => (
              <MenuItem value={id}>
                {name[lang + "_name"] + " (" + id + ")"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
  }

  return (
    <div className="hktram">
      <div className="container">
        <div className="hktram_header">
          <div className="hktram_logo">
            <img src={HKTLogo} alt="Hong Kong Tramways Logo" />
          </div>
          <div className="hktram_title">
            {Dict.common.title[lang + "_name"]}
          </div>
        </div>
        <div className="hktram_topBar">
          <Button
            variant="contained"
            size="small"
            color={swapLang === true ? "secondary" : "primary"}
            className="langButton"
            startIcon={<GTranslateOutlinedIcon />}
            onClick={() => handleSwapLangBtn()}
          >
            <small>{Dict.common.auto[lang + "_name"]}</small>
          </Button>
          <div style={{ flex: "1 0 0" }} />
        </div>
        <div className="hktram_topBar">
          <FormControl className="boundSelect">
            <InputLabel>{Dict.common.bound[lang + "_name"]}</InputLabel>
            <Select
              value={bound || ""}
              onChange={handleBound}
              label="Zone"
              fullWidth
            >
              <MenuItem value="eastBound">
                {Dict.common.eastbound[lang + "_name"]}
              </MenuItem>
              <MenuItem value="westBound">
                {Dict.common.westbound[lang + "_name"]}
              </MenuItem>
            </Select>
          </FormControl>
          <DisplayStation />
        </div>
        <div className="hktram_container">
          {station !== "" ? <HKTramInfo stop={station} lang={lang} /> : ""}
        </div>
        <div className="hktram__info">
          <Alert severity="info">{Dict.common.etaAlert[lang + "_name"]}</Alert>
        </div>
      </div>
    </div>
  );
}

export default LRT;
