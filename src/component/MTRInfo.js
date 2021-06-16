import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";
import Dict from "./MTR_Dict.js";
import "../css/MTRInfo.css";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

function MTRInfo({ line, station, lang }) {
  const [mtrEta, setMtrEta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mtrIsDelay, setMtrIsDelay] = useState("");
  const [mtrStatus, setMtrStatus] = useState("");

  /*
  function routeColour(line) {
    switch (line) {
      case "TCL":
        return (document.getElementsByClassName(
          "header__line"
        ).style.backgroundColor = "green");
    }
  }
  */

  useEffect(() => {
    const inteval = setInterval(() => {
      //setIsLoading(true);
      let mtrAPI = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;
      axios
        .get(mtrAPI)
        .then((res) => {
          setMtrEta(res.data.data[line + "-" + station]);
          setMtrIsDelay(res.data.isdelay);
          setMtrStatus(res.data.status);
          //setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, 10000);
    return () => clearInterval(inteval);
  }, [line, station]);

  useEffect(() => {
    setIsLoading(true);
    setMtrEta([]);
    let mtrAPI = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;
    axios
      .get(mtrAPI)
      .then((res) => {
        setMtrIsDelay(res.data.isdelay);
        setMtrStatus(res.data.status);
        setMtrEta(res.data.data[line + "-" + station]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [line, station]);

  if (mtrStatus === "0") {
    return (
      <div className="mtrInfo">
        <Card className="infobox">
          {isLoading === true ? <LinearProgress color="secondary" /> : ""}
          <CardContent>
            <p align="center">未能讀取到站時間，請稍後再嘗試。</p>
            <p align="center">Cannnot Retrieve ETA information</p>
            <p align="center">Please try again later.</p>
            <p align="center">
              <font size="1">
                <i>API Capture Failed</i>
              </font>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  } else if (mtrIsDelay === "Y") {
    return (
      <div className="mtrInfo">
        <Card className="infobox">
          {isLoading === true ? <LinearProgress color="secondary" /> : ""}
          <CardContent>
            {line === "TML" ? (
              <Alert severity="warning">{Dict.Common[lang].tmlInfo}</Alert>
            ) : (
              ""
            )}
            <p align="center">未能讀取到站時間，請稍後再嘗試。</p>
            <p align="center">Cannnot Retrieve ETA information</p>
            <p align="center">Please try again later.</p>
            <p align="center">
              <font size="1">
                <i>API Capture Success, no Data Returned.</i>
              </font>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="mtrInfo">
        <Card className="infobox">
          {isLoading === true ? <LinearProgress color="secondary" /> : ""}
          {mtrEta?.UP != null && mtrEta?.UP.length > 0 ? (
            <CardContent>
              <div className={"mtrstation__header"}>
                <div className="station__name">
                  {Dict.Station[lang][station]}{" "}
                </div>
                <div className="header__line">
                  {" "}
                  {" (" +
                    Dict.Line[lang][line] +
                    " - " +
                    Dict.Common[lang].UP +
                    ")"}
                </div>
              </div>

              {mtrEta.UP?.map((train) => (
                <div className="etaBox">
                  <div className="mtr__dest">
                    {Dict.Station[lang][train.dest]}
                  </div>
                  <div style={{ flex: "1 0 0" }} />
                  <div className={"mtr__plat" + line}>{train.plat}</div>
                  <div className="mtr__time">
                    {train.ttnt < 1
                      ? Dict.Common[lang].dep
                      : train.ttnt + " " + Dict.Common[lang].min}
                  </div>
                </div>
              ))}
            </CardContent>
          ) : (
            ""
          )}

          {mtrEta.DOWN != null && mtrEta.DOWN.length > 0 ? (
            <CardContent>
              <div className={"mtrstation__header"}>
                <div className="station__name">
                  {Dict.Station[lang][station]}
                </div>
                <div className="header__line">
                  {" "}
                  {" (" +
                    Dict.Line[lang][line] +
                    " - " +
                    Dict.Common[lang].DOWN +
                    ")"}
                </div>
              </div>

              {mtrEta.DOWN?.map((train) => (
                <div className="etaBox">
                  <div className="mtr__dest">
                    {Dict.Station[lang][train.dest]}
                  </div>
                  <div style={{ flex: "1 0 0" }} />
                  <div className={"mtr__plat" + line}>{train.plat}</div>
                  <div className="mtr__time">
                    {train.ttnt < 1
                      ? Dict.Common[lang].dep
                      : train.ttnt + " " + Dict.Common[lang].min}
                  </div>
                </div>
              ))}
            </CardContent>
          ) : (
            ""
          )}

          {mtrEta?.sys_time ? (
            <div className="etaBox__mtrfooter">
              {Dict.Common[lang].lastUpdate + ": " + mtrEta?.sys_time}
            </div>
          ) : (
            ""
          )}
        </Card>
      </div>
    );
  }
}

export default MTRInfo;
