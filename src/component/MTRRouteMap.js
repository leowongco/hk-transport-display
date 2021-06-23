import React from "react";
import Dict from "./MTR_Dict";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import { Link, useParams } from "react-router-dom";

import "../css/MTRRouteMap.css";

function MTRRouteMap() {
  const { line } = useParams();
  var colorCode = Dict.MtrLines[line].colorCode;

  return (
    <div className="mtrRouteMap">
      <div className="routeTitle">
        {Dict.MtrLines[line].tc_name + " " + Dict.MtrLines[line].en_name}
      </div>
      <div className="routeContent">
        <Timeline align="right">
          {Dict.MtrLines[line].stations.map((station, i, arr) => (
            <Link to={"/mtr/" + line + "/" + station}>
              <TimelineItem>
                {/*<TimelineOppositeContent>
                  <div className="routeInterChangeRows">
                    {Dict.MtrStations[station].interChange?.map(
                      (line, i, arr) => (
                        <div className="routeInterChangeRow">
                          <div className="routeInterChangeRoute">
                            {Dict.MtrLines[line].tc_name}
                            {arr.length - 1 === i ? "" : ","}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                      </TimelineOppositeContent>*/}
                <TimelineSeparator>
                  <TimelineDot style={{ background: colorCode }} />
                  {arr.length - 1 === i ? (
                    ""
                  ) : (
                    <TimelineConnector style={{ background: colorCode }} />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  {Dict.MtrStations[station].tc_name} <br />
                  <small>{Dict.MtrStations[station].en_name}</small>
                </TimelineContent>
              </TimelineItem>
            </Link>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default MTRRouteMap;
