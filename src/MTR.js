import React, { useState } from "react";
import MTRETA from "./component/MTRInfo.js";
import Alert from "@material-ui/lab/Alert";
import Dict from "./component/MTR_Dict.js";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./css/MTR.css";

function MTR() {
  const [station, setStation] = useState([]);
  const [line, setLine] = useState([]);
  const [swapLang, setSwapLang] = useState(false);
  const [lang, setLang] = useState("tc");

  if (swapLang == true) {
    setTimeout(() => {
      if (lang == "en") {
        setLang("tc");
      } else {
        setLang("en");
      }
    }, 8000);
  }

  const handleLine = (e) => {
    setStation([]);
    setLine(e.target.value);
  };
  const handleStation = (e) => {
    setStation(e.target.value);
  };
  return (
    <div className="mtr">
      <div className="container">
        <div className="mtr__header">
          <div className="mtr__Logo">{/* Logo */}</div>
          <div className="mtr__title">{/* Title */}</div>
        </div>
        <div className="mtr__functionBar">
          <Button
            variant="contained"
            color="secondary"
            className="langButton"
            onClick={
              swapLang == true
                ? () => setSwapLang(false)
                : () => setSwapLang(true)
            }
          >
            <small>
              {swapLang == true
                ? Dict.Common[lang].autoBtnOn
                : Dict.Common[lang].autoBtnOff}
            </small>
          </Button>
          <div style={{ flex: "1 0 0" }} />
          <Button
            onClick={() => setLang("en")}
            disabled={lang == "en" || swapLang == true}
            variant="contained"
            color="primary"
            className="langButton"
          >
            English
          </Button>
          <Button
            onClick={() => setLang("tc")}
            disabled={lang == "tc" || swapLang == true}
            variant="contained"
            color="primary"
            className="langButton"
          >
            中文
          </Button>
        </div>
        <div className="mtr__functionBar">
          <FormControl className="lineSelect">
            <InputLabel>{Dict.Common[lang].line}</InputLabel>
            <Select
              value={line || ""}
              onChange={handleLine}
              label="Line"
              fullWidth
            >
              {Object.entries(Dict.Line[lang]).map(([id, name]) => (
                <MenuItem value={id}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="stationSelect">
            <InputLabel>{Dict.Common[lang].stn}</InputLabel>
            <Select
              value={station || ""}
              onChange={handleStation}
              label="Station"
              fullWidth
            >
              {Dict.Route[line]?.map((sid) => (
                <MenuItem value={sid}>{Dict?.Station[lang][sid]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mtr__etaContainer">
          {line != "" && station != "" ? (
            <MTRETA line={line} station={station} lang={lang} />
          ) : (
            ""
          )}
        </div>
        <div className="mtr__info">
          <Alert severity="info">{Dict.Common[lang].etaAlert}</Alert>
        </div>
      </div>
    </div>
  );
}

export default MTR;
