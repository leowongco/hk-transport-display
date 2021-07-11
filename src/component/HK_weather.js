import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/HK_weather.css";

function HK_weather() {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [warning, setWarning] = useState([]);
  const warningArr = [];

  useEffect(() => {
    const weatherReportApi =
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
    const weatherWarningApi =
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en";

    axios
      .get(weatherReportApi)
      .then((res) => {
        setHumidity(res.data.humidity.data[0].value);
        setTemperature(res.data.temperature.data[1]);
        setWeatherIcon(res.data.icon);
      })
      .catch((error) => console.log(error));
    axios
      .get(weatherWarningApi)
      .then((res) => {
        setWarning(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const inteval = setInterval(() => {
      const weatherReportApi =
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
      const weatherWarningApi =
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en";

      axios
        .get(weatherReportApi)
        .then((res) => {
          setHumidity(res.data.humidity.data[0].value);
          setTemperature(res.data.temperature.data[1]);
          setWeatherIcon(res.data.icon);
        })
        .catch((error) => console.log(error));
      axios
        .get(weatherWarningApi)
        .then((res) => {
          setWarning(res.data);
        })
        .catch((error) => console.log(error));
    }, 600000);
    return () => clearInterval(inteval);
  }, []);

  function ShowWarnings(props) {
    if (warning.WHOT !== null) {
      warningArr.push("vhot");
    }

    return warningArr.map((icon) => (
      <img
        src={`https://www.hko.gov.hk/en/wxinfo/dailywx/images/${icon}.gif`}
      />
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
        <div className="weatherBanner_WarningIcon">
          <ShowWarnings />
        </div>
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
