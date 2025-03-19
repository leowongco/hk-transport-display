import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  LinearProgress,
  Container,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import Dict from "../dict/MTR_Dict.js";
import "../css/MTRInfo.css";
import Save from "@material-ui/icons/StarBorder";
import Saved from "@material-ui/icons/Star";

function MTRInfo({ line, station, lang, mode }) {
  const [mtrEta, setMtrEta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mtrIsDelay, setMtrIsDelay] = useState("");
  const [mtrStatus, setMtrStatus] = useState("");
  const [stnSaved, setStnSaved] = useState(false);
  const [mtrError, setMtrError] = useState([]);

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
        .get(mtrAPI)
        .then((res) => {
          if (res.data.status === 0) {
            setMtrStatus(res.data.status);
            setMtrError(res.data.error);
          } else {
            setMtrIsDelay(res.data.isdelay);
            setMtrStatus(res.data.status);
            setMtrEta(res.data.data[line + "-" + station]);
          }
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
      .get(mtrAPI)
      .then((res) => {
        if (res.data.status === 0) {
          setMtrStatus(res.data.status);
          setMtrError(res.data.error);
        } else {
          setMtrIsDelay(res.data.isdelay);
          setMtrStatus(res.data.status);
          setMtrEta(res.data.data[line + "-" + station]);
        }
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
    return (
      <Alert variant="outlined" severity="warning">
        未有到站時間 No ETA Information
      </Alert>
    );
  }

  function ShowDestationText(line, station, dir) {
    switch (line) {
      case "EAL":
        switch (dir) {
          case "up":
            return (
              Dict.MtrStations.LOW[lang + "_name"] +
              "/" +
              Dict.MtrStations.LMC[lang + "_name"]
            );
          case "down":
            return Dict.MtrStations.ADM[lang + "_name"];
        }
      case "TCL":
        switch (dir) {
          case "up":
            return Dict.MtrStations.TUC[lang + "_name"];
          case "down":
            return Dict.MtrStations.HOK[lang + "_name"];
        }
      case "TML":
        switch (dir) {
          case "up":
            return Dict.MtrStations.TUM[lang + "_name"];
          case "down":
            return Dict.MtrStations.WKS[lang + "_name"];
        }
      case "AEL":
        switch (dir) {
          case "up":
            if (station === "AIR" || station === "AWE") {
              return Dict.MtrStations.AWE[lang + "_name"];
            } else {
              return (
                Dict.MtrStations.AIR[lang + "_name"] +
                "/" +
                Dict.MtrStations.AWE[lang + "_name"]
              );
            }
          case "down":
            return Dict.MtrStations.HOK[lang + "_name"];
        }
      case "TKL":
        switch (dir) {
          case "up":
            if (station === "HAH" || station === "POA") {
              return Dict.MtrStations.POA[lang + "_name"];
            } else {
              return (
                Dict.MtrStations.POA[lang + "_name"] +
                "/" +
                Dict.MtrStations.LHP[lang + "_name"]
              );
            }
          case "down":
            return Dict.MtrStations.NOP[lang + "_name"];
        }
      case "SIL":
        switch (dir) {
          case "up":
            return Dict.MtrStations.SOH[lang + "_name"];
          case "down":
            return Dict.MtrStations.ADM[lang + "_name"];
        }
      case "TWL":
        switch (dir) {
          case "up":
            return Dict.MtrStations.TSW[lang + "_name"];
          case "down":
            return Dict.MtrStations.CEN[lang + "_name"];
        }
      case "ISL":
        switch (dir) {
          case "up":
            return Dict.MtrStations.CHW[lang + "_name"];
          case "down":
            return Dict.MtrStations.KET[lang + "_name"];
        }
      case "KTL":
        switch (dir) {
          case "up":
            return Dict.MtrStations.TIK[lang + "_name"];
          case "down":
            return Dict.MtrStations.WHA[lang + "_name"];
        }
        case "DRL":
          switch (dir) {
            case "up":
              return Dict.MtrStations.SUN[lang + "_name"];
            case "down":
              return Dict.MtrStations.DIS[lang + "_name"];
          }
      default:
        return null;
    }
  }

  function FillEmptyRows(row) {
    if (row.row < 8) {
      // let rowNeedToFill = 4 - row.row;
      // for (let i = 0; i < rowNeedToFill; i++)
      //   return (
      //     <div
      //       className="etaBox"
      //       style={{ backgroundColor: i % 2 === 0 ? "white" : "#aae2fd" }}
      //     >
      //       {rowNeedToFill}
      //     </div>
      //   );
      return null;
    } else {
      return null;
    }
  }

  function AddToFav(props) {
    if (isLoading) {
      return (
        <LinearProgress
          color="primary"
          sx={{
            background: "darkblue",
            opacity: "50%",
          }}
        />
      );
    } else if (mode === "fav") {
      return null;
    } else {
      return (
        <div className="favouriteBox">
          <Button
            variant="contained"
            size="small"
            endIcon={stnSaved ? <Saved /> : <Save />}
            onClick={() => handleLocalStorage(station)}
          >
            {stnSaved === true
              ? Dict.Common[lang].saveT
              : Dict.Common[lang].saveF}
          </Button>
        </div>
      );
    }
  }

  if (mtrStatus === 0 || mtrEta === null) {
    return (
      <div className="mtrInfo">
        <Card className="infobox">
          <AddToFav />
          <CardContent>
            <Stack spacing={2}>
              {Dict.MtrStations[station][lang + "_rmk"] ? (
                <Alert severity="info">
                  {Dict.MtrStations[station][lang + "_rmk"]}
                </Alert>
              ) : null}
              {mtrError !== null ? (
                <Alert severity="error">
                  {Dict.Error[lang][mtrError.errorCode]}
                </Alert>
              ) : (
                <Container>
                  <p align="center">未能讀取到站時間，請稍後再嘗試。</p>
                  <p align="center">Cannnot Retrieve ETA information</p>
                  <p align="center">Please try again later.</p>
                  <p align="center">
                    <font size="1">
                      <i>API Capture Failed</i>
                    </font>
                  </p>
                </Container>
              )}
            </Stack>
          </CardContent>
        </Card>
      </div>
    );
  } else if (mtrIsDelay === "Y") {
    return (
      <div className="mtrInfo">
        <Card className="infobox">
          <AddToFav />
          <CardContent>
            <Stack spacing={2}>
              {Dict.MtrStations[station][lang + "_rmk"] ? (
                <Alert severity="info">
                  {Dict.MtrStations[station][lang + "_rmk"]}
                </Alert>
              ) : null}
              <p align="center">未能讀取到站時間，請稍後再嘗試。</p>
              <p align="center">Cannnot Retrieve ETA information</p>
              <p align="center">Please try again later.</p>
              <p align="center">
                <font size="1">
                  <i>API Capture Success, no Data Returned.</i>
                </font>
              </p>
            </Stack>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="mtrInfo">
        <Card className="infobox">
          <Stack spacing={1}>
            <AddToFav />
            {Dict.MtrStations[station][lang + "_rmk"] ? (
              <Alert severity="info">
                {Dict.MtrStations[station][lang + "_rmk"]}
              </Alert>
            ) : null}
            {mtrEta.UP?.length === 0 && mtrEta.DOWN?.length === 0 ? (
              <CardContent>
                <NonServiceHours />
              </CardContent>
            ) : null}

            {mtrEta?.UP !== null && mtrEta.UP?.length > 0 ? (
              <CardContent>
                <div className={"mtrstation__header" + line}>
                  <div className="station__name">
                    {Dict.MtrStations[station][lang + "_name"]}{" "}
                  </div>
                  <div className="header__line">
                    {" (" +
                      Dict.Common[lang].boundFor +
                      " " +
                      ShowDestationText(line, station, "up") +
                      ")"}
                  </div>
                </div>

                {mtrEta.UP?.map((train, i) => (
                  <div
                    className="etaBox"
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#aae2fd",
                    }}
                  >
                    <div className="mtr__dest">
                      {train.dest === "AWE" && station !== "AIR"
                        ? Dict.MtrStations.AIR[lang + "_name"] +
                          " / " +
                          Dict.MtrStations[train.dest][lang + "_name"]
                        : Dict.MtrStations[train.dest][lang + "_name"]}
                      {train.route === "RAC"
                        ? " " + Dict.Common[lang].ealRAC
                        : null}
                    </div>
                    <div style={{ flex: "1 0 0" }} />
                    <div className={"mtr__plat" + line}>{train.plat}</div>
                    <div className="mtr__time">
                      {train.ttnt < "1" ? (
                        <span>{Dict.Common[lang].dep}</span>
                      ) : train.ttnt === "1" ? (
                        <span>{Dict.Common[lang].arr}</span>
                      ) : (
                        <span>
                          {train.ttnt} <small>{Dict.Common[lang].min}</small>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <FillEmptyRows row={mtrEta.UP.length} />
              </CardContent>
            ) : null}

            {mtrEta.DOWN !== null && mtrEta.DOWN?.length > 0 ? (
              <CardContent>
                <div className={"mtrstation__header" + line}>
                  <div className="station__name">
                    {Dict.MtrStations[station][lang + "_name"]}
                  </div>
                  <div className="header__line">
                    {" (" +
                      Dict.Common[lang].boundFor +
                      " " +
                      ShowDestationText(line, station, "down") +
                      ")"}
                  </div>
                </div>

                {mtrEta.DOWN?.map((train, i) => (
                  <div
                    className="etaBox"
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#aae2fd",
                    }}
                  >
                    <div className="mtr__dest">
                      {Dict.MtrStations[train.dest][lang + "_name"]}
                      {train.route === "RAC"
                        ? " " + Dict.Common[lang].ealRAC
                        : null}
                    </div>
                    <div style={{ flex: "1 0 0" }} />
                    <div className={"mtr__plat" + line}>{train.plat}</div>
                    <div className="mtr__time">
                      {train.ttnt < "1" ? (
                        <span>{Dict.Common[lang].dep}</span>
                      ) : train.ttnt === "1" ? (
                        <span>{Dict.Common[lang].arr}</span>
                      ) : (
                        <span>
                          {train.ttnt} <small>{Dict.Common[lang].min}</small>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <FillEmptyRows row={mtrEta.DOWN.length} />
              </CardContent>
            ) : null}

            {mtrEta?.sys_time ? (
              <div className="etaBox__mtrfooter">
                {Dict.Common[lang].lastUpdate +
                  ": " +
                  new Date(
                    mtrEta.sys_time !== "-"
                      ? Date.parse(mtrEta?.sys_time.replace(/-/g, "/"))
                      : Date.now()
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
          </Stack>
        </Card>
      </div>
    );
  }
}

export default MTRInfo;
