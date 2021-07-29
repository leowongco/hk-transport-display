import React, { useEffect, useState } from "react";
import axios from "axios";
import convert from "xml-js";

import Dict from "./HKTram_Dict";
import LinearProgress from "@material-ui/core/LinearProgress";

import "../css/HKTramInfo.css";

function HKTramInfo({ stop, lang }) {
  const coreApi = "https://cors.bridged.cc/";
  const tramEATApi = `https://hktramways.com/nextTram/geteat.php?stop_code=${stop}`;
  const [tramEAT, setTramEAT] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTramEAT();
    axios
      .get(`${coreApi}${tramEATApi}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "text-xml",
        },
      })
      .then((res) => {
        var temp = convert.xml2js(res.data, {
          compact: true,
          trim: true,
          ignoreDeclaration: true,
          ignoreInstruction: true,
          ignoreAttributes: false,
          ignoreComment: true,
          ignoreCdata: true,
          ignoreDoctype: true,
        });
        setTramEAT(temp.root.metadata);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [tramEATApi]);

  useEffect(() => {
    const inteval = setInterval(() => {
      axios
        .get(`${coreApi}${tramEATApi}`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "text-xml",
          },
        })
        .then((res) => {
          var temp = convert.xml2js(res.data, {
            compact: true,
            trim: true,
            ignoreDeclaration: true,
            ignoreInstruction: true,
            ignoreAttributes: false,
            ignoreComment: true,
            ignoreCdata: true,
            ignoreDoctype: true,
          });
          setTramEAT(temp.root.metadata);
        })
        .catch((error) => console.log(error));
    }, 10000);
    return () => clearInterval(inteval);
  }, [tramEATApi]);

  return (
    <div className="hktraminfo">
      <div className="hkTramInfo_Row">
        <div className="hkTramInfo_CurrentStop">
          {Dict.hkTramStops[stop][lang + "_name"]}
        </div>
      </div>
      {!isLoading ? (
        tramEAT?.map((tram) => (
          <div className="hkTramInfo_Container">
            <div className="hkTramInfo_Row">
              <div className="hkTramInfo_TramID">
                {"No." + tram._attributes.tram_id}
              </div>
              <div className="hkTramInfo_Dest">
                {tram._attributes["tram_dest_" + lang]}
                {tram._attributes.is_last_tram === "1" ? (
                  <span>{Dict.common.lastTram[lang + "_name"]}</span>
                ) : null}
              </div>
              {tram._attributes.is_arrived === "0" ? (
                <div className="hkTramInfo_ETA">
                  {tram._attributes.arrive_in_second / 60 <= 1
                    ? "1" + Dict.common.min[lang + "_name"]
                    : Math.floor(tram._attributes.arrive_in_second / 60) +
                      Dict.common.min[lang + "_name"]}
                </div>
              ) : (
                <div className="hkTramInfo_ETA">
                  {Dict.common.arrived[lang + "_name"]}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <LinearProgress color="secondary" />
      )}
    </div>
  );
}

export default HKTramInfo;
