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
import AEL_Logo from "./img/AEL_Logo.png";
import URL_Logo from "./img/URL_Logo.png";
import WRL_Logo from "./img/WRL_Logo.png";
import TML_Logo from "./img/TML_Logo.png";
import GTranslateOutlinedIcon from "@material-ui/icons/GTranslateOutlined";

function MTR() {
  const [station, setStation] = useState([]);
  const [line, setLine] = useState("");
  const [swapLang, setSwapLang] = useState(false);
  const [lang, setLang] = useState("tc");

  if (swapLang === true) {
    setTimeout(() => {
      if (lang === "en") {
        setLang("tc");
      } else {
        setLang("en");
      }
    }, 8000);
  }

  function setLogo(mtrLine) {
    if (mtrLine === "AEL") {
      return <img src={AEL_Logo} alt="Airport Express Logo" />;
    } else if (mtrLine === "WRL") {
      return <img src={WRL_Logo} alt="West Rail Line Logo" />;
    } else if (mtrLine === "TML") {
      return <img src={TML_Logo} alt="Tuen Ma Line Logo" />;
    } else {
      return <img src={URL_Logo} alt="Urban Lines Logo" />;
    }
  }

  const handleLine = (e) => {
    setStation("");
    setLine(e.target.value);
  };
  const handleStation = (e) => {
    setStation(e.target.value);
  };
  return (
    <div className="mtr">
      <div className="container">
        <div className={"mtr__header" + line}>
          <div className="mtr__Logo">{setLogo(line)}</div>
          <div className="mtr__title">
            {line !== ""
              ? Dict.Line[lang][line]
              : Dict.Common[lang].defaultLine}
            {" " + Dict.Common[lang].eta}
          </div>
        </div>
        <div className="mtr__functionBar">
          <Button
            variant="contained"
            size="small"
            color={swapLang === true ? "secondary" : "primary"}
            className="langButton"
            startIcon={<GTranslateOutlinedIcon />}
            onClick={
              swapLang === true
                ? () => setSwapLang(false)
                : () => setSwapLang(true)
            }
          >
            <small>
              {swapLang === true
                ? Dict.Common[lang].autoBtnOff
                : Dict.Common[lang].autoBtnOn}
            </small>
          </Button>
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
          {line !== "" && station !== "" ? (
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
