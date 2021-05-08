import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Chip } from "@material-ui/core";
import Dict from "./MTR_Dict.js";
import "../css/MTRInfo.css";

function MTRInfo({ line, station, lang }) {
  const [mtrEta, setMtrEta] = useState([]);

  function routeColour(line) {
    switch (line) {
      case "TCL":
        return (document.getElementsByClassName(
          "header__line"
        ).style.backgroundColor = "green");
    }
  }

  useEffect(() => {
    const inteval = setInterval(() => {
      let mtrAPI = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;
      axios
        .get(mtrAPI)
        .then((res) => {
          setMtrEta(res.data.data[line + "-" + station]);
        })
        .catch((error) => console.log(error));
    }, 10000);
    return () => clearInterval(inteval);
  }, [line, station]);

  useEffect(() => {
    setMtrEta([]);
    let mtrAPI = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;
    axios
      .get(mtrAPI)
      .then((res) => {
        setMtrEta(res.data.data[line + "-" + station]);
      })
      .catch((error) => console.log(error));
  }, [line, station]);

  return (
    <div className="mtrInfo">
      <Card className="infobox">
        {mtrEta.UP != null ? (
          <CardContent>
            <div className={"mtrstation__header" + line}>
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
                <div className="mtr__plat">{train.plat}</div>
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

        {mtrEta.DOWN != null ? (
          <CardContent>
            <div className={"mtrstation__header" + line}>
              <div className="station__name">{Dict.Station[lang][station]}</div>
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
                <div className="mtr__plat">{train.plat}</div>
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

export default MTRInfo;
