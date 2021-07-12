import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/HK_weather.css";

function HK_weather() {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [warningData, setWarningData] = useState([]);

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
    let warningArr = [];

    if (warningData.WHOT) {
      warningArr.push("WHOT");
    }
    if (warningData.WCOLD) {
      warningArr.push("WCOLD");
    }
    if (warningData.WMSGN) {
      warningArr.push("WMSGNL");
    }
    if (warningData.WTS) {
      warningArr.push("WTS");
    }
    if (warningData.WL) {
      warningArr.push("WL");
    }
    if (warningData.WNFNTSA) {
      warningArr.push("WNFNTSA");
    }

    return warningArr?.map((warn) => (
      <img src={require(`../img/weather-icon/warnings/${warn}.png`).default} />
    ));
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
