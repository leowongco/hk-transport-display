import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { PageLoading } from "./PageLoading";
import { firebaseApp } from "./component/firebase.js";

const LRT = React.lazy(() => import("./LRT.js"));
const MTR = React.lazy(() => import("./MTR.js"));
const Header = React.lazy(() => import("./Header.js"));
const SaveStations = React.lazy(() => import("./SaveStations.js"));
const Settings = React.lazy(() => import("./Settings.js"));
const MTRMap = React.lazy(() => import("./component/MTRRouteMap"));

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
            <Route path="/mRoute/:line">
              <Header />
              <MTRMap />
            </Route>
            <Route path="/settings">
              <Header />
              <Settings />
            </Route>
            <Route path="/">
              <Header />
              <SaveStations />
            </Route>
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
