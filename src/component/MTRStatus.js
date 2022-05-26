import React, { useEffect, useState } from "react";
import axios from "axios";
import convert from "xml-js";

import { Alert, AlertTitle } from "@mui/material";
import { CircularProgress, Button } from "@material-ui/core";
import TextLoop from "react-text-loop";
import Marquee from "react-fast-marquee";

import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
// import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
// import RemoveCircleTwoToneIcon from "@material-ui/icons/RemoveCircleTwoTone";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AccessTimeTwoToneIcon from "@material-ui/icons/AccessTimeTwoTone";
import { RiTyphoonFill } from "react-icons/ri";
import RailwayAlertOutlinedIcon from "@mui/icons-material/RailwayAlertOutlined";

import { Text, Typo } from "reactypo";
import { Link } from "react-router-dom";

import "../css/MTRStatus.css";
import Dict from "../dict/MTR_Dict.js";
import StatusDict from "../dict/MTRStatus_Dict.js";
import MTR_Dict from "../dict/MTR_Dict.js";

function MTRStatus({ type, line }) {
  const [lineStatus, setLineStatus] = useState();
  const [loading, setLoading] = useState(false);
  const coreApi = "https://cors.lwp.workers.dev/?";
  const mtrStatusApi = `https://www.mtr.com.hk/alert/ryg_line_status.xml?t=${Date.now()}`;
  const lang = window.localStorage.getItem("savedLanguage");

  const removeJsonTextAttribute = function (value, parentElement) {
    try {
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
    setLoading(true);
    axios
      .get(`${coreApi}${mtrStatusApi}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "text-xml",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
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
      axios
        .get(`${coreApi}${mtrStatusApi}`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "text-xml",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
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

  function StatusIcon(status) {
    switch (status) {
      case "green":
        return <CheckCircleTwoToneIcon style={{ color: "green" }} />;
      case "pink":
      case "yellow":
        return <RailwayAlertIcon style={{ color: "#dbd51f" }} />;
      case "red":
        return <RailwayAlertIcon style={{ color: "red" }} />;
      case "typhoon":
        return <RiTyphoonFill style={{ color: "#1a15bd" }} />;
      default:
        return <AccessTimeTwoToneIcon style={{ color: "grey" }} />;
    }
  }

  function MTRBlankStatus(props) {
    return (
      <div className="mtrBlankStatus">
        <div className="mtrBlankStatus_text">
          <Typo>
            <Text pace={50}>港鐵車務狀況</Text>
          </Typo>
        </div>
        <div className="mtrBlankStatus_circle">
          <CircularProgress color="secondary" size={30} />
        </div>
        <div className="mtrBlankStatus_text">
          <Typo>
            <Text pace={50}>MTR Service Status</Text>
          </Typo>
        </div>
      </div>
    );
  }

  if (type === "banner") {
    var goodServices = lineStatus?.every((item) => {
      return item.status === "green" || item.status === "grey";
    });

    var nonServiceHours =
      lineStatus?.filter((item) => item.status === "grey").length === 10;

    var showBadServicesLines = lineStatus
      ?.filter(
        (item) =>
          item.status === "red" ||
          item.status === "pink" ||
          item.status === "yellow"
      )
      .map((line) => line.line_code);

    var badServices = lineStatus?.some((item) => {
      return (
        item.status === "yellow" ||
        item.status === "pink" ||
        item.status === "red"
      );
    });

    var typhoonServices = lineStatus?.some((item) => {
      return item.status === "typhoon";
    });

    var showtyphoonServicesLines = lineStatus
      ?.filter((item) => item.status === "typhoon")
      .map((line) => line.line_code);

    return (
      <div className="mtrStatus">
        {!loading ? (
          <div className="mtrStatus_BannerContainer">
            <div className="mtrStatus_BannerRow">
              {typhoonServices ? (
                <Alert
                  icon={<RailwayAlertOutlinedIcon fontSize="inherit" />}
                  severity="warning"
                  action={
                    <Link to="/mtr-status">
                      <Button color="default">
                        <KeyboardDoubleArrowRightIcon />
                      </Button>
                    </Link>
                  }
                >
                  <AlertTitle>
                    <RiTyphoonFill fontSize="inherit" />{" "}
                    <b>{lang === "tc" ? "熱帶氣旋" : "Tropical Cyclone"}</b>
                  </AlertTitle>
                  <Marquee
                    gradientWidth="0"
                    style={{ margin: "0px auto", width: "70vw" }}
                    speed={50}
                    delay={3}
                  >
                    <span>
                      {lang === "tc"
                        ? "\xa0\xa0受影響路線:" +
                          showtyphoonServicesLines?.map((line) => {
                            return (
                              " " + MTR_Dict.MtrLines[line][lang + "_name"]
                            );
                          }) +
                          ", 請及早計劃行程。"
                        : "\xa0\xa0Affected Lines:" +
                          showtyphoonServicesLines?.map((line) => {
                            return (
                              " " + MTR_Dict.MtrLines[line][lang + "_name"]
                            );
                          }) +
                          ", please plan your journey accordingly. "}
                    </span>
                  </Marquee>
                </Alert>
              ) : null}
              {badServices ? (
                <Alert
                  severity="error"
                  icon={<RailwayAlertOutlinedIcon fontSize="inherit" />}
                  action={
                    <Link to="/mtr-status">
                      <Button color="default">
                        <KeyboardDoubleArrowRightIcon />
                      </Button>
                    </Link>
                  }
                >
                  <AlertTitle>
                    <b>
                      {lang === "tc"
                        ? "港鐵服務延誤/受阻"
                        : "MTR Service Delay/Disruption"}
                    </b>
                  </AlertTitle>

                  <Marquee
                    gradientWidth="0"
                    style={{ margin: "0px auto", width: "70vw" }}
                    speed={50}
                    delay={3}
                  >
                    <span>
                      {lang === "tc"
                        ? "\xa0\xa0受影響路線:" +
                          showBadServicesLines?.map((line) => {
                            return (
                              " " + MTR_Dict.MtrLines[line][lang + "_name"]
                            );
                          }) +
                          ", 請考慮重新計劃行程。"
                        : "\xa0\xa0Affected Lines:" +
                          showBadServicesLines?.map((line) => {
                            return (
                              " " + MTR_Dict.MtrLines[line][lang + "_name"]
                            );
                          }) +
                          ", please plan your journey accordingly. "}
                    </span>
                  </Marquee>
                </Alert>
              ) : null}
              {goodServices ? (
                !nonServiceHours ? (
                  <Alert
                    severity="success"
                    action={
                      <Link to="/mtr-status">
                        <Button color="default">
                          <KeyboardDoubleArrowRightIcon />
                        </Button>
                      </Link>
                    }
                  >
                    {lang === "tc" ? (
                      <TextLoop interval={5000}>
                        <span>所有港鐵列車服務正常。</span>
                        <span>All MTR Train Services are Normal.</span>
                      </TextLoop>
                    ) : (
                      <TextLoop interval={5000}>
                        <span>All MTR Train Services are Normal.</span>
                        <span>所有港鐵列車服務正常。</span>
                      </TextLoop>
                    )}
                  </Alert>
                ) : (
                  <Alert
                    icon={<RailwayAlertOutlinedIcon />}
                    variant="filled"
                    sx={{ background: "white", color: "black" }}
                    action={
                      <Link to="/mtr-status">
                        <Button color="default">
                          <KeyboardDoubleArrowRightIcon />
                        </Button>
                      </Link>
                    }
                  >
                    <AlertTitle>
                      {lang === "tc" ? (
                        <TextLoop interval={5000}>
                          <span>非港鐵列車服務時間。</span>
                          <span>Not MTR Train Service Hours.</span>
                        </TextLoop>
                      ) : (
                        <TextLoop interval={5000}>
                          <span>Not MTR Train Service Hours.</span>
                          <span>非港鐵列車服務時間。</span>
                        </TextLoop>
                      )}
                    </AlertTitle>
                  </Alert>
                )
              ) : null}
            </div>
          </div>
        ) : (
          <MTRBlankStatus />
        )}
      </div>
    );
  } else if (type === "bannerIdv") {
    switch (lineStatus?.filter((item) => item.line_code === line)[0].status) {
      case "grey":
        return (
          <div className="mtrStatus">
            <div className="mtrStatus_BannerContainer">
              <div className="mtrStatus_BannerRow">
                <Alert icon={<RailwayAlertOutlinedIcon />} color="grey">
                  <AlertTitle>
                    {lang === "tc" ? (
                      <span>非港鐵列車服務時間。</span>
                    ) : (
                      <span>Not MTR Train Service Hours.</span>
                    )}
                  </AlertTitle>
                </Alert>
              </div>
            </div>
          </div>
        );
    }
  } else {
    return (
      <div className="mtrStatus">
        {loading ? (
          <div className="mtrStatus_Container">
            <p>
              讀取港鐵車務狀況中...
              <br />
              Reading MTR Service Status...
            </p>
          </div>
        ) : (
          <div className="mtrStatus_Container">
            {lineStatus?.map((mLine) => (
              <div className="mtrStatus_Rows">
                <div
                  className="mtrStatus_Line"
                  style={{
                    background: Dict.MtrLines[mLine.line_code].colorCode,
                  }}
                >
                  {Dict.MtrLines[mLine.line_code].tc_name}
                  <br />
                  <small>{Dict.MtrLines[mLine.line_code].en_name}</small>
                </div>
                <div className="mtrStatus_StatusIcon">
                  {StatusIcon(mLine.status)}
                </div>
                <div className="mtrStatus_Status">
                  {StatusDict.StatusLight[mLine.status].tc_name}
                  <br />
                  <small>{StatusDict.StatusLight[mLine.status].en_name}</small>
                </div>
                {Object.keys(mLine.url_en).length === 0 ? (
                  <div className="mtrStatus_DetailBtn"></div>
                ) : (
                  <div className="mtrStatus_DetailBtn">
                    <Button color="default" href={mLine["url_" + lang]}>
                      {lang === "en" ? "Details" : "詳情"}
                    </Button>
                  </div>
                )}
              </div>
            ))}
            <div className="mtrStatus_Footer">
              資料每3分鐘自動更新。
              <br /> Information will update automatically every 3 minutes.
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default MTRStatus;
