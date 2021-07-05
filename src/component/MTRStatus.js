import React, { useEffect, useState } from "react";
import axios from "axios";
import convert from "xml-js";

function MTRStatus() {
  const [lineStatus, setLineStatus] = useState();

  useEffect(() => {
    let coreApi = "https://cors-anywhere.herokuapp.com/";
    let mtrStatusApi = `https://www.mtr.com.hk/alert/ryg_line_status.xml?_=${Date.now()}`;
    axios
      .get(`${coreApi}${mtrStatusApi}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((res) => {
        let temp = convert.xml2js(res.data, {
          compact: true,
        });
        //setLineStatus(temp.ryg_status);
        console.log(temp.ryg_status);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mtrStatus">
      <div className="mtrStatus_Container">
        <div className="mtrStatus_Rows">
          <div className="mtrStatus_Line"></div>
          <div className="mtrStatus_Status"></div>
        </div>
      </div>
    </div>
  );
}

export default MTRStatus;
