import React from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./actions";
const { togglePlaying } = actions;
import { createSelector } from "reselect";
import {
  usePlayerSelector,
  pausedSelector,
  createPlayerSelector
} from "./selectors";
import { usePlayerDispatch } from "./hooks";

export default function PlayButton() {
  const label = usePlayerSelector(pausedSelector) ? "Play" : "Pause";
  const dispatch = usePlayerDispatch();
  const onClick = () => dispatch(togglePlaying());
  return <button onClick={onClick}>{label}</button>;
}
