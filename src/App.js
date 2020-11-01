import React from "react";
import "./App.css";
import { Header } from "./components/";
import { Switch, Route } from "react-router-dom";
import { CreateActivity, DashBoard, CheckActivity } from "./screen/";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/Activity-App" component={DashBoard} />
        <Route exact path="/Activity-App/check" component={CheckActivity} />
        <Route exact path="/Activity-App/create" component={CreateActivity} />
      </Switch>
    </div>
  );
}

export default App;
