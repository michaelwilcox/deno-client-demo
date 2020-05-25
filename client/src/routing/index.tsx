import React from "react";
import { Router } from "@reach/router";
import Route from "./Route";
import Home from "../pages/Home";
import Chart from "../pages/StockChart";

export default () => (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/chart/:symbol" component={Chart} />
  </Router>
);
