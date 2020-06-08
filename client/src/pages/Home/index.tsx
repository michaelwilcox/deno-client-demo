import React, { Suspense } from "react";
import News from "../News";
import { RouteProps } from "../../routing/Route";
import "./style.css";

interface Props extends RouteProps {}

function HomePage(props: Props) {
  return (
    <div id="home">
      <News />
    </div>
  );
}

export default (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomePage {...props} />
  </Suspense>
);
