
export default function syncReducer(state, action) {
  if (state === undefined) {
    return { sync: true }
  }

  const { type } = action;
  if (type === 'TOGGLE_SYNC')
}