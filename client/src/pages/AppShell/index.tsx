import React, { FormEvent, useState, ChangeEvent } from "react";
import Routing from "../../routing";
import "./style.css";

interface Props { }

export default function AppShell(props: Props) {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER}/symbol/${symbol}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSymbol("");
      });
  };
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
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
            </li>
          </ul>
        </nav>
      </header>
      <Routing />
    </div>
  );
}
