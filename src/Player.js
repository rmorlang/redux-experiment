import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  createContext,
  useLayoutEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayButton from "./PlayButton";
import PlayerContext from "./PlayerContext";
// import { Provider } from "./PlayerContext";
const { Provider } = PlayerContext;
import QualityButton from "./QualityButton";
import { createPlayerSelector } from "./selectors";
import { createPlayer, destroyPlayer } from "./actions/player";
import { useUniqueID, useGroupMember } from "./hooks";

export default function Player() {
  const id = useUniqueID();
  const playerSelector = useMemo(() => createPlayerSelector(id), [id]);
  const player = useSelector(playerSelector);
  const rootDispatch = useDispatch();
  useGroupMember(`player:${id}`);

  useLayoutEffect(() => {
    rootDispatch(createPlayer(id));
    return () => rootDispatch(destroyPlayer(id));
  }, []);

  const dispatch = useCallback(
    action =>
      rootDispatch({
        ...action,
        meta: {
          origin: { player: id },
          target: { player: id }
        }
      }),
    [rootDispatch, id]
  );

  const context = {
    id,
    playerSelector,
    dispatch
  };

  if (!player) {
    return <div>No player found at {id}</div>;
  }

  return (
    <Provider value={context}>
      <div>
        Player {id}
        <PlayButton />
        <QualityButton />
      </div>
    </Provider>
  );
}
