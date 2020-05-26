import React from "react";
import SearchForm from "../SearchForm";
import "./style.css";

export default function DashboardHeader() {
  return (
    <header className="dash-header">
      <nav>
        <ul>
          <li>
            <SearchForm />
          </li>
        </ul>
      </nav>
    </header>
  );
}
