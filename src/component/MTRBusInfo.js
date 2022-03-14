import axios from "axios";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  LinearProgress,
  Chip,
  Avatar,
  Dialog,
  Button,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import TextLoop from "react-text-loop";
import "leaflet/dist/leaflet.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Icon } from "leaflet";
import BusPin from "../img/bus-pin.png";

import BusAlertIcon from "@mui/icons-material/BusAlert";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BusLR from "../img/bus_LR.png";
import BusTML from "../img/bus_TML.png";

import MTRBus_Dict from "./MTRBus_Dict";
import LRT_Dict from "./LRT_Dict";
import DictM from "./MTR_Dict";
import LrtInfo from "./LrtInfo";
import MTRETA from "./MTRInfo";

import "../css/MTRBusInfo.css";

function MTRBusInfo({ busRoute, lang }) {
  const apiURL = "https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule";
  var apiLang = "";

  const [isLoading, setIsLoading] = useState(false);
  const [mtrBusData, setMtrBusData] = useState();
  const [expanded, setExpended] = useState("");

  const [lrETADialogOpen, setlrETADialogOpen] = useState(false);
  const [tmlETADialogOpen, settmlETADialogOpen] = useState(false);
  const [busLocationDialogOpen, setBusLocationDialogOpen] = useState(false);

  const [lrETAStation, setLrETAStaion] = useState("1");
  const [tmlETAStation, setTmlETAStaion] = useState("TUM");
  const [currentBusData, setCurrentBusData] = useState();

  //check language
  if (lang === "tc") {
    apiLang = "zh";
  } else {
    apiLang = lang;
  }

  useEffect(() => {
    setIsLoading(true);
    setMtrBusData();
    axios
      .post(apiURL, {
        language: apiLang,
        routeName: busRoute,
      })
      .then((res) => {
        setMtrBusData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [lang, busRoute]);

  useEffect(() => {
    const inteval = setInterval(() => {
      axios
        .post(apiURL, {
          language: apiLang,
          routeName: busRoute,
        })
        .then((res) => {
          setMtrBusData(res.data);
          // if (currentBusData !== null) {
          //   console.log(currentBusData.busId);
          //   var tempArr = res.data.busStop.filter(
          //     ({ busId }) => busId === currentBusData.busId
          //   );
          //   console.log(tempArr);
          // }
        })
        .catch((err) => console.log(err));
    }, 10000);
    return () => clearInterval(inteval);
  }, [lang, busRoute]);

  const handleChange = (panel) => (newExpanded) => {
    if (panel !== expanded) {
      setExpended(newExpanded ? panel : false);
    } else {
      setExpended("");
    }
  };

  const handleCloseDialog = (e) => {
    setlrETADialogOpen(false);
    settmlETADialogOpen(false);
    setBusLocationDialogOpen(false);
  };

  const handleLRDialog = (LRStation) => {
    setLrETAStaion(LRStation);
    setlrETADialogOpen(true);
  };

  const handleTMLDialog = (TMLStation) => {
    setTmlETAStaion(TMLStation);
    settmlETADialogOpen(true);
  };

  const handleBusLocationDialog = (busData) => {
    setCurrentBusData(busData);
    console.log("Clicked>>> ", currentBusData);
    setBusLocationDialogOpen(true);
  };

  //Props
  function MTRBusConnectionsPanel(props) {
    return (
      <div className="mtrBusInfo_ETABoxRow">
        {
          // Displaying Connection Buttons
          MTRBus_Dict.stops[props.busStop].connections?.LR ||
          MTRBus_Dict.stops[props.busStop].connections?.TML ? (
            <div className="mtrBusInfo_busStopConnectionsEtaPanel">
              {MTRBus_Dict.stops[props.busStop].connections?.LR ? (
                <Chip
                  avatar={<Avatar alt="Light Rail Connection" src={BusLR} />}
                  label={MTRBus_Dict.common.BusLReta[lang + "_name"]}
                  color="warning"
                  size="small"
                  onClick={() =>
                    handleLRDialog(
                      MTRBus_Dict.stops[props.busStop].connections?.LR
                    )
                  }
                  sx={{
                    background: "navy",
                    fontWeight: "600",
                  }}
                />
              ) : null}
              {MTRBus_Dict.stops[props.busStop].connections?.TML ? (
                <Chip
                  avatar={<Avatar alt="Tune Ma Line Connection" src={BusTML} />}
                  label={MTRBus_Dict.common.BusTMLeta[lang + "_name"]}
                  color="warning"
                  size="small"
                  onClick={() =>
                    handleTMLDialog(
                      MTRBus_Dict.stops[props.busStop].connections?.TML
                    )
                  }
                  sx={{
                    background: "#9a3b26",
                    fontWeight: "600",
                  }}
                />
              ) : null}
            </div>
          ) : null
        }
      </div>
    );
  }

  function MTRBusETABox(props) {
    return (
      <div className="mtrBusInfo_ETABox">
        <Accordion
          square
          expanded={expanded === props.busStop}
          onChange={handleChange(props.busStop)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={props.busStop}
            id={props.busStop + "-header"}
            className="mtrBusInfo_busStop"
          >
            <Typography>
              <b>{props.index + 1 + ". "}</b>
              <small>{MTRBus_Dict.stops[props.busStop][lang + "_name"]}</small>
            </Typography>
            <div className="mtrBusInfo_busStopConnections">
              {MTRBus_Dict.stops[props.busStop].connections?.LR ? (
                <img src={BusLR} />
              ) : null}
              {MTRBus_Dict.stops[props.busStop].connections?.TML ? (
                <img src={BusTML} />
              ) : null}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mtrBusInfo_ETABoxContainer">
              <MTRBusConnectionsPanel busStop={props.busStop} />
              {mtrBusData?.busStop
                .filter((items) => {
                  return items.busStopId.includes(props.busStop);
                })
                .map((item) =>
                  item.bus.map((mbus, i) => (
                    <div className="mtrBusInfo_ETABoxRow">
                      <div className="mtrBusInfo_BusETA">
                        <div className="mtrBusInfo_BusETA_BusID">
                          {i + 1 + ". "}
                          {mbus.busId !== null ? (
                            mbus.busLocation.latitude !== null &&
                            mbus.busLocation.latitude !== 0 ? (
                              <Chip
                                color="warning"
                                icon={<DirectionsBusIcon />}
                                label={
                                  <TextLoop interval={(5000, 2500, 2500)}>
                                    <div>
                                      <b>
                                        {MTRBus_Dict.common.fleetNum[
                                          lang + "_name"
                                        ] +
                                          " " +
                                          mbus.busId}
                                      </b>
                                    </div>
                                    <div>
                                      {MTRBus_Dict.common.plateNum[
                                        lang + "_name"
                                      ] +
                                        " " +
                                        MTRBus_Dict?.buses[mbus.busId].plateNo}
                                    </div>
                                    <div>
                                      {/* {MTRBus_Dict.common.model[
                                        lang + "_name"
                                      ] +
                                        " " + */}
                                      {MTRBus_Dict?.buses[mbus.busId].type}
                                    </div>
                                  </TextLoop>
                                }
                                size="small"
                                onClick={() => handleBusLocationDialog(mbus)}
                              ></Chip>
                            ) : (
                              <Chip
                                color="info"
                                icon={<DirectionsBusIcon />}
                                label={
                                  <TextLoop interval={(5000, 2500, 2500)}>
                                    <div>
                                      <b>
                                        {MTRBus_Dict.common.fleetNum[
                                          lang + "_name"
                                        ] +
                                          " " +
                                          mbus.busId}
                                      </b>
                                    </div>
                                    <div>
                                      {MTRBus_Dict.common.plateNum[
                                        lang + "_name"
                                      ] +
                                        " " +
                                        MTRBus_Dict?.buses[mbus.busId].plateNo}
                                    </div>
                                    <div>
                                      {/* {MTRBus_Dict.common.model[
                                        lang + "_name"
                                      ] +
                                        " " + */}
                                      {MTRBus_Dict?.buses[mbus.busId].type}
                                    </div>
                                  </TextLoop>
                                }
                                size="small"
                              />
                            )
                          ) : (
                            <Chip
                              color="info"
                              icon={<DirectionsBusIcon />}
                              size="small"
                            />
                          )}
                        </div>
                        <div style={{ flex: "1 0 0" }} />
                        <div className="mtrBusInfo_BusETA_BusTime">
                          {mbus.arrivalTimeText === ""
                            ? mbus.departureTimeText
                            : mbus.arrivalTimeText}
                          <span className="mtrBusInfo_BusETA_BusSch">
                            {mbus.isScheduled === "1"
                              ? MTRBus_Dict.common.scheduleDep[lang + "_name"]
                              : null}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  // Show Contents
  if (mtrBusData?.routeStatusColour === "red") {
    return (
      <div className="mtrbusinfo">
        <div className="mtrBusInfoContainer">
          <div className="mtrBusInfoHeader">
            <div className="mtrBusInfo_busNumber">{busRoute}</div>
            <div className="mtrBusInfo_busRoute">
              {MTRBus_Dict.route[busRoute][lang + "_name"]}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusRemarkTitle">
              <BusAlertIcon />
              {mtrBusData.routeStatusRemarkTitle}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusRemarkContent">
              {mtrBusData.routeStatusRemarkContent}
            </div>
          </div>
          <div className="mtrBusInfoRow">
            <div className="mtrBusInfo_routeStatusTime">
              {mtrBusData.routeStatusTime}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mtrbusinfo">
        {isLoading ? (
          <div className="mtrBusInfoContainer">
            <div className="mtrBusInfoHeader">
              <div className="mtrBusInfo_busNumber">{busRoute}</div>
              <div className="mtrBusInfo_busRoute">
                {MTRBus_Dict.route[busRoute][lang + "_name"]}
              </div>
            </div>
            <LinearProgress
              color="secondary"
              sx={{ backgroundColor: "navy" }}
            />
          </div>
        ) : (
          <div className="mtrBusInfoContainer">
            <div className="mtrBusInfoHeader">
              <div className="mtrBusInfo_busNumber">{busRoute}</div>
              <div className="mtrBusInfo_busRoute">
                {MTRBus_Dict.route[busRoute][lang + "_name"]}
              </div>
            </div>
            {mtrBusData?.routeStatusRemarkTitle !== null ? (
              <div className="mtrBusInfoRow">
                <div className="mtrBusInfo_routeStatusRemarkTitle">
                  <BusAlertIcon size="small" />
                  {mtrBusData?.routeStatusRemarkTitle}
                </div>
              </div>
            ) : null}
            <Tabs>
              <TabList>
                {MTRBus_Dict.route[busRoute].bound.UP ? (
                  <Tab>
                    <small>
                      {MTRBus_Dict.route[busRoute].bound.UP.dest !== "CIR"
                        ? MTRBus_Dict.common.boundFor[lang + "_name"] +
                          MTRBus_Dict.dest[
                            MTRBus_Dict.route[busRoute].bound.UP.dest
                          ][lang + "_name"]
                        : MTRBus_Dict.dest[
                            MTRBus_Dict.route[busRoute].bound.UP.dest
                          ][lang + "_name"]}
                    </small>
                  </Tab>
                ) : null}
                {MTRBus_Dict.route[busRoute].bound.DOWN ? (
                  <Tab>
                    <small>
                      {MTRBus_Dict.route[busRoute].bound.DOWN.dest !== "CIR"
                        ? MTRBus_Dict.common.boundFor[lang + "_name"] +
                          MTRBus_Dict.dest[
                            MTRBus_Dict.route[busRoute].bound.DOWN.dest
                          ][lang + "_name"]
                        : MTRBus_Dict.dest[
                            MTRBus_Dict.route[busRoute].bound.DOWN.dest
                          ][lang + "_name"]}
                    </small>
                  </Tab>
                ) : null}
              </TabList>
              <TabPanel>
                {
                  /* Showing Outbound or Circular Bus Data */
                  MTRBus_Dict.route[busRoute].bound.UP?.stops.map(
                    (bStop, i) => (
                      <MTRBusETABox busStop={bStop} index={i} />
                    )
                  )
                }
              </TabPanel>
              <TabPanel>
                {
                  /* Showing Inbound Bus Data */
                  MTRBus_Dict.route[busRoute].bound.DOWN?.stops.map(
                    (bStop, i) => (
                      <MTRBusETABox busStop={bStop} index={i} />
                    )
                  )
                }
              </TabPanel>
            </Tabs>
            <div className="mtrBusInfoRow">
              <div className="mtrBusInfo_routeStatusTime">
                {MTRBus_Dict.common.lastUpdate[lang + "_name"] +
                  ": " +
                  new Date(
                    Date.parse(mtrBusData?.routeStatusTime.replace(/-/g, "/"))
                  ).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </div>
            </div>
            <div className="mtrBusInfoRow">
              <div className="mtrBusInfo_footerRemarks">
                <Marquee gradientWidth={0} speed={50}>
                  {mtrBusData?.footerRemarks}
                </Marquee>
              </div>
            </div>
            {/* // Light Rail Dialog */}
            <Dialog
              fullWidth="true"
              maxWidth="sm"
              open={lrETADialogOpen}
              onClose={handleCloseDialog}
            >
              <DialogTitle>
                <b>
                  {"[" +
                    LRT_Dict.lrtStations[lrETAStation][lang + "_name"] +
                    "] "}
                </b>
                {MTRBus_Dict.common.BusLReta[lang + "_name"]}
              </DialogTitle>
              <DialogContentText className="mtrBusDialogBox">
                <div>
                  <LrtInfo sid={lrETAStation} lang={lang} mode="fav" />
                </div>
              </DialogContentText>
              <DialogActions>
                <Button onClick={handleCloseDialog}>
                  {MTRBus_Dict.common.close[lang + "_name"]}
                </Button>
              </DialogActions>
            </Dialog>
            {/* // Tuen Ma Line Dialog */}
            <Dialog
              fullWidth="true"
              maxWidth="xl"
              open={tmlETADialogOpen}
              onClose={handleCloseDialog}
            >
              <DialogTitle>
                <b>
                  {"[" +
                    DictM.MtrStations[tmlETAStation][lang + "_name"] +
                    "] "}
                </b>
                {MTRBus_Dict.common.BusTMLeta[lang + "_name"]}
              </DialogTitle>
              <DialogContentText className="mtrBusDialogBox">
                <div>
                  <MTRETA
                    line="TML"
                    station={tmlETAStation}
                    lang={lang}
                    mode="fav"
                  />
                </div>
              </DialogContentText>
              <DialogActions>
                <Button onClick={handleCloseDialog}>
                  {MTRBus_Dict.common.close[lang + "_name"]}
                </Button>
              </DialogActions>
            </Dialog>
            {/* Bus Location Dialog */}
            <Dialog
              fullWidth="true"
              maxWidth="xl"
              open={busLocationDialogOpen}
              onClose={handleCloseDialog}
            >
              <DialogTitle>
                {MTRBus_Dict.common.busLoc[lang + "_name"]}
              </DialogTitle>
              <DialogContent>
                <MapContainer
                  style={{ height: "60vh", width: "100%" }}
                  center={[
                    currentBusData?.busLocation.latitude,
                    currentBusData?.busLocation.longitude,
                  ]}
                  zoom={24}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      currentBusData?.busLocation.latitude,
                      currentBusData?.busLocation.longitude,
                    ]}
                    icon={
                      new Icon({
                        iconUrl: BusPin,
                        iconSize: [45, 45],
                        iconAnchor: [22.5, 45],
                      })
                    }
                  >
                    <Popup className="mapPopup">
                      <p>
                        <Chip
                          color="warning"
                          icon={<DirectionsBusIcon />}
                          label={
                            <TextLoop interval={3000}>
                              <div>
                                {MTRBus_Dict.common.fleetNum[lang + "_name"] +
                                  " " +
                                  currentBusData?.busId}
                              </div>
                              <div>
                                {MTRBus_Dict.common.plateNum[lang + "_name"] +
                                  " " +
                                  MTRBus_Dict.buses[currentBusData?.busId]
                                    ?.plateNo}
                              </div>
                              <div>
                                {MTRBus_Dict.common.busRouteShort[
                                  lang + "_name"
                                ] +
                                  " " +
                                  currentBusData?.lineRef.split("_")[0]}
                              </div>
                            </TextLoop>
                          }
                        />
                      </p>

                      <p> {currentBusData?.busRemark}</p>
                    </Popup>
                  </Marker>
                </MapContainer>
                <DialogContentText className="mtrBusDialogBox">
                  <div>
                    #{currentBusData?.busId}{" "}
                    {MTRBus_Dict.common.busLoc[lang + "_name"]}
                  </div>
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleCloseDialog}>
                  {MTRBus_Dict.common.close[lang + "_name"]}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}

export default MTRBusInfo;
