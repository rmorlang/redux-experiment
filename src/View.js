import React, { useState, useContext } from "react";
import PlayerList from "./PlayerList";
import Player from "./Player";
import GroupContext from "./GroupContext";

let counter = 0;
function generatePlayer() {
  return { key: counter++ };
}
export default function View({ children }) {
  const style = {
    border: "1px solid #ccc",
    flexDirection: "row",
    margin: 5,
    textAlign: "left"
  };

  const [players, setPlayers] = useState(() => [
    // generatePlayer(),
    // generatePlayer()
  ]);

  const addPlayer = () => {
    setPlayers(old => [...old, generatePlayer()]);
  };

  const group = useContext(GroupContext);

  return (
    <div style={style}>
      <div>
        <button onClick={addPlayer}>Add Player</button>
        <Player />
        <PlayerList players={players} />
        <pre>{JSON.stringify(group)}</pre>
      </div>
    </div>
  );
}
