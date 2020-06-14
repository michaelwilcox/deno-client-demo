import React, { Suspense } from "react";
import { Router } from "./router";
import ErrorBoundary from "../components/ErrorBoundary";

export default () => (
  <ErrorBoundary fallback={<h2>Oops, error.</h2>}>
    <Suspense fallback={<div>Loading...</div>}>
      <Router />
    </Suspense>
  </ErrorBoundary>
);
