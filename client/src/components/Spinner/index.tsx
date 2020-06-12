import React from "react";

interface Props {
  isBig?: boolean;
}

export default function Spinner({ isBig }: Props) {
  let className = "";
  if (isBig) {
    className += " BigSpinner";
  }
  return (
    <span aria-busy="true" className={className}>
      <span className="Spinner" aria-hidden="true">
        🌀
      </span>
    </span>
  );
}
