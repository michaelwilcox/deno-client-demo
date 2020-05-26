import React, { FormEvent, useState, ChangeEvent } from "react";
import { navigate } from "@reach/router";
import "./style.css";

export default function SearchForm() {
  const [symbol, setSymbol] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/chart/${symbol}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        value={symbol}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSymbol(e.target.value)
        }
      />
    </form>
  );
}
