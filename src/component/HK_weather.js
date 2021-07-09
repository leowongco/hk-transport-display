import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/HK_weather.css";

function HK_weather() {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [warningIcon, setWarningIcon] = useState("");

  useEffect(() => {
    const weatherReportApi =
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
    const weatherWarningApi =
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en";

    axios
      .get(weatherReportApi)
      .then((res) => {
        setHumidity(res.data.humidity.data[0].value);
        setTemperature(res.data.temperature.data[1].value);
        setWeatherIcon(res.data.icon);
      })
      .catch((error) => console.log(error));
    axios
      .get(weatherWarningApi)
      .then((res) => {
        console.log(res.data);
        setWarningIcon();
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
          setTemperature(res.data.temperature.data[1].value);
          setWeatherIcon(res.data.icon);
        })
        .catch((error) => console.log(error));
      axios
        .get(weatherWarningApi)
        .then((res) => {
          console.log(res.data);
          setWarningIcon();
        })
        .catch((error) => console.log(error));
    }, 600000);
    return () => clearInterval(inteval);
  }, []);

  return (
    <div className="hk_weather">
      <div className="weatherBanner_Container">
        <div className="weatherBanner_WeatherIcon">
          {weatherIcon ? (
            <img
              src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${weatherIcon}.png`}
            />
          ) : null}
        </div>
        <div className="weatherBanner_WarningIcon">{/* warning */}</div>
        <div className="weatherBanner_Temperature">
          {temperature ? <span>{temperature}&#8451;</span> : null}
        </div>
        <div className="weatherBanner_Humidity">
          {humidity ? <span>{humidity}%</span> : null}
        </div>
      </div>
    </div>
  );
}

export default HK_weather;
