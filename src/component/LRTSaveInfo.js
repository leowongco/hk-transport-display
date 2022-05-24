import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, LinearProgress } from "@mui/material";
import TextLoop from "react-text-loop";
import "../css/LRTSaveInfo.css";

import LRTTrain from "../img/lrt_train.png";

import DictL from "../dict/LRT_Dict";

function LRTSaveInfo({ sid, lang }) {
  const [lrtETA, setLRTEta] = useState();
  const [isLoading, setIsLoading] = useState(false);

  var { fLang } = "";

  const storage = window.localStorage;
  const lrtStationArray = JSON.parse(storage.getItem("LrtSaveStn"));
  if (storage.getItem("LrtSaveStn") === null) {
    var newArray = [];
    storage.setItem("LrtSaveStn", JSON.stringify(newArray));
  }

  if (lang === "tc") {
    fLang = "ch";
  } else {
    fLang = lang;
  }

  useEffect(() => {
    const inteval = setInterval(() => {
      let lrtAPI = `https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id=${sid}`;
      axios
        .get(lrtAPI, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
          },
        })
        .then((res) => {
          setLRTEta(res.data);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, 10000);
    return () => clearInterval(inteval);
  }, [sid]);

  useEffect(() => {
    setIsLoading(true);
    setLRTEta();
    let lrtAPI = `https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id=${sid}`;
    axios
      .get(lrtAPI, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
        },
      })
      .then((res) => {
        setLRTEta(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [sid]);

  function handleTrainCab(trainLength, arrdep) {
    if (arrdep === "D") {
      return (
        <TextLoop interval={2000}>
          <div>
            {Array(trainLength)
              .fill()
              .map((_, i) => (
                <img
                  className="lrtCabArray"
                  src={LRTTrain}
                  alt="Light Rail Cab"
                />
              ))}
          </div>
          <div>{DictL.lrtCommon[lang].depHere}</div>
        </TextLoop>
      );
    } else {
      return Array(trainLength)
        .fill()
        .map((_, i) => (
          <img className="lrtCabArray" src={LRTTrain} alt="Light Rail Cab" />
        ));
    }
  }

  if (lrtETA?.status === 0) {
    return (
      <div className="lrtSaveInfo">
        <Card className="lrt_infoBox">
          <CardContent>
            {isLoading === true ? (
              <LinearProgress color="primary" className="loadingBar" />
            ) : null}
            <p align="center">未有到站時間 No ETA Information</p>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="lrtSaveInfo">
        <Card className="lrt_infoBox">
          <CardContent>
            {isLoading === true ? (
              <LinearProgress color="primary" className="loadingBar" />
            ) : null}

            {lrtETA?.platform_list.map((plat) => (
              <div className="lrtStn_Container">
                <div className="lrtStn_Rows">
                  <div className="lrtStn_header">
                    <div className="lrtStn_Plat">
                      {lang === "tc"
                        ? plat.platform_id + " 號月台"
                        : "Platform " + plat.platform_id}
                    </div>
                    <div style={{ flex: "1 0 0" }} />
                    <div className="lrtStn_hTime">
                      {DictL.lrtCommon[lang].lastUpdate +
                        ": " +
                        new Date(
                          Date.parse(lrtETA?.system_time.replace(/-/g, "/"))
                        ).toLocaleString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                    </div>
                  </div>
                </div>
                {plat.end_service_status === 1 ? (
                  <div className="lrtStn_Rows">
                    <small>{DictL.lrtCommon[lang].end_service}</small>
                  </div>
                ) : null}
                {plat.route_list?.length > 0
                  ? plat.route_list?.map((train) =>
                      train.stop !== 1 ? (
                        <div className="lrtStn_Rows">
                          <div className="lrtStn_RouteContainer">
                            <div className="lrtStn_RouteRow">
                              <div
                                className="lrtStn_RouteNumber"
                                style={{
                                  background:
                                    DictL.lrtRoutes[train.route_no].colorCode,
                                }}
                              >
                                {train.route_no}
                              </div>
                              <div className="lrtStn_RouteDest">
                                {DictL.lrtRoutes[train.route_no].route_name ===
                                null
                                  ? DictL.lrtCommon[lang].to +
                                    train["dest_" + fLang]
                                  : train["dest_" + fLang]}
                              </div>
                            </div>
                            <div className="lrtStn_RouteRow">
                              <div className="lrtStn_RouteCabs">
                                {handleTrainCab(
                                  train.train_length,
                                  train.arrival_departure
                                )}
                              </div>
                              <div className="lrtStn_Time">
                                <small>
                                  {train.time_en === "-"
                                    ? DictL.lrtCommon[lang].dep
                                    : train["time_" + fLang]}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )
                  : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LRTSaveInfo;
