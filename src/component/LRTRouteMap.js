import React from "react";
import Dict from "./LRT_Dict";

function LRTRouteMap() {
  var colorCode = Dict.lrtRoutes[line].colorCode;
  return (
    <div className="lrtRouteMap"> 
      <div className="optionBar">{/* options */}</div>
      <div className="lrtRouteContainer">
        <div className="lrtRouteRow">
          <div className="lrtRouteNo">{/* LRT Route */}</div>
          <div className="lrtRouteDest">{/* LRT Route */}</div>
        </div>
        <div className="lrtRouteRow">
          <div className="lrtRouteStations">{/* LRT Route Map */}</div>
        </div>
      </div>
    </div>
  );
}

export default LRTRouteMap;
