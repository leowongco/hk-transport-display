import React, { useEffect, useState } from "react";
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
import TML_Logo from "./img/TML_Logo.png";
import GTranslateOutlinedIcon from "@material-ui/icons/GTranslateOutlined";
import RouteIcon from "@material-ui/icons/LinearScale";
import { Link, useParams } from "react-router-dom";
import MTRStatus from "./component/MTRStatus.js";

function MTR() {
  const [station, setStation] = useState([]);
  const [line, setLine] = useState("");
  const [swapLang, setSwapLang] = useState(false);
  const [lang, setLang] = useState("tc");
  const { link_Line, link_Station } = useParams();

  useEffect(() => {
    if (link_Line === "l" && link_Station === "s") {
      setLine("");
      setStation("");
      setLang(window.localStorage.getItem("savedLanguage"));
    } else {
      setLine(link_Line);
      setStation(link_Station);
      setLang(window.localStorage.getItem("savedLanguage"));
    }
  }, [link_Line, link_Station]);

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

  function setLogo(mtrLine) {
    if (mtrLine === "AEL") {
      return <img src={AEL_Logo} alt="Airport Express Logo" />;
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
        {/* {line && station ? (
          <div className="mtrStausBar">
            <MTRStatus type="banner" />
          </div>
        ) : null} */}
        <div className={"mtr__header" + line}>
          <div className="mtr__Logo">{setLogo(line)}</div>
          <div className="mtr__title">
            {line !== ""
              ? Dict.MtrLines[line][lang + "_name"]
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
            onClick={() => handleSwapLangBtn()}
          >
            <small>
              {swapLang === true
                ? Dict.Common[lang].autoBtnOff
                : Dict.Common[lang].autoBtnOn}
            </small>
          </Button>
          <div style={{ flex: "1 0 0" }} />
          {line !== "" ? (
            <Link to={"/mRoute/" + line}>
              <Button
                variant="contained"
                color="primary"
                className="routeButton"
                size="small"
                startIcon={<RouteIcon />}
              >
                {Dict.Common[lang].routeMap}
              </Button>
            </Link>
          ) : null}
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
              {Object.entries(Dict.MtrLines)
                .slice(0, 4)
                .map(([line, lineData]) => (
                  <MenuItem value={line}>{lineData[lang + "_name"]}</MenuItem>
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
              {Dict.MtrLines[line]?.stations.map((sid) => (
                <MenuItem value={sid}>
                  {Dict.MtrStations[sid][lang + "_name"]}
                </MenuItem>
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
