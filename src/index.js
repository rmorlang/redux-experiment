import React from "react";
import ReactDOM from "react-dom";
import Group from "./Group";
import StoreDump from "./StoreDump";

import { createStore } from "redux";
import { Provider } from "react-redux";

import "./styles.css";
import Player from "./Player";
import View from "./View";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox1</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Group>
        <Group>
          <View />
          <View />
        </Group>
        <Group>
          <View />
        </Group>
        <StoreDump />
      </Group>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
