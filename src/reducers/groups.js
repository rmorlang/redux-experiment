function groupsReducer(state, action) {
  if (!state) {
    return {};
  }
  const { type, id, memberId } = action;
  switch (type) {
    case "CREATE_GROUP":
      const newGroup = {};
      return {
        ...state,
        [id]: newGroup
      };
    case "DESTROY_GROUP":
      const newState = { ...state };
      delete state[id];
      return state;
    case "ADD_GROUP_MEMBER":
      const appendedGroup = { ...state[id] };
      appendedGroup[memberId] = true;
      return {
        ...state,
        [id]: appendedGroup
      };
    case "REMOVE_GROUP_MEMBER":
      const group = { ...state[id] };
      delete group[memberId];
      return {
        ...state,
        [id]: group
      };
    default:
      return state;
  }
}

function membersReducer(state, groupState, action) {
  if (!state) {
    return {};
  }
  const { type, id, memberId } = action;
  switch (type) {
    case "DESTROY_GROUP":
      const groupMembers = groupState[id];
      if (!groupMembers) {
        return state;
      }
      const newState = { ...state };
      Object.keys(groupMembers).forEach(affectedId => {
        const member = { ...state[affectedId] };
        delete member[id];
        newState[id] = member;
      });
      return newState;
    case "ADD_GROUP_MEMBER": {
      const member = { ...state[memberId] } || {};
      member[id] = true;
      return {
        ...state,
        [memberId]: member
      };
    }
    case "REMOVE_GROUP_MEMBER": {
      const member = { ...state[memberId] } || {};
      delete member[id];
      return {
        ...state,
        [memberId]: member
      };
    }
    default:
      return state;
  }
}

export default function masterGroupsReducer(state = {}, action) {
  return {
    groups: groupsReducer(state.groups, action),
    members: membersReducer(state.members, state.groups, action)
  };
}
