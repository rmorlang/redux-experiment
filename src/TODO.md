# huh?

- add `sync` property to player group
- consider usePlayerDispatch and adding useBroadcastDispatch or useGroupDispatch
- from Group context: dispatch, dispatchGroup, and dispatchAll
- support multiple sync levels :-)
- allow players to be removed
- calculate initial player playing state based on all players when synced
- restructure to define actions / reducers / selectors in one file
- check and optimize rendering
- allow Player to inject its own reducers??
- scale selector with multiple players
- fix group destroy on unmount
- make adding Groups and Views dynamic too :)

Player:

- toggle playing
- seek to time
- master time clock


    {
      playerGroup: {
        id: 1,
        sync: true,
        players: {
          1: { id: 1, paused: false, quality: 'low' },
          2: { id: 2, paused: false, quality: 'low' },
        },
        groups: {
          3: {
            sync: true,
            players: {
              3: { id: 1, paused: false, quality: 'low' },
              4: { id: 1, paused: false, quality: 'low' },
            }
          },
          4: {
            sync: true,
            players: {
              3: { id: 1, paused: false, quality: 'low' },
            }
          }
        }

      }
    }


Group
deals with the concept of nestable groups of entities
groups can contain groups
or any other entity that describes itself with useMember(uniqueID)
exports a context with
- selectors for the group's immediate children and descendents
- a reference to any parent group if appropriate

BroadcastGroup 
enhances a Group with action broadcast/routing behaviour
exprts a context which
- provides a dispatchGroup function

useBroadcastDispatch() returns
- dispatchAll, an alias to the "regular" dispatch
- dispatchGroup, a dispatch function that will target an action at all members of a group; injects { meta: targets: { [id: true...] }
- dispatch, a dispatch function that will target an action at this member only (self dispatch); injects { meta: { targets: { id: true} }} into action
- must be invoked after useMember()

playerReducer = subscribeReducer(reducer, { target: 'player:$id' })
(state, action) => {
  const { meta } = action;
  const { target } = meta;
  if (target[id]) {
    return reducer(action, state)
  } else {
    return state;
  }
}
playersReducer:
state[id] = playerReduer(state[id])

useModel(syncModel)
useModelCollection(playerModel)
const model = {
  name: 'group',
  state: {
  },
  actions: {
    create,
    destroy,
  }
  reducer: combineReducers({
    groups: groupsReducer,
    members: membersReducer,
  }),
  effects: {

  }
}

const model = {
  name: 'player',
  state: {
    paused: false,
    quality: 'low',
  },
  actions: {
    togglePlaying: groupAction(...),
    toggleQuality,
  }
}

useModel
- invokes replaceReducer on the store
- registers actions with the dispatch proxy

dispatchGroup.player.togglePlaying
dispatchAll.player(id).togglePlaying
dispatchAll.player.togglePlaying
dispatch.togglePlaying