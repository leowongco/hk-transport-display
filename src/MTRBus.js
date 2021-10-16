import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import MTRBus_Dict from "./component/MTRBus_Dict";
import MTRBusInfo from "./component/MTRBusInfo";
import "./css/MTRBus.css";

function MTRBus() {
  const [busNo, setbusNo] = useState("");
  const [lang, setLang] = useState(
    window.localStorage.getItem("savedLanguage")
  );

  const handleBusNumber = (e) => {
    setbusNo(e.target.value);
  };

  return (
    <div className="mtrBus">
      <div className="mtrBus_Container">
        <div className="mtrBus_Header">
          <div className="mtrBus_HeaderTitle">
            {MTRBus_Dict.common.title[lang + "_name"]}
          </div>
        </div>
        <div className="mtrBus_TopBar">
          <FormControl className="BusNumberSelect">
            <InputLabel>
              {MTRBus_Dict.common.busRoute[lang + "_name"]}
            </InputLabel>
            <Select
              value={busNo || ""}
              onChange={handleBusNumber}
              label="BusNumber"
              fullWidth
            >
              {Object.entries(MTRBus_Dict?.route).map(([id, name]) => (
                <MenuItem value={id}>
                  {"["+id + "] " + name[lang + "_name"]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mtrBus_InfoContainer">
          {busNo !== "" ? <MTRBusInfo busRoute={busNo} lang={lang} /> : null}
        </div>
      </div>
    </div>
  );
}

export default MTRBus;
