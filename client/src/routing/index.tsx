import React from "react";
import { Router } from "@reach/router";
import Route from "./Route";
import Home from "../pages/Home";

export default () => (
  <Router>
    <Route path="/" component={Home} />
  </Router>
);
