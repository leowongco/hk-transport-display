import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Chip } from "@material-ui/core";
import Dict from "./LRT_Dict.js";
import '../css/LRTInfo.css';

function LrtInfo({ sid, lang }) {
  const [lrtETA, setLRTEta] = useState();
  const lrtApi = `https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id=${sid}`;
  let fLang = "";

  if (lang == "tc") {
    fLang = "ch";
  } else {
    fLang = lang;
  }

  useEffect(() => {
    setInterval(() => {
      axios.get(lrtApi).then((res) => setLRTEta(res.data));
    }, 10000);
  }, []);

  useEffect(() => {
    axios.get(lrtApi).then((res) => setLRTEta(res.data));
  }, []);
  return (
    <div className="lrtinfo">
      <Card className="infobox">
        {lrtETA?.platform_list.map((plat) => (
          <CardContent>
            <Chip
              variant="outlined"
              color="primary"
              label={
                /*
                Dict.lrtStation[lang][sid] +
                Dict.lrtCommon[lang].stn +
                ", " +
                Dict.lrtETABox[lang].plat +
                ": " +
                */
                plat.platform_id
              }
            />
            {plat.route_list?.map((train) => (
              <div className="etaBox">
                <div className="lrt__route">
                  <Chip size="small" label={train.route_no} />
                </div>
                <div className="etaBox__row">
                  <small>{train["dest_" + fLang]}</small>
                </div>
                <div style={{ flex: "1 0 0" }} />
                <div className="etaBox__row">
                  <small>{train["time_" + fLang]}</small>
                </div>
                <div className="lrtTrain__length">
                  {Array(train.train_length)
                    .fill()
                    .map((_, i) => "🚋")}
                </div>
              </div>
            ))}
          </CardContent>
        ))}
      </Card>
    </div>
  );
}

export default LrtInfo;
