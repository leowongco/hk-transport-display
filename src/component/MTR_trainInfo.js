import React, { useEffect, useState } from "react";
import axios from "axios";
import Translation from "./MTR_Dict.js";
import "../css/MTR_trainInfo.css";

function MTR_trainInfo({ line, station }) {
  const [trainSchUp, setTrainSchUp] = useState();
  const [trainSchDown, setTrainSchDown] = useState();
  const mtrStnApi = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`;

  useEffect(() => {
    if (line != null && station != null) {
      setInterval(() => {
        axios
          .get(mtrStnApi)
          .then((res) =>
            setTrainSchDown(res.data.data[line + "-" + station].UP)
          )
          .catch((error) => console.log(error));

        axios
          .get(mtrStnApi)
          .then((res) =>
            setTrainSchUp(res.data.data[line + "-" + station].DOWN)
          )
          .catch((error) => console.log(error));
      }, 1000);
    }
  }, []);

  return (
    <div className="mtr_traininfo">
      <p>Station: {Translation.Station.en[station] + " (" + station + ")"}</p>
      <p>Line: {Translation.Line.en[line] + " (" + line + ")"}</p>

      <div className="display__container">
        <div className="display__row">
          <div className="display__header">
            {/* Header */}
            <div className="weather">Weather Info</div>
            <div style={{ flex: "1 0 0" }} />
            <div className="current__time">
              {new Date().getHours() + ":" + new Date().getMinutes()}
            </div>
          </div>
        </div>
        {trainSchDown?.map((train) => (
          <div className="display__row">
            <div className="train__dest">
              {Translation.Station.en[train.dest]}
            </div>
            <div style={{ flex: "1 0 0" }} />
            <div className="train__plat">{train.plat}</div>
            <div className="train__ttnt">
              {train.ttnt < 1 ? "Arriving" : train.ttnt + " min"}
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}

export default MTR_trainInfo;
