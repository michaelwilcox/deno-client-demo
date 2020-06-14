import React, { Suspense } from "react";
// import Chart from "../../components/Chart";
import { RouteProps } from "../../routing/Route";
import "./style.css";

interface Props extends RouteProps {
  stock: any; // TODO:@mike fix type
}

function StockChartPage(props: Props) {
  const { stock } = props;
  const data = stock.read();
  const {
    quote: { companyName },
  } = data;

  return (
    <div id="chart" className="container">
      {/* <Chart chartData={chartData} /> */}
      <h2>{companyName}</h2>
    </div>
  );
}

export default (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <StockChartPage {...props} />
  </Suspense>
);
