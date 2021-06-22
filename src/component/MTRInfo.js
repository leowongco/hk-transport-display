import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Button } from "@material-ui/core";
import Dict from "./MTR_Dict.js";
import "../css/MTRInfo.css";
import Alert from "@material-ui/lab/Alert";
import Save from "@material-ui/icons/StarBorder";
import Saved from "@material-ui/icons/Star";
import LinearProgress from "@material-ui/core/LinearProgress";

function MTRInfo({ line, station, lang }) {
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
          ) : (
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
          ) : (
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
          {isLoading === true ? (
            <LinearProgress color="secondary" />
          ) : (
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
          {mtrEta.UP?.length == 0 && mtrEta.DOWN?.length == 0 ? (
            <NonServiceHours />
          ) : (
            ""
          )}
          {mtrEta?.UP != null && mtrEta?.UP.length > 0 ? (
            <CardContent>
              <div className={"mtrstation__header" + line}>
                <div className="station__name">
                  {Dict.MtrStations[station][lang + "_name"]}{" "}
                </div>
                <div className="header__line">
                  {" "}
                  {" (" +
                    Dict.MtrLines[line][lang + "_name"] +
                    " - " +
                    Dict.Common[lang].UP +
                    ")"}
                </div>
              </div>

              {mtrEta.UP?.map((train) => (
                <div className="etaBox">
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
          ) : (
            ""
          )}

          {mtrEta.DOWN != null && mtrEta.DOWN.length > 0 ? (
            <CardContent>
              <div className={"mtrstation__header" + line}>
                <div className="station__name">
                  {Dict.MtrStations[station][lang + "_name"]}
                </div>
                <div className="header__line">
                  {" "}
                  {" (" +
                    Dict.MtrLines[line][lang + "_name"] +
                    " - " +
                    Dict.Common[lang].DOWN +
                    ")"}
                </div>
              </div>

              {mtrEta.DOWN?.map((train) => (
                <div className="etaBox">
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
