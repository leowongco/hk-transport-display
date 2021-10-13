import axios from "axios";
import React, { useState, useEffect } from "react";

import Chip from "@mui/material/Chip";

import BusAlertIcon from "@mui/icons-material/BusAlert";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import MTRBus_Dict from "./MTRBus_Dict";

import "../css/MTRBusInfo.css";

function MTRBusInfo() {
  const apiURL = "https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule";
  const lang = "tc";
  var apiLang = "";
  const busNum = "K12";

  const [isLoading, setIsLoading] = useState(false);
  const [mtrBusData, setMtrBusData] = useState();

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
        setMtrBusData(res.data);
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
          setMtrBusData(res.data);
        })
        .catch((err) => console.log(err));
    }, 10000);
    return () => clearInterval(inteval);
  }, [lang, busNum]);

  // Show Contents
  if (mtrBusData?.routeStatusColour === "red") {
    return (
      <div className="mtrbusinfo">
        <div className="mtrBusInfoContainer">
          <div className="mtrBusInfoHeader">
            <div className="mtrBusInfo_busNumber">{busNum}</div>
            <div className="mtrBusInfo_busRoute">
              {MTRBus_Dict.route[busNum][lang + "_name"]}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusRemarkTitle">
              <BusAlertIcon />
              {mtrBusData.routeStatusRemarkTitle}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusRemarkContent">
              {mtrBusData.routeStatusRemarkContent}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusTime">
              {mtrBusData.routeStatusTime}
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
          {mtrBusData?.busStop.map((bStop) => (
            <div className="mtrBusInfo_ETABox">
              <div className="mtrBusInfo_ETABoxRow">
                <div className="mtrBusInfo_busStop">
                  {MTRBus_Dict.stops[bStop.busStopId][lang + "_name"]}
                  <span>
                    {"(" +
                      MTRBus_Dict.dest[bStop.bus[0].lineRef][lang + "_name"] +
                      ")"}
                  </span>
                </div>
              </div>

              {bStop.bus.map((mbus) => (
                <div className="mtrBusInfo_ETABoxRow">
                  <div className="mtrBusInfo_BusETA">
                    <div className="mtrBusInfo_BusETA_BusID">
                      <Chip
                        color="info"
                        icon={<DirectionsBusIcon />}
                        label={"#" + mbus.busId}
                        size="small"
                      />
                    </div>
                    <div style={{ flex: "1 0 0" }} />
                    <div className="mtrBusInfo_BusETA_BusTime">
                      {mbus.arrivalTimeText === ""
                        ? mbus.departureTimeText
                        : mbus.arrivalTimeText}
                      <span>
                        {mbus.isScheduled === "1"
                          ? MTRBus_Dict.common.scheduleDep[lang + "_name"]
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MTRBusInfo;
