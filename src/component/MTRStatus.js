import React, { useEffect, useState } from "react";
import axios from "axios";
import convert from "xml-js";

import "../css/MTRStatus.css";
import Dict from "./MTR_Dict.js";
import StatusDict from "./MTRStatus_Dict.js";

function MTRStatus() {
  const [lineStatus, setLineStatus] = useState();
  const [loading, setLoading] = useState(false);

  const removeJsonTextAttribute = function (value, parentElement) {
    try {
      const parentOfParent = parentElement._parent;
      const pOpKeys = Object.keys(parentElement._parent);
      const keyNo = pOpKeys.length;
      const keyName = pOpKeys[keyNo - 1];
      const arrOfKey = parentElement._parent[keyName];
      const arrOfKeyLen = arrOfKey.length;
      if (arrOfKeyLen > 0) {
        const arr = arrOfKey;
        const arrIndex = arrOfKey.length - 1;
        arr[arrIndex] = value;
      } else {
        parentElement._parent[keyName] = value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let coreApi = "https://cors.bridged.cc/";
    let mtrStatusApi = `https://www.mtr.com.hk/alert/ryg_line_status.xml?t=${Date.now()}`;
    setLoading(true);
    axios
      .get(`${coreApi}${mtrStatusApi}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((res) => {
        var temp = convert.xml2js(res.data, {
          compact: true,
          trim: true,
          ignoreDeclaration: true,
          ignoreInstruction: true,
          ignoreAttributes: true,
          ignoreComment: true,
          ignoreCdata: true,
          ignoreDoctype: true,
          textFn: removeJsonTextAttribute,
        });
        setLineStatus(temp.ryg_status.line);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const inteval = setInterval(() => {
      let coreApi = "https://cors.bridged.cc/";
      let mtrStatusApi = `https://www.mtr.com.hk/alert/ryg_line_status.xml?t=${Date.now()}`;
      axios
        .get(`${coreApi}${mtrStatusApi}`, {
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
            ignoreAttributes: true,
            ignoreComment: true,
            ignoreCdata: true,
            ignoreDoctype: true,
            textFn: removeJsonTextAttribute,
          });
          setLineStatus(temp.ryg_status.line);
        })
        .catch((error) => console.log(error));
    }, 180000);
    return () => clearInterval(inteval);
  }, []);

  return (
    <div className="mtrStatus">
      <div className="mtrStatus_Container">
        {!loading ? null : <p>Loading...</p>}
        {lineStatus?.map((mLine) => (
          <div className="mtrStatus_Rows">
            <div
              className="mtrStatus_Line"
              style={{ background: Dict.MtrLines[mLine.line_code].colorCode }}
            >
              {Dict.MtrLines[mLine.line_code].tc_name}
              <br />
              {Dict.MtrLines[mLine.line_code].en_name}
            </div>
            <div className="mtrStatus_Status">
              {StatusDict.StatusLight[mLine.status].tc_name}
              <br />
              {StatusDict.StatusLight[mLine.status].en_name}
            </div>
            {mLine.status !== "red" ||
            mLine.status !== "yellow" ||
            mLine.status !== "pink" ? null : (
              <div className="mtrStatus_DetailBtn">
                <a href={mLine.url_tc} target="_blank">
                  詳情
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MTRStatus;
