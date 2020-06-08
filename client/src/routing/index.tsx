import React, { Suspense, lazy } from "react";
import { Router } from "@reach/router";

const Home = lazy(() => import("../pages/Home"));
const Chart = lazy(() => import("../pages/StockChart"));

export default () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Home path="/" />
      <Chart path="/chart/:symbol" />
    </Router>
  </Suspense>
);
