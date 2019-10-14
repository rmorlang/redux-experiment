export const createPlayer = id => ({
  type: "CREATE_PLAYER",
  id
});

export const destroyPlayer = id => ({
  type: "DESTROY_PLAYER",
  id
});

export const togglePlaying = () => ({
  type: "TOGGLE_PLAYING"
});

export const toggleQuality = () => ({
  type: "TOGGLE_QUALITY"
});
