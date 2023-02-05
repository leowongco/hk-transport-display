import "./css/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import React, { Suspense } from "react";
import { PageLoading } from "./PageLoading";
import { app } from "./component/firebase.js";
import { getAnalytics } from "firebase/analytics";
import appInfo from "../package.json";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const LRT = React.lazy(() => import("./LRT"));
const MTR = React.lazy(() => import("./MTR"));
const Header = React.lazy(() => import("./Header"));
const SaveStations = React.lazy(() => import("./SaveStations"));
const Settings = React.lazy(() => import("./Settings.js"));
const MTRMap = React.lazy(() => import("./component/MTRRouteMap"));
const MTRStatus = React.lazy(() => import("./component/MTRStatus"));
const HKTram = React.lazy(() => import("./HKTram"));
const MTRBus = React.lazy(() => import("./MTRBus"));
const WeatherBanner = React.lazy(() => import("./component/HK_weather"));

const storage = window.localStorage;
const version = storage.getItem("appVersion");

if (storage.getItem("appVersion") === null) {
  storage.setItem("appVersion", appInfo.version);
}

if (version < appInfo.version) {
  setTimeout(() => {
    storage.setItem("appVersion", appInfo.version);
    window.location.reload();
  }, 3000);
}

function App() {
  getAnalytics(app);
  return (
    <Suspense fallback={<PageLoading />}>
      <div className="App">
        <meta
          name="viewport"
          content="width=device-width, maximum-scale=1.0, user-scalable=0"
        />
        {version !== null && version < appInfo.version ? (
          <Dialog maxWidth="md" open>
            <DialogTitle id="confirmation-dialog-title">
              更新 Update
            </DialogTitle>
            <DialogContent dividers>
              <DialogContentText>
                偵測到新版本，更新中。 New Version Detected, Updating.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        ) : null}

        <BrowserRouter>
          <Routes>
            <Route path="/lrt" element={[<Header />, <LRT />]} />
            <Route
              path="/mtr/:link_Line/:link_Station"
              element={[<Header />, <MTR />]}
            />
            <Route path="/mtrbus" element={[<Header />, <MTRBus />]} />
            <Route path="/mRoute/:line" element={[<Header />, <MTRMap />]} />
            <Route path="/settings" element={[<Header />, <Settings />]} />
            <Route path="/mtr-status" element={[<Header />, <MTRStatus />]} />
            <Route path="/hktram" element={[<Header />, <HKTram />]} />
            <Route
              path="/"
              element={[
                <Header />,
                <MTRStatus type="banner" />,
                <WeatherBanner />,
                <SaveStations />,
              ]}
            />
            <Route
              path="*"
              element={[
                <Header />,
                <MTRStatus type="banner" />,
                <WeatherBanner />,
                <SaveStations />,
              ]}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
