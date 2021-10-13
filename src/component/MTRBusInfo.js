import axios from "axios";
import React, { useState, useEffect } from "react";

import MTRBus_Dict from "./MTRBus_Dict";

import "../css/MTRBusInfo.css";

function MTRBusInfo() {
  const apiURL = "https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule";
  var lang = "tc";
  var apiLang = "";
  var busNum = "K12";

  const [isLoading, setIsLoading] = useState(false);
  const [mtrBuses, setMtrBuses] = useState();

  //check language
  if (lang === "tc") {
    apiLang = "zh";
  } else {
    apiLang = lang;
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(apiURL, {
        language: apiLang,
        routeName: busNum,
      })
      .then((res) => {
        setMtrBuses(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [lang, busNum]);

  useEffect(() => {
    const inteval = setInterval(() => {
      axios
        .post(apiURL, {
          language: apiLang,
          routeName: busNum,
        })
        .then((res) => {
          setMtrBuses(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, 10000);
    return () => clearInterval(inteval);
  }, [lang, busNum]);

  // Show Contents
  if (mtrBuses?.routeStatusColour === "red") {
    return (
      <div className="mtrbusinfo">
        <div className="mtrBusInfoContainer">
          <div className="mtrBusInfoHeader">
            <div className="mtrBusInfo_busNumber">{mtrBuses.routeName}</div>
            <div className="mtrBusInfo_busRoute">
              {MTRBus_Dict.route[busNum][lang + "_name"]}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusRemarkTitle">
              {"⚠️ " + mtrBuses.routeStatusRemarkTitle + " ⚠️"}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusRemarkContent">
              {mtrBuses.routeStatusRemarkContent}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusTime">
              {mtrBuses.routeStatusTime}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mtrbusinfo">
        <div className="mtrBusInfoContainer">
          <div className="mtrBusInfoHeader">
            <div className="mtrBusInfo_busNumber">{busNum}</div>
            <div className="mtrBusInfo_busRoute">
              {MTRBus_Dict.route[busNum][lang + "_name"]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MTRBusInfo;
