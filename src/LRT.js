import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ButtonGroup,
} from "@material-ui/core";
import React, { useState } from "react";
import Dict from "./component/LRT_Dict.js";
import LrtInfo from "./component/LrtInfo.js";
import "./css/LRT.css";
import Alert from "@material-ui/lab/Alert";
import LRTLogo from "./img/LR_old.png"

function LRT() {
  const [station, setStation] = useState();
  const [swapLang, setSwapLang] = useState(false);
  const [lang, setLang] = useState("en");

  if (swapLang == true) {
    setTimeout(() => {
      if (lang == "en") {
        setLang("tc");
      } else {
        setLang("en");
      }
    }, 8000);
  }

  const handleStation = (e) => {
    setStation(e.target.value);
  };

  return (
    <div className="lrt">
      <div className="container">
        <div className="lrt__header">
          <div className="lrt__logo">
            <img src={LRTLogo} />
          </div>
          <div className="lrt__title">{Dict.lrtCommon[lang].title}</div>
        </div>
        <div className="lrt__topBar">
          <Alert severity="info">{Dict.lrtCommon[lang].etaAlert}</Alert>
        </div>
        <div className="lrt__topBar">
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
                ? Dict.lrtCommon[lang].autoBtnOn
                : Dict.lrtCommon[lang].autoBtnOff}
            </small>
          </Button>
          <ButtonGroup
            variant="contained"
            color="primary"
            className="langButton"
          >
            <Button
              onClick={() => setLang("en")}
              disabled={lang == "en" || swapLang == true}
            >
              English
            </Button>
            <Button
              onClick={() => setLang("tc")}
              disabled={lang == "tc" || swapLang == true}
            >
              中文
            </Button>
          </ButtonGroup>
        </div>
        <div className="lrt__topBar">
          <FormControl className="stationSelect">
            <InputLabel>{Dict.lrtCommon[lang].stn}</InputLabel>
            <Select
              value={station || ""}
              onChange={handleStation}
              label="Station"
              fullWidth
            >
              {Object.entries(Dict.lrtStation[lang]).map(([id, name]) => (
                <MenuItem value={id}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="lrt__container">
          <LrtInfo sid={station} lang={lang} />
        </div>
      </div>
    </div>
  );
}

export default LRT;
