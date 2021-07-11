import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/HK_weather.css";

//Weather Warning Icons
import WHOTicon from "../img/weather-icon/warnings/WHOT.png";
import WCOLDicon from "../img/weather-icon/warnings/WCOLD.png";
import WMSGNLicon from "../img/weather-icon/warnings/WMSGNL.png";
import WTSicon from "../img/weather-icon/warnings/WTS.png";
import WLicon from "../img/weather-icon/warnings/WL.png";
import WNFNTSAicon from "../img/weather-icon/warnings/WNFNTSA.png";

function HK_weather() {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [warningData, setWarningData] = useState();

  // Api Links
  const weatherReportApi =
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
  const weatherWarningApi =
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en";
  const weatherReport = axios.get(weatherReportApi);
  const weatherWarning = axios.get(weatherWarningApi);

  //First Get Data
  useEffect(() => {
    axios
      .all([weatherReport, weatherWarning])
      .then(
        axios.spread(function (report, warning) {
          setHumidity(report.data.humidity.data[0].value);
          setTemperature(report.data.temperature.data[1]);
          setWeatherIcon(report.data.icon);

          setWarningData(warning.data);
        })
      )
      .catch((error) => console.log(error));
  }, []);

  //Getting Data every 10 mins
  useEffect(() => {
    const inteval = setInterval(() => {
      axios
        .all([weatherReport, weatherWarning])
        .then(
          axios.spread(function (report, warning) {
            setHumidity(report.data.humidity.data[0].value);
            setTemperature(report.data.temperature.data[1]);
            setWeatherIcon(report.data.icon);

            setWarningData(warning.data);
          })
        )
        .catch((error) => console.log(error));
    }, 600000);
    return () => clearInterval(inteval);
  }, []);

  //Loading Warning Icons
  function ShowWarnings(props) {
    if (warningData.WHOT !== null) {
      return <img src={WHOTicon} />;
    }
    if (warningData.WCOLD !== null) {
      return <img src={WCOLDicon} />;
    }
    if (warningData.WMSGNL !== null) {
      return <img src={WMSGNLicon} />;
    }
    if (warningData.WTS !== null) {
      return <img src={WTSicon} />;
    }
    if (warningData.WL !== null) {
      return <img src={WLicon} />;
    }
    if (warningData.WNFNTSA !== null) {
      return <img src={WNFNTSAicon} />;
    }
  }

  return (
    <div className="hk_weather">
      <div className="weatherBanner_Container">
        {weatherIcon ? (
          <div className="weatherBanner_WeatherIcon">
            <img
              src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${weatherIcon}.png`}
            />
          </div>
        ) : null}
        {warningData ? (
          <div className="weatherBanner_WarningIcon">
            <ShowWarnings />
          </div>
        ) : null}
        {temperature ? (
          <div className="weatherBanner_Temperature">
            {temperature.value + String.fromCharCode(176) + temperature.unit}
          </div>
        ) : null}
        {humidity ? (
          <div className="weatherBanner_Humidity">{humidity + "\u0025"}</div>
        ) : null}
      </div>
    </div>
  );
}

export default HK_weather;
