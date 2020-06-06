import React, { useState } from "react";
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
  xValues?: Array<ChartPlotPoint>;
  yValues?: Array<ChartPlotPoint>;
}

interface ChartPlotPoint {
  label: string | number;
  point: number;
}

const heightDefault = 500;
const widthDefault = 1000;
const time = ["1D", "5D", "1M", "1Y", "5Y"];
const initialState = () => ({
  slice: {
    data: [{ date: "", high: 0, low: 0, open: 0, close: 0, volume: 0 }],
  },
  height: heightDefault,
  width: widthDefault,
  xValues: [],
  yValues: [],
});

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
      xValues: getXValues(newState),
    }));
  };
}

function getYValues(state: ChartState) {
  const { height = heightDefault, slice } = state;
  const max0 = Math.max(...slice.data.map((t) => t.open));
  const max1 = max0 + max0 / 3;
  return slice.data.map((t) => ({
    label: t.open,
    point: t.open * (height / max1) + (0 - 0),
  }));
}

function getXValues(state: ChartState) {
  const { width = widthDefault, slice } = state;
  const slices = slice.data.length;
  const gap = width / slices;
  return slice.data.map((t, i) => ({ label: t.date, point: gap * i }));
}

export default function Chart(props: Props) {
  const [state, setState] = useState<ChartState>(initialState);
  const { height = heightDefault, width = widthDefault, chartData } = props;
  // TODO: implement suspense + useEffect
  if (state.slice && state.slice.data.length === 1 && chartData[0]) {
    const initialState = {
      ...state,
      height,
      width,
      slice: chartData[0],
    };
    initialState.yValues = getYValues(initialState);
    initialState.xValues = getXValues(initialState);
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
