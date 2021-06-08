import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";
import Dict from "./component/LRT_Dict.js";
import LrtInfo from "./component/LrtInfo.js";
import "./css/LRT.css";
import Alert from "@material-ui/lab/Alert";
import LRTLogo from "./img/LR_old.png";
import GTranslateOutlinedIcon from "@material-ui/icons/GTranslateOutlined";

function LRT() {
  const [station, setStation] = useState("");
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
          <Button
            variant="contained"
            color="secondary"
            className="langButton"
            startIcon={<GTranslateOutlinedIcon />}
            onClick={
              swapLang == true
                ? () => setSwapLang(false)
                : () => setSwapLang(true)
            }
          >
            <small>
              {swapLang == true
                ? Dict.lrtCommon[lang].autoBtnOff
                : Dict.lrtCommon[lang].autoBtnOn}
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
          {station != "" ? <LrtInfo sid={station} lang={lang} /> : ""}
        </div>
        <div className="lrt__info">
          <Alert severity="info">{Dict.lrtCommon[lang].etaAlert}</Alert>
        </div>
      </div>
    </div>
  );
}

export default LRT;
