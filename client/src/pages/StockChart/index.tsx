import React from "react";
import { useStockState } from "../../context/stock";
import "./style.css";

function StockChart() {
  const state = useStockState();
  console.log("chart state", state);
  return (
    <div id="chart" className="container">
      <p>Chart!!!1!</p>
    </div>
  );
}

export default StockChart;
