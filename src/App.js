import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { PageLoading } from "./PageLoading";
import { firebaseApp } from "./component/firebase.js";

import WeatherBanner from "./component/HK_weather";

const LRT = React.lazy(() => import("./LRT"));
const MTR = React.lazy(() => import("./MTR"));
const Header = React.lazy(() => import("./Header"));
const SaveStations = React.lazy(() => import("./SaveStations"));
const Settings = React.lazy(() => import("./Settings.js"));
const MTRMap = React.lazy(() => import("./component/MTRRouteMap"));
const MTRStatus = React.lazy(() => import("./component/MTRStatus"));
const HKTram = React.lazy(() => import("./HKTram"));
const MTRBusInfo = React.lazy(() => import("./component/MTRBusInfo"));

function App() {
  firebaseApp.analytics();
  return (
    <Suspense fallback={<PageLoading />}>
      <Router>
        <div className="App">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <Switch>
            <Route path="/lrt">
              <Header />
              <LRT />
            </Route>
            <Route path="/mtr/:link_Line/:link_Station">
              <Header />
              <MTR />
            </Route>
            <Route path="/mtrbus/:busRoute">
              <Header />
              <MTRBusInfo />
            </Route>
            <Route path="/mRoute/:line">
              <Header />
              <MTRMap />
            </Route>
            <Route path="/settings">
              <Header />
              <Settings />
            </Route>
            <Route path="/mtr-status">
              <Header />
              <MTRStatus />
            </Route>
            <Route path="/hktram">
              <Header />
              <HKTram />
            </Route>
            <Route path="/">
              <Header />
              <MTRStatus type="banner" />
              <WeatherBanner />
              <SaveStations />
            </Route>
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
