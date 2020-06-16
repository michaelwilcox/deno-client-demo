import React, { Suspense } from "react";
import Chart from "../../components/Chart";
import { RouteProps } from "../../routing/Route";
import {
  APIReaderStockChart,
  APIReaderStockQuote,
} from "../../typings/app/app";
import "./style.css";

interface Props extends RouteProps {
  stockQuote: APIReaderStockQuote;
  stockChart: APIReaderStockChart;
}

function StockChartPage(props: Props) {
  const { stockChart, stockQuote } = props;
  const data = stockQuote.read();
  const {
    quote: { companyName },
  } = data;

  return (
    <div id="chart" className="container">
      <Chart stockChart={stockChart} />
      <h2>{companyName}</h2>
    </div>
  );
}

export default (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <StockChartPage {...props} />
  </Suspense>
);
