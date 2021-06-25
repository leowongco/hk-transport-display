import "./css/App.css";
import LRT from "./LRT.js";
import MTR from "./MTR.js";
import Header from "./Header.js";
import SaveStations from "./SaveStations";
import Settings from "./Settings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { firebaseApp } from "./component/firebase.js";

import MTRMap from "./component/MTRRouteMap";

function App() {
  firebaseApp.analytics();
  return (
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
  );
}

export default App;
