import React, { useState } from "react";
import "./style.css";
import { StockChartData } from "../../types";

interface Props {
  height?: number;
  width?: number;
  chartData: Array<StockChartData>;
}

const time = ["1D", "5D", "1M", "1Y", "5Y"];

function renderLines(axis: string, height: number, width: number) {
  let slots = axis === "x" ? width / 25 : height / 25;
  let enumerated = 0;
  let lines = [];
  for (let i = 0; i <= slots; ++i) {
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

function getASlice(
  slice: string,
  pie: Array<StockChartData>,
  setSlice: Function
) {
  return function handleEvent() {
    setSlice(pie.find((d) => d.range === slice.toLowerCase()));
  };
}

export default function Chart(props: Props) {
  const [slice, setSlice] = useState<StockChartData>();
  const { height = 500, width = 1000, chartData } = props;
  if (!slice && chartData[0]) {
    setSlice(chartData[0]);
  }
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
          <li onClick={getASlice(t, chartData, setSlice)}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
