import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Button } from "@material-ui/core";
import Dict from "./MTR_Dict.js";
import "../css/MTRInfo.css";
import Save from "@material-ui/icons/StarBorder";
import Saved from "@material-ui/icons/Star";
import LinearProgress from "@material-ui/core/LinearProgress";

function MTRInfo({ line, station, lang, mode }) {
  const [mtrEta, setMtrEta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mtrIsDelay, setMtrIsDelay] = useState("");
  const [mtrStatus, setMtrStatus] = useState("");
  const [stnSaved, setStnSaved] = useState(false);

  const storage = window.localStorage;
  const saveStationsArray = JSON.parse(storage.getItem(line + "_SaveStn"));
  if (storage.getItem(line + "_SaveStn") === null) {
    var newArray = [];
    storage.setItem(line + "_SaveStn", JSON.stringify(newArray));
  }

  const handleLocalStorage = (station) => {
    if (stnSaved === false) {
      saveStationsArray.push(station);
      storage.setItem(line + "_SaveStn", JSON.stringify(saveStationsArray));
      setStnSaved(true);
    } else {
      let findStn = saveStationsArray?.indexOf(station);
      saveStationsArray.splice(findStn, 1);
      storage.setItem(line + "_SaveStn", JSON.stringify(saveStationsArray));
      setStnSaved(false);
    }
  };

  useEffect(() => {
    const inteval = setInterval(() => {
      let mtrAPI = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;
      axios
        .get(mtrAPI, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
          },
        })
        .then((res) => {
          setMtrEta(res.data.data[line + "-" + station]);
          setMtrIsDelay(res.data.isdelay);
          setMtrStatus(res.data.status);
          setIsLoading(false);
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
      .get(mtrAPI, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
        },
      })
      .then((res) => {
        setMtrIsDelay(res.data.isdelay);
        setMtrStatus(res.data.status);
        setMtrEta(res.data.data[line + "-" + station]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    var checkSave = saveStationsArray?.indexOf(station);
    if (checkSave === -1 || saveStationsArray === null) {
      setStnSaved(false);
    } else {
      setStnSaved(true);
    }
  }, [line, station]);

  function NonServiceHours(props) {
    return <p align="center">未有到站時間 No ETA Information</p>;
  }

  if (mtrStatus === "0") {
    return (
      <div className="mtrInfo">
        <Card className="infobox">
          {isLoading === true ? (
            <LinearProgress color="secondary" />
          ) : mode === "fav" ? null : (
            <div className="favouriteBox">
              <Button
                variant="contained"
                color={stnSaved === true ? "" : "primary"}
                size="small"
                endIcon={stnSaved === true ? <Saved /> : <Save />}
                onClick={() => handleLocalStorage(station)}
              >
                {stnSaved === true
                  ? Dict.Common[lang].saveT
                  : Dict.Common[lang].saveF}
              </Button>
            </div>
          )}
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
          {isLoading === true ? (
            <LinearProgress color="secondary" />
          ) : mode === "fav" ? null : (
            <div className="favouriteBox">
              <Button
                variant="contained"
                color={stnSaved === true ? "" : "primary"}
                size="small"
                endIcon={stnSaved === true ? <Saved /> : <Save />}
                onClick={() => handleLocalStorage(station)}
              >
                {stnSaved === true
                  ? Dict.Common[lang].saveT
                  : Dict.Common[lang].saveF}
              </Button>
            </div>
          )}
          <CardContent>
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
          {isLoading === true ? (
            <LinearProgress color="secondary" />
          ) : mode === "fav" ? null : (
            <div className="favouriteBox">
              <Button
                variant="contained"
                color={stnSaved === true ? "" : "primary"}
                size="small"
                endIcon={stnSaved === true ? <Saved /> : <Save />}
                onClick={() => handleLocalStorage(station)}
              >
                {stnSaved === true
                  ? Dict.Common[lang].saveT
                  : Dict.Common[lang].saveF}
              </Button>
            </div>
          )}
          {mtrEta.UP?.length === 0 && mtrEta.DOWN?.length === 0 ? (
            <NonServiceHours />
          ) : null}
          {mtrEta?.UP != null && mtrEta?.UP.length > 0 ? (
            <CardContent>
              <div className={"mtrstation__header" + line}>
                <div className="station__name">
                  {Dict.MtrStations[station][lang + "_name"]}{" "}
                </div>
                <div className="header__line">
                  {" (" +
                    Dict.Common[lang].boundFor +
                    " " +
                    Dict.MtrStations[
                      Dict.MtrLines[line].stations[
                        Dict.MtrLines[line].stations.length - 1
                      ]
                    ][lang + "_name"] +
                    ")"}
                </div>
              </div>

              {mtrEta.UP?.map((train, i) => (
                <div
                  className="etaBox"
                  style={{ backgroundColor: i % 2 === 0 ? "white" : "#aae2fd" }}
                >
                  <div className="mtr__dest">
                    {train.dest === "AWE" && station !== "AIR"
                      ? Dict.MtrStations.AIR[lang + "_name"] +
                        " / " +
                        Dict.MtrStations[train.dest][lang + "_name"]
                      : Dict.MtrStations[train.dest][lang + "_name"]}
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
          ) : null}

          {mtrEta.DOWN != null && mtrEta.DOWN.length > 0 ? (
            <CardContent>
              <div className={"mtrstation__header" + line}>
                <div className="station__name">
                  {Dict.MtrStations[station][lang + "_name"]}
                </div>
                <div className="header__line">
                  {" (" +
                    Dict.Common[lang].boundFor +
                    " " +
                    Dict.MtrStations[Dict.MtrLines[line].stations[0]][
                      lang + "_name"
                    ] +
                    ")"}
                </div>
              </div>

              {mtrEta.DOWN?.map((train, i) => (
                <div
                  className="etaBox"
                  style={{ backgroundColor: i % 2 === 0 ? "white" : "#aae2fd" }}
                >
                  <div className="mtr__dest">
                    {Dict.MtrStations[train.dest][lang + "_name"]}
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
          ) : null}

          {mtrEta?.sys_time ? (
            <div className="etaBox__mtrfooter">
              {Dict.Common[lang].lastUpdate +
                ": " +
                new Date(
                  Date.parse(mtrEta?.sys_time.replace(/-/g, "/"))
                ).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
            </div>
          ) : null}
        </Card>
      </div>
    );
  }
}

export default MTRInfo;
