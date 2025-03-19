import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { Typography } from "@mui/material";

import ReportIcon from "@mui/icons-material/Report";

import "../css/HK_weather.css";

function HK_weather() {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [warningData, setWarningData] = useState([]);
  const [specialWxTips, setSpecialWxTips] = useState([]);
  const [liveTime, setLiveTime] = useState("");
  const lang = window.localStorage.getItem("savedLanguage");

  // Api Links
  const weatherReportApi = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=${lang}`;
  const weatherWarningApi = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=${lang}`;

  //Getting Data every 1 min
  useEffect(() => {
    var countTime = 0;
    const inteval = setInterval(() => {
      setLiveTime(
        new Date().toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      if (countTime % 60 === 0) {
        const weatherReport = axios.get(weatherReportApi);
        const weatherWarning = axios.get(weatherWarningApi);
        axios
          .all([weatherReport, weatherWarning])
          .then(
            axios.spread(function (report, warning) {
              setHumidity(report.data.humidity.data[0].value);
              setTemperature(report.data.temperature.data[1]);
              setWeatherIcon(report.data.icon);
              setSpecialWxTips(report.data.specialWxTips);
              setWarningData(warning.data);
            })
          )
          .catch((error) => console.log(error));
      }
      countTime += 1;
      // console.log(countTime, countTime % 60);
    }, 1000);
    return () => clearInterval(inteval);
  }, []);

  //Loading Warning Icons
  function ShowWarnings(props) {
    let warningArr = [];

    // Typhoon Icons
    if (warningData.WTCSGNL?.code === "TC1") {
      warningArr.push("TC1");
    }
    if (warningData.WTCSGNL?.code === "TC3") {
      warningArr.push("TC3");
    }
    if (warningData.WTCSGNL?.code === "TC8NE") {
      warningArr.push("TC8NE");
    }
    if (warningData.WTCSGNL?.code === "TC8SE") {
      warningArr.push("TC8SE");
    }
    if (warningData.WTCSGNL?.code === "TC8NW") {
      warningArr.push("TC8NW");
    }
    if (warningData.WTCSGNL?.code === "TC8SW") {
      warningArr.push("TC8SW");
    }
    if (warningData.WTCSGNL?.code === "TC9") {
      warningArr.push("TC9");
    }
    if (warningData.WTCSGNL?.code === "TC10") {
      warningArr.push("TC10");
    }
    // Rain Icons
    if (warningData.WRAIN?.code === "WRAINA") {
      warningArr.push("WRAINA");
    }
    if (warningData.WRAIN?.code === "WRAINR") {
      warningArr.push("WRAINR");
    }
    if (warningData.WRAIN?.code === "WRAINB") {
      warningArr.push("WRAINB");
    }
    if (warningData.WTS?.code === "WTS") {
      warningArr.push("WTS");
    }
    if (warningData.WL?.code === "WL") {
      warningArr.push("WL");
    }
    if (warningData.WHOT?.code === "WHOT") {
      warningArr.push("WHOT");
    }
    if (warningData.WCOLD?.code === "WCOLD") {
      warningArr.push("WCOLD");
    }
    if (warningData.WMSGNL?.code === "WMSGNL") {
      warningArr.push("WMSGNL");
    }
    if (warningData.WFNTSA?.code === "WFNTSA") {
      warningArr.push("WFNTSA");
    }
    if (warningData.WFIRE?.code === "WFIREY") {
      warningArr.push("WFIREY");
    }
    if (warningData.WFIRE?.code === "WFIRER") {
      warningArr.push("WFIRER");
    }
    if (warningData.WFROST?.code === "WFROST") {
      warningArr.push("WFROST");
    }
    if (warningData.WTMW?.code === "WTMW") {
      warningArr.push("WTMW");
    }

    return warningArr?.map((warn) => (
      <img
        src={require(`../img/weather-icon/warnings/${warn}.png`)}
        alt="warning icon"
      />
    ));
  }

  return (
    <div className="hk_weather">
      <div className="weatherBanner_Container">
        <div className="weatherBanner_Row">
          {weatherIcon.length !== 0 ? (
            <div className="weatherBanner_WeatherIcon">
              <img
                src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${weatherIcon.slice(
                  -1
                )}.png`}
                alt="weather icon"
              />
            </div>
          ) : null}
          <div className="weatherBanner_WarningIcon">
            <ShowWarnings />
          </div>
          {typeof temperature !== "undefined" && temperature !== "" ? (
            <Typography variant="body1" className="weatherBanner_Temperature">
              {temperature.value + String.fromCharCode(176) + temperature.unit}
            </Typography>
          ) : null}
          {typeof humidity !== "undefined" && humidity !== "" ? (
            <Typography variant="body1" className="weatherBanner_Humidity">
              {humidity + "\u0025"}
            </Typography>
          ) : null}
          <div style={{ flex: "1 0 0" }} />
          <Typography variant="body1" className="currentTime">
            {liveTime}
          </Typography>
        </div>
        {typeof specialWxTips !== "undefined" && specialWxTips !== "" ? (
          <div className="weatherBanner_RowTip">
            <Marquee gradientWidth={0} speed={50} delay={3}>
              {specialWxTips?.map((tip, i) => (
                <Typography
                  variant="body2"
                  className="weatherBanner_SpecialWxTips"
                >
                  {"⚠️ " + (i + 1) + ". " + tip}
                </Typography>
              ))}
            </Marquee>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HK_weather;
