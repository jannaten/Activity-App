import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import DashBoard from "./screen/Dashboard/dashBoard";
import Header from "./components/header/header.component";
import CreateProject from "./screen/CreateActivities/createActivities";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={DashBoard} />
        <Route exact path="/create" component={CreateProject} />
      </Switch>
    </div>
  );
}

export default App;
