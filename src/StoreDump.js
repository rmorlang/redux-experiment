import React from "react";
import { useSelector } from "react-redux";

export default function StoreDump() {
  const style = {
    clear: "both",
    textAlign: "left"
  };
  const state = useSelector(state => state);
  return <pre style={style}>{JSON.stringify(state, null, 2)}</pre>;
}
