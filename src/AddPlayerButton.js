import React from "react";
import { useDispatch } from "react-redux";
import actions from "./actions";
const { createPlayer } = actions;

export default function AddPlayerButton() {
  const dispatch = useDispatch();
  const onClick = () => dispatch(createPlayer());
  return <button onClick={onClick}>Add New Player</button>;
}
