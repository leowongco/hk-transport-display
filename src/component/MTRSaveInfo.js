import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Divider } from "@material-ui/core";
import DictM from "./MTR_Dict.js";
import "../css/MTRInfo.css";
import "../css/SaveStnInfo.css";
import LinearProgress from "@material-ui/core/LinearProgress";

function MTRSaveInfo({ line, station, lang }) {
  const [mtrEta, setMtrEta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mtrIsDelay, setMtrIsDelay] = useState("");
  const [mtrStatus, setMtrStatus] = useState("");

  const storage = window.localStorage;
  const saveStnArray = JSON.parse(storage.getItem(line + "_SaveStn"));
  if (storage.getItem(line + "_SaveStn") === null) {
    var newArray = [];
    storage.setItem(line + "_SaveStn", JSON.stringify(newArray));
  }

  useEffect(() => {
    const inteval = setInterval(() => {
      let mtrAPI = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;
      axios
        .get(mtrAPI)
        .then((res) => {
          setMtrEta(res.data.data[line + "-" + station]);
          setMtrIsDelay(res.data.isdelay);
          setMtrStatus(res.data.status);
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
      <div className="mtrSaveInfo">
        <Card className="infoBox">
          {isLoading === true ? <LinearProgress color="secondary" /> : ""}
          <CardContent>
            <div className={"mtrstation__header" + line}>
              <div className="station__name">
                {DictM.MtrStations[station][lang + "_name"]}{" "}
              </div>
              <div className="header__line">
                {"(" + DictM.MtrLines[line][lang + "_name"] + ")"}
              </div>
            </div>
            <p align="center">未有到站時間</p>
            <p align="center">No ETA Information</p>
          </CardContent>
        </Card>
      </div>
    );
  } else if (mtrIsDelay === "Y") {
    return (
      <div className="mtrSaveInfo">
        <Card className="infoBox">
          {isLoading === true ? <LinearProgress color="secondary" /> : ""}
          <CardContent>
            <div className={"mtrstation__header" + line}>
              <div className="station__name">
                {DictM.MtrStations[station][lang + "_name"]}{" "}
              </div>
              <div className="header__line">
                {"(" + DictM.MtrLines[line][lang + "_name"] + ")"}
              </div>
            </div>
            <p align="center">未有到站時間</p>
            <p align="center">No ETA Information</p>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="mtrSaveInfo">
        <Card className="infoBox">
          {isLoading === true ? <LinearProgress color="secondary" /> : ""}
          <CardContent>
            <div className={"mtrstation__header" + line}>
              <div className="station__name">
                {DictM.MtrStations[station][lang + "_name"]}{" "}
              </div>
              <div className="header__line">
                {"(" + DictM.MtrLines[line][lang + "_name"] + ")"}
              </div>
            </div>
            <div className="saveStnETA">
              {mtrEta.UP?.map((train) => (
                <div className="saveStnBox">
                  <div className="saveStnBoxRow">
                    <div className="saveStnBox_To">
                      {DictM.Common[lang].to +
                        DictM.MtrStations[train.dest][lang + "_name"]}
                    </div>
                    <div className={"mtr__plat" + line}>{train.plat}</div>
                  </div>
                  <div className="saveStnBoxRow">
                    <div className="saveStnBoxTime">
                      {train.ttnt < 1
                        ? DictM.Common[lang].dep
                        : train.ttnt + DictM.Common[lang].min}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {mtrEta.UP?.length > 0 ? <Divider /> : ""}
            <div className="saveStnETA">
              {mtrEta.DOWN?.map((train) => (
                <div className="saveStnBox">
                  <div className="saveStnBoxRow">
                    <div className="saveStnBox_To">
                      {DictM.Common[lang].to +
                        DictM.MtrStations[train.dest][lang + "_name"]}
                    </div>
                    <div className={"mtr__plat" + line}>{train.plat}</div>
                  </div>
                  <div className="saveStnBoxRow">
                    <div className="saveStnBoxTime">
                      {train.ttnt < 1
                        ? DictM.Common[lang].dep
                        : train.ttnt + DictM.Common[lang].min}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {mtrEta.DOWN?.length > 0 ? <Divider /> : ""}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default MTRSaveInfo;
