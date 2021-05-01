import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import Dict from "./component/LRT_Dict.js";
import LrtInfo from "./component/LrtInfo.js";
import "./css/LRT.css";

function LRT() {
  const [station, setStation] = useState();
  const [lang, setLang] = useState("en");



  const handleStation = (e) => {
    setStation(e.target.value);
  };

  return (
    <div className="lrt">
      <div className="lrt__topBar">
        <FormControl className="stationSelect">
          <InputLabel>Station</InputLabel>
          <Select value={station} onChange={handleStation} label="Station">
            <MenuItem disbaled>Select</MenuItem>
            {Object.entries(Dict.lrtStation[lang]).map(([id, name]) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="lrt__container">
        <Button onClick={()=> setLang("en")}>English</Button>
        <Button onClick={()=> setLang("tc")}>Chinese</Button>
        <Button onClick={()=> setStation(600)}>600</Button>
        <Button onClick={()=> setStation(1)}>1</Button>
        <LrtInfo sid={600} lang={lang} />
      </div>
    </div>
  );
}

export default LRT;
