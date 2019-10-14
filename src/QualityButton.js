import React from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./actions";
const { toggleQuality } = actions;
import {
  usePlayerSelector,
  qualitySelector,
  createPlayerSelector
} from "./selectors";
import { usePlayerDispatch } from "./hooks";

export default function QualityButton() {
  const quality = usePlayerSelector(qualitySelector);
  const dispatch = usePlayerDispatch();

  const onClick = () => dispatch(toggleQuality());
  return <button onClick={onClick}>{quality}</button>;
}
