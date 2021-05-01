import React, { useEffect, useState } from "react";
import axios from "axios";

function HKTramInfo({ stop }) {
  const tramEATApi = `https://hktramways.com/nextTram/geteat.php?stop_code=${stop}`;
  const [tramEAT, setTramEAT] = useState();

  useEffect(() => {
    axios
      .get(tramEATApi, {
		"Content-Type": "application/xml; charset=utf-8"
	 })
      .then((res) => setTramEAT(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="hktraminfo">
      <button onClick={()=> console.log(tramEAT)}>Sad</button>
    </div>
  );
}

export default HKTramInfo;
