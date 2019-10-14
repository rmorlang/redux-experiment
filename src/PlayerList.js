import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Player from "./Player";
import actions from "./actions";
const { createPlayer } = actions;

export default function PlayerList({ players }) {
  return players.map(({ key }) => <Player key={key} />);
}
