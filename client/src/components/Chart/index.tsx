import React, { useEffect, useState } from "react";
import "./style.css";
import { StockChartData } from "../../types";

interface Props {
  height?: number;
  width?: number;
  chartData: Array<StockChartData>;
}

interface ChartState {
  height?: number;
  width?: number;
  slice: StockChartData;
  xValues?: Array<number>;
  yValues?: Array<string>;
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
  state: ChartState,
  setState: Function
) {
  return function handleEvent() {
    const data = pie.find((d) => d.range === slice.toLowerCase());
    if (!data) {
      return;
    }
    const newState = {
      ...state,
      slice: data,
    };
    setState((prevState: ChartState) => ({
      ...prevState,
      ...newState,
      yValues: getYValues(newState),
    }));
  };
}

function getYValues(state: ChartState) {
  const { height, slice } = state;
  const min = Math.min(...slice.data.map((t) => t.open));
  const max = Math.max(...slice.data.map((t) => t.open));

  console.log(height, min, max);

  return [];
}

export default function Chart(props: Props) {
  const [state, setState] = useState<ChartState>({
    slice: {
      data: [{ date: "", high: 0, low: 0, open: 0, close: 0, volume: 0 }],
    },
  });
  const { height = 500, width = 1000, chartData } = props;
  // TODO
  if (!state.slice && chartData[0]) {
    const initialState = {
      ...state,
      height,
      width,
      slice: chartData[0],
    };
    initialState.yValues = getYValues(initialState);
    setState((prevState) => ({ ...prevState, ...initialState }));
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
          <li onClick={getASlice(t, chartData, state, setState)}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
