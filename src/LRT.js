import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import Dict from "./dict/LRT_Dict.js";
import LrtInfo from "./component/LrtInfo.js";
import "./css/LRT.css";
import LRTLogo from "./img/LR_old.png";
import GTranslateOutlinedIcon from "@material-ui/icons/GTranslateOutlined";
import RouteIcon from "@material-ui/icons/LinearScale";

function LRT() {
  const [station, setStation] = useState("");
  const [lrtZone, setLrtZone] = useState("");
  const [lrtRoute, setLrtRoute] = useState("");
  const [swapLang, setSwapLang] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [lang, setLang] = useState(
    window.localStorage.getItem("savedLanguage")
  );
  const storage = window.localStorage;
  const lrtStationArray = JSON.parse(storage.getItem("LrtSaveStn"));

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

  const handleZone = (e) => {
    setStation("");
    setLrtZone(e.target.value);
    setLrtRoute("");
    setOptionSelected("zone");
  };

  const handleRoute = (e) => {
    setStation("");
    setLrtZone("");
    setLrtRoute(e.target.value);
    setOptionSelected("route");
  };

  const handleStation = (e) => {
    setStation(e.target.value);
  };

  function DisplayStation(props) {
    if (optionSelected === "zone") {
      return (
        <FormControl className="stationSelect">
          <InputLabel>{Dict.lrtCommon[lang].stn}</InputLabel>
          <Select
            value={station || ""}
            onChange={handleStation}
            label="Station"
            fullWidth
          >
            {Dict.lrtZoneStation[lrtZone]?.map((sid) => (
              <MenuItem value={sid}>
                {Dict?.lrtStations[sid][lang + "_name"]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if (optionSelected === "route") {
      return (
        <FormControl className="stationSelect">
          <InputLabel>{Dict.lrtCommon[lang].stn}</InputLabel>
          <Select
            value={station || ""}
            onChange={handleStation}
            label="Station"
            fullWidth
          >
            {Dict.lrtRoutes[lrtRoute].stations?.map((sid) => (
              <MenuItem value={sid}>
                {Dict?.lrtStations[sid][lang + "_name"]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else {
      return (
        <FormControl className="stationSelect">
          <InputLabel>{Dict.lrtCommon[lang].stn}</InputLabel>
          <Select
            value={station || ""}
            onChange={handleStation}
            label="Station"
            fullWidth
          >
            {Object.entries(Dict.lrtStations).map(([id, name]) => (
              <MenuItem value={id}>{name[lang + "_name"]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
  }

  return (
    <div className="lrt">
      <div className="container">
        <div className="lrt__header">
          <div className="lrt__logo">
            <img src={LRTLogo} alt="Light Rail Logo" />
          </div>
          <div className="lrt__title">{Dict.lrtCommon[lang].title}</div>
        </div>
        <div className="lrt__topBar">
          <Button
            variant="contained"
            size="small"
            color={swapLang === true ? "secondary" : "primary"}
            className="langButton"
            startIcon={<GTranslateOutlinedIcon />}
            onClick={() => handleSwapLangBtn()}
          >
            <small>
              {swapLang === true
                ? Dict.lrtCommon[lang].autoBtnOff
                : Dict.lrtCommon[lang].autoBtnOn}
            </small>
          </Button>
          <div style={{ flex: "1 0 0" }} />
          <Button
            variant="contained"
            color="primary"
            className="routeButton"
            size="small"
            startIcon={<RouteIcon />}
            disabled
          >
            {Dict.lrtCommon[lang].routeMap}
          </Button>
        </div>
        <div className="lrt__topBar2">
          <FormControl className="zoneSelect">
            <InputLabel>{Dict.lrtCommon[lang].zone}</InputLabel>
            <Select
              value={lrtZone || ""}
              onChange={handleZone}
              label="Zone"
              fullWidth
            >
              {Object.entries(Dict.lrtZoneNames).map(([id, name]) => (
                <MenuItem value={id}>{name[lang + "_name"]}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="routeSelect">
            <InputLabel>{Dict.lrtCommon[lang].route}</InputLabel>
            <Select
              value={lrtRoute || ""}
              onChange={handleRoute}
              label="Route"
              fullWidth
            >
              {Object.entries(Dict.lrtRoutes).map(([id]) => (
                <MenuItem value={id}>{id}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="lrt__topBar2">
          <DisplayStation />
        </div>
        <div className="lrt__container">
          {station !== "" ? <LrtInfo sid={station} lang={lang} /> : ""}
        </div>
        <div className="lrt__info">
          <Alert severity="info">{Dict.lrtCommon[lang].etaAlert}</Alert>
        </div>
      </div>
    </div>
  );
}

export default LRT;
