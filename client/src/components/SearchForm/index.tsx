import React, { FormEvent, useState, ChangeEvent } from "react";
import { navigate } from "@reach/router";
import "./style.css";

export default function SearchForm() {
  const [symbol, setSymbol] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/chart/${symbol}`);
  };
  let delayTimer: ReturnType<typeof setTimeout>;
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSymbol(value);
    clearTimeout(delayTimer);
    if (!value) {
      // TODO
      return;
    }
    delayTimer = setTimeout(async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/search/${value}`
      );
      const data = await res.json();
      console.log(data);
    }, 1000);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" value={symbol} onChange={handleChange} />
    </form>
  );
}
