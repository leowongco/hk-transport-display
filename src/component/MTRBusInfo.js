import axios from "axios";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Link, useParams } from "react-router-dom";

import Chip from "@mui/material/Chip";

import BusAlertIcon from "@mui/icons-material/BusAlert";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import MTRBus_Dict from "./MTRBus_Dict";

import "../css/MTRBusInfo.css";

function MTRBusInfo({ bus }) {
  const { busRoute } = useParams();
  const apiURL = "https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule";
  const [lang, setLang] = useState("tc");
  var apiLang = "";

  const [isLoading, setIsLoading] = useState(false);
  const [mtrBusData, setMtrBusData] = useState();

  useEffect(() => {
    if (window.localStorage.getItem("savedLanguage")) {
      setLang(window.localStorage.getItem("savedLanguage"));
    }
    //check language
    if (lang === "tc") {
      apiLang = "zh";
    } else {
      apiLang = lang;
    }
  }, [lang]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(apiURL, {
        language: apiLang,
        routeName: busRoute,
      })
      .then((res) => {
        setMtrBusData(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [lang, busRoute]);

  useEffect(() => {
    const inteval = setInterval(() => {
      axios
        .post(apiURL, {
          language: apiLang,
          routeName: busRoute,
        })
        .then((res) => {
          setMtrBusData(res.data);
        })
        .catch((err) => console.log(err));
    }, 10000);
    return () => clearInterval(inteval);
  }, [lang, busRoute]);

  // Show Contents
  if (mtrBusData?.routeStatusColour === "red") {
    return (
      <div className="mtrbusinfo">
        <div className="mtrBusInfoContainer">
          <div className="mtrBusInfoHeader">
            <div className="mtrBusInfo_busNumber">{busRoute}</div>
            <div className="mtrBusInfo_busRoute">
              {MTRBus_Dict.route[busRoute][lang + "_name"]}
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
            <div className="mtrBusInfo_busNumber">{busRoute}</div>
            <div className="mtrBusInfo_busRoute">
              {MTRBus_Dict.route[busRoute][lang + "_name"]}
            </div>
          </div>
          {mtrBusData?.routeStatusRemarkTitle !== null ? (
            <div className="mtrBusInfoRow">
              <div className="mtrBusInfo_routeStatusRemarkTitle">
                <BusAlertIcon size="small" />
                {mtrBusData?.routeStatusRemarkTitle}
              </div>
            </div>
          ) : null}
          {mtrBusData?.busStop
            .filter((bStop) => {
              return bStop.isSuspended !== "1";
            })
            .map((bStop, i) => (
              <div className="mtrBusInfo_ETABox">
                <div className="mtrBusInfo_ETABoxRow">
                  <div className="mtrBusInfo_busStop">
                    {MTRBus_Dict.stops[bStop.busStopId] !== undefined
                      ? i +
                        1 +
                        ". " +
                        MTRBus_Dict.stops[bStop.busStopId][lang + "_name"]
                      : bStop.busStopId}

                    {
                      <span>
                        {MTRBus_Dict.dest[
                          bStop.bus[0].lineRef.replace([busRoute + "_"], "")
                        ] !== undefined
                          ? MTRBus_Dict.dest[
                              bStop.bus[0].lineRef.replace([busRoute + "_"], "")
                            ][lang + "_name"]
                          : bStop.bus[0].lineRef}
                      </span>
                    }
                  </div>
                </div>

                {bStop.bus.map((mbus, i) => (
                  <div className="mtrBusInfo_ETABoxRow">
                    <div className="mtrBusInfo_BusETA">
                      <div className="mtrBusInfo_BusETA_BusID">
                        {i + 1 + ". "}
                        {mbus.busId !== null ? (
                          <Chip
                            color="info"
                            icon={<DirectionsBusIcon />}
                            label={"#" + mbus.busId}
                            size="small"
                          />
                        ) : (
                          <Chip
                            color="info"
                            icon={<DirectionsBusIcon />}
                            size="small"
                          />
                        )}
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
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusTime">
              {MTRBus_Dict.common.lastUpdate[lang + "_name"] +
                ": " +
                new Date(
                  Date.parse(mtrBusData?.routeStatusTime.replace(/-/g, "/"))
                ).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_footerRemarks">
              <Marquee gradientWidth={0} speed={50}>
                {mtrBusData?.footerRemarks}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MTRBusInfo;
