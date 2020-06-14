import React, { FormEvent, useContext, useState, ChangeEvent } from "react";
import { RouterContext } from "../../routing/router";
import "./style.css";

export default function SearchForm() {
  const [symbol, setSymbol] = useState("");
  const navigate = useContext(RouterContext);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/chart/${symbol}`, true);
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
      // TODO:@mike store static list on server for fast lookup
      // const res = await fetch(
      //   `${process.env.REACT_APP_SERVER}/search/${value}`
      // );
    }, 1000);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" value={symbol} onChange={handleChange} />
    </form>
  );
}
