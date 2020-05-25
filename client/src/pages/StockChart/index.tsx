import React, { useEffect } from "react";
import {
  updateStock,
  useStockDispatch,
  useStockState,
} from "../../context/stock";
import "./style.css";

function StockChart(props: any) {
  const state = useStockState();
  const {
    stock: { companyName },
  } = state;
  const dispatch = useStockDispatch();

  useEffect(() => {
    updateStock(dispatch, props.symbol);
  }, props.symbol); // empty array 2nd arg prevents re-fetching!
  return (
    <div id="chart" className="container">
      <h2>{companyName}</h2>
    </div>
  );
}

export default StockChart;
