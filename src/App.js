import "./css/App.css";
import LRT from "./LRT.js";
import MTR from "./MTR.js";
import Header from "./Header.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

function App() {
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
          <Route path="/mtr">
            <Header />
            <MTR />
          </Route>
          <Route path="/">
            <Header />
            <LRT />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
