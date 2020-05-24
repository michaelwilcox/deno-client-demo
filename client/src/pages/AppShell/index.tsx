import React from "react";
import Routing from "../../routing";
import "./style.css";

export default () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <input type="text" />
            </li>
          </ul>
        </nav>
      </header>
      <Routing />
    </div>
  );
};
