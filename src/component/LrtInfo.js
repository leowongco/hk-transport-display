import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Chip, IconButton } from "@material-ui/core";
import Dict from "./LRT_Dict.js";
import "../css/LRTInfo.css";
import LRTTrain from "../img/lrt_train.png";
import Save from "@material-ui/icons/StarBorder";
import Saved from "@material-ui/icons/Star";

function LrtInfo({ sid, lang }) {
  const [lrtETA, setLRTEta] = useState();
  const [lrtStnSaved, setLrtStnSaved] = useState(false);
  const storage = window.localStorage;
  const LrtStationArray = storage.getItem("LrtSaveStn");
  var { fLang } = "";

  //storage.clear();

  if (lang === "tc") {
    fLang = "ch";
  } else {
    fLang = lang;
  }

  useEffect(() => {
    if (sid > 0) {
      setLRTEta();
      const inteval = setInterval(() => {
        let lrtAPI = `https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id=${sid}`;
        axios
          .get(lrtAPI)
          .then((res) => setLRTEta(res.data))
          .catch((error) => console.log(error));
      }, 10000);
      return () => clearInterval(inteval);
    }
  }, [sid]);

  useEffect(() => {
    setLRTEta();
    let lrtAPI = `https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id=${sid}`;
    axios
      .get(lrtAPI)
      .then((res) => setLRTEta(res.data))
      .catch((error) => console.log(error));
    var LrtStationArray = storage.getItem("LrtSaveStn");
    var checkSave = LrtStationArray?.indexOf(sid);
    if (checkSave === -1 || LrtStationArray === null) {
      setLrtStnSaved(false);
    } else {
      setLrtStnSaved(true);
    }
  }, [sid]);

  const handleLocalStorage = (sid) => {
    if (lrtStnSaved === false) {
      LrtStationArray.push(sid);
      storage.setItem("LrtSaveStn", LrtStationArray);
      setLrtStnSaved(true);
    } else {
    }
  };

  console.log(LrtStationArray);
  /*

  storage.setItem("LrtSaveStn", sid);
      setLrtStnSaved(true);


  const addFav = (props: any) => {
    let array = favourites;
    let addArray = true;
    array.map((item === props.i){
      array.splice(key , 1);
      addArray = false;
    })
  }
  */

  if (lrtETA?.status == 0) {
    return (
      <div className="lrtinfo">
        <Card className="infobox">
          <CardContent>
            <p>未能讀取到站時間，請稍後再嘗試。</p>
            <p>Cannnot Retrieve ETA information, Please try again later.</p>
          </CardContent>
          <CardContent>
            {lrtETA?.system_time ? (
              <div className="etaBox__footer">
                {Dict.lrtCommon[lang].lastUpdate + ": " + lrtETA?.system_time}
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="lrtinfo">
        <Card className="infobox">
          {/* SaveBox
          <div className="favouriteBox">
            <IconButton color="primary" onClick={() => handleLocalStorage(sid)}>
              {lrtStnSaved === true ? <Saved /> : <Save />}
            </IconButton>
          </div>
          */}

          {lrtETA?.platform_list.map((plat) => (
            <CardContent>
              <div className="station__header">
                <div className="station__platform">{plat.platform_id}</div>
                <div className="station__name"> {Dict.lrtStation.tc[sid]}</div>
                <div className="station__name">
                  <small>{Dict.lrtStation.en[sid]}</small>
                </div>
              </div>
              {plat.end_service_status == 1 ? (
                <div className="etaBox">
                  <div className="lrt__route"></div>
                  <div className="etaBox__row">
                    <small>{Dict.lrtCommon[lang].end_service}</small>
                  </div>
                </div>
              ) : (
                ""
              )}
              {plat.route_list?.map((train) => (
                <div className="etaBox">
                  <div className={"lrt__route_" + train.route_no}>
                    <Chip
                      size="small"
                      className="lrtChip"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        width: "50px",
                      }}
                      label={train.route_no}
                    />
                  </div>
                  <div className="etaBox__row">
                    <small>
                      {train.stop == 1
                        ? Dict.lrtCommon[lang].stopped
                        : train["dest_" + fLang]}
                    </small>
                  </div>
                  <div style={{ flex: "1 0 0" }} />
                  <div className="etaBox__row">
                    <small>{train["time_" + fLang]}</small>
                  </div>
                  <div className="lrtTrain__length">
                    {Array(train.train_length)
                      .fill()
                      .map((_, i) => (
                        <img src={LRTTrain} />
                      ))}
                  </div>
                </div>
              ))}
            </CardContent>
          ))}
          {lrtETA?.system_time ? (
            <div className="etaBox__footer">
              {Dict.lrtCommon[lang].lastUpdate + ": " + lrtETA?.system_time}
            </div>
          ) : (
            ""
          )}
        </Card>
      </div>
    );
  }
}

export default LrtInfo;
