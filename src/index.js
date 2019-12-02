import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import DadJokes from "./DadJokes";

function App() {
  return (
    <div className="App">
      <DadJokes />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
