import React, { FormEvent, useState, ChangeEvent } from "react";
import { navigate } from "@reach/router";
import { StockProvider } from "../../context/stock";
import Routing from "../../routing";
import "./style.css";

interface Props {}

const SearchForm = () => {
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
};

export default function AppShell(props: Props) {
  return (
    <StockProvider>
      <header>
        <nav>
          <ul>
            <li>
              <SearchForm />
            </li>
          </ul>
        </nav>
      </header>
      <Routing />
    </StockProvider>
  );
}
