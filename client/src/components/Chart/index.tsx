import React from "react";
import "./style.css";
import { StockChartData } from "../../types";

interface Props {
  height?: number;
  width?: number;
  chartData: StockChartData;
}

const time = ["1D", "5D", "1M", "1Y", "5Y"];

function renderLines(axis: string, height: number, width: number) {
  let lines = [];
  let total = axis === "x" ? width : height;
  let enumerated = 0;
  for (let i = 0; i <= total / 25; ++i) {
    let attrs = {};
    if (axis === "x") {
      attrs = { x1: enumerated, x2: enumerated, y1: 0, y2: height };
    } else {
      attrs = { x1: 0, x2: width, y1: enumerated, y2: enumerated };
    }
    enumerated += 25;
    lines.push(<line {...attrs} />);
  }
  return lines;
}

function renderTime(t: string) {
  console.log(t);
}

export default function Chart(props: Props) {
  const { height = 500, width = 1000, chartData } = props;
  console.log("chart data", chartData);
  return (
    <div id="chart">
      <svg height={`${height}px`} width={`${width}px`}>
        <g className="grid x-grid" id="xGrid">
          {renderLines("x", height, width)}
        </g>
        <g className="grid y-grid" id="yGrid">
          {renderLines("y", height, width)}
        </g>
        <g className="x-label"></g>
        <g className="y-label"></g>
      </svg>
      <ul className="time">
        {time.map((t) => (
          <li onClick={(e) => renderTime(t)}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
