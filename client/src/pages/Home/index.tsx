import React, { Suspense } from "react";
import News from "../News";
import DashboardHeader from "../../components/DashboardHeader";
import { RouteProps } from "../../routing/Route";
import { APIReaderLatestNews } from "../../typings/app/app";
import "./style.css";

interface Props extends RouteProps {
  latestNews: APIReaderLatestNews;
}

function HomePage(props: Props) {
  const { latestNews } = props;
  return (
    <div>
      <DashboardHeader />
      <div id="home">
        <News latestNews={latestNews} />
      </div>
    </div>
  );
}

export default (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomePage {...props} />
  </Suspense>
);
