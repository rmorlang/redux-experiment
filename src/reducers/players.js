let count = 0;

function targetedReducer(model, fn) {
  return (state, action) => {
    const { meta } = action || {};
    const { target } = meta || {};
    if (target && target[model] !== state.id) {
      return state;
    }
    return fn(state, action);
  };
}

const playerReducer = targetedReducer("player", (state, action = {}) => {
  const { type } = action;
  if (!state) {
    return {
      quality: "low",
      paused: false
    };
  }

  switch (type) {
    case "TOGGLE_PLAYING":
      return {
        ...state,
        paused: !state.paused
      };
    case "TOGGLE_QUALITY":
      return {
        ...state,
        quality: state.quality === "low" ? "high" : "low"
      };
    default:
      return state;
  }
});

export default function playersReducer(state, action) {
  console.log(action);
  if (!state) {
    return {};
  }

  const { type, id } = action;
  switch (type) {
    case "CREATE_PLAYER":
      const player = { ...playerReducer(), id };
      console.log("player", player);
      return {
        ...state,
        [id]: player
      };
    case "DESTROY_PLAYER":
      const omitted = { ...state };
      delete omitted[id];
      return omitted;
    default:
      return Object.fromEntries(
        Object.entries(state).map(([key, val]) => [
          key,
          playerReducer(val, action)
        ])
      );
  }
}
