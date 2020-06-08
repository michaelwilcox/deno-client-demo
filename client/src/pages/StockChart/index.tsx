import React, { Suspense, useEffect } from "react";
import Chart from "../../components/Chart";
import { RouteProps } from "../../routing/Route";
import {
  fetchStockQuote,
  fetchStockChartData,
  useStockDispatch,
  useStockState,
} from "../../contexts/stock";
import "./style.css";

interface Props extends RouteProps {
  symbol?: any; // TODO:@mike is this correct? (check router prop types)
}

function StockChartPage(props: Props) {
  const state = useStockState();
  const {
    quoteData: { companyName },
    chartData,
  } = state;
  const dispatch = useStockDispatch();

  useEffect(() => {
    fetchStockQuote(dispatch, props.symbol);
  }, props.symbol); // only reload data on route symbol change!

  useEffect(() => {
    fetchStockChartData(dispatch, props.symbol);
  }, props.symbol);
  return (
    <div id="chart" className="container">
      <Chart chartData={chartData} />
      <h2>{companyName}</h2>
    </div>
  );
}

export default (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <StockChartPage {...props} />
  </Suspense>
);
