import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Home from "../Home";
import "./style.css";

const Route = ({
  component,
  ...routerProps
}: {
  component: (routerProps: RouteComponentProps) => JSX.Element;
} & RouteComponentProps) => {
  return component(routerProps);
};

export default () => {
  return (
    <div>
      <header>
        <h1>logo</h1>
        <nav>
          <ul>
            <li>
              <input type="text" />
            </li>
          </ul>
        </nav>
      </header>
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </div>
  );
};
