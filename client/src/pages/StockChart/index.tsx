import React, { useEffect } from "react";
import {
  fetchStockQuote,
  useStockDispatch,
  useStockState,
} from "../../context/stock";
import "./style.css";

function StockChart(props: any) {
  const state = useStockState();
  const {
    quoteData: { companyName },
  } = state;
  const dispatch = useStockDispatch();

  useEffect(() => {
    fetchStockQuote(dispatch, props.symbol);
  }, props.symbol); // only reload data on route symbol change!
  return (
    <div id="chart" className="container">
      <h2>{companyName}</h2>
    </div>
  );
}

export default StockChart;
