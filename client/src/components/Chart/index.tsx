import React from "react";
import "./style.css";

interface Props {
  height?: number;
  width?: number;
}

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

export default function Chart(props: Props) {
  const { height = 500, width = 1000 } = props;
  return (
    <svg height={`${height}px`} width={`${width}px`}>
      <g className="grid x-grid" id="xGrid">
        {renderLines("x", height, width)}
      </g>
      <g className="grid y-grid" id="yGrid">
        {renderLines("y", height, width)}
      </g>
    </svg>
  );
}
