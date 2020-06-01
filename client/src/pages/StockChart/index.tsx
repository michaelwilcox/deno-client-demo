import React, { useEffect } from "react";
import Chart from "../../components/Chart";
import {
  fetchStockQuote,
  fetchStockChartData,
  useStockDispatch,
  useStockState,
} from "../../contexts/stock";
import "./style.css";

export default function StockChart(props: any) {
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
