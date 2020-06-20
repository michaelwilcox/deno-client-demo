import React, { Suspense } from "react";
import { Router } from "./router";
import ErrorBoundary from "../components/ErrorBoundary";
import Loader from "../components/Loader";

export default () => (
  <ErrorBoundary fallback={<h2>Oops, error.</h2>}>
    <Suspense fallback={<Loader />}>
      <Router />
    </Suspense>
  </ErrorBoundary>
);
