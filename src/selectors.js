import { useContext, useMemo } from "react";
import PlayerContext from "./PlayerContext";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

export function logSelector(name, fn) {
  return (...args) => {
    const result = fn(...args);
    console.log(`selector:${name} > `, result);
    return result;
  };
}

export const qualitySelector = logSelector("quality", player => player.quality);
export const pausedSelector = logSelector("paused", player => player.paused);

// export const createPlayerSelector = id =>
//   logSelector("player", state => state.players[id]);

export const createPlayerSelector = id =>
  createSelector(
    logSelector("player", state => state.players[id]),
    val => val
  );

export function usePlayerSelector(fn) {
  const { playerSelector } = useContext(PlayerContext);
  const customSelector = useMemo(() => {
    console.log("making new selector");
    return createSelector(
      playerSelector,
      fn
    );
  }, [playerSelector, fn]);
  return useSelector(customSelector);
}
