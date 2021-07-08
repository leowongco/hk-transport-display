import React, { useEffect, useState } from "react";
import axios from "axios";
import convert from "xml-js";

import { Button, ButtonGroup } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextLoop from "react-text-loop";
import Marquee from "react-fast-marquee";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import RemoveCircleTwoToneIcon from "@material-ui/icons/RemoveCircleTwoTone";
import AccessTimeTwoToneIcon from "@material-ui/icons/AccessTimeTwoTone";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { RiTyphoonFill } from "react-icons/ri";

import "../css/MTRStatus.css";
import Dict from "./MTR_Dict.js";
import StatusDict from "./MTRStatus_Dict.js";

function MTRStatus({ type }) {
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

  function StatusIcon(status) {
    switch (status) {
      case "green":
        return <CheckCircleTwoToneIcon style={{ color: "green" }} />;
      case "pink":
      case "yellow":
        return <ErrorTwoToneIcon style={{ color: "yellow" }} />;
      case "red":
        return <RemoveCircleTwoToneIcon style={{ color: "red" }} />;
      case "typhoon":
        return <RiTyphoonFill style={{ color: "#1a15bd" }} />;
      default:
        return <AccessTimeTwoToneIcon style={{ color: "grey" }} />;
    }
  }

  if (type === "banner") {
    var goodServices = lineStatus?.every((item) => {
      return item.status === "green" || item.status === "grey";
    });

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

    return (
      <div className="mtrStatus">
        <div className="mtrStatus_BannerContainer">
          <div className="mtrStatus_BannerRow">{/* header */}</div>
          <div className="mtrStatus_BannerRow">
            {typhoonServices ? (
              <Alert
                severity="info"
                action={
                  <Button color="inherit" size="small" href="./mtr-status">
                    <DoubleArrowIcon />
                  </Button>
                }
              >
                <div>
                  <b>熱帶氣旋 Tropical Cyclone</b>
                </div>
                <Marquee gradientWidth="0">
                  有港鐵路線受熱帶氣旋影響，請及早計劃行程。
                </Marquee>
                <Marquee gradientWidth="0">
                  MTR Lines are affacted by Tropical Cyclone, please plan for
                  travelling early.
                </Marquee>
              </Alert>
            ) : null}
            {badServices ? (
              <Alert
                severity="warning"
                action={
                  <Button color="inherit" size="small" href="./mtr-status">
                    <DoubleArrowIcon />
                  </Button>
                }
              >
                <div>
                  <b>港鐵服務延誤/受阻 MTR Service Delay/Disruption</b>
                </div>
                <Marquee gradientWidth="0">
                  有港鐵路線服務延誤/受阻，請考慮重新計劃行程。
                </Marquee>
                <Marquee gradientWidth="0">
                  One or more MTR Lines has been delayed, please re-considerd
                  the travelling plan.
                </Marquee>
              </Alert>
            ) : null}
            {goodServices ? (
              <Alert
                severity="success"
                action={
                  <Button color="inherit" size="small" href="./mtr-status">
                    <DoubleArrowIcon />
                  </Button>
                }
              >
                <TextLoop interval={5000}>
                  <span>所有港鐵列車服務正常。</span>
                  <span>All MTR Train Services are Normal.</span>
                </TextLoop>
              </Alert>
            ) : null}
          </div>
        </div>
      </div>
    );
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
                {Object.keys(mLine.url_en).length === 0 ? null : (
                  <div className="mtrStatus_DetailBtn">
                    <ButtonGroup color="primary" size="small">
                      <Button href={mLine.url_tc}>詳情</Button>
                      <Button href={mLine.url_en}>Details</Button>
                    </ButtonGroup>
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
