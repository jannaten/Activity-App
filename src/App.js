import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { CreateActivity, DashBoard } from "./screen/";
import Header from "./components/Header/header.component";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={DashBoard} />
        <Route exact path="/create" component={CreateActivity} />
      </Switch>
    </div>
  );
}

export default App;
