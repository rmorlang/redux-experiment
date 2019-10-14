export function createGroup(id) {
  return {
    type: "CREATE_GROUP",
    id
  };
}

export function destroyGroup(id) {
  return {
    type: "DESTROY_GROUP",
    id
  };
}

export function addGroupMember(id, memberId) {
  return {
    type: "ADD_GROUP_MEMBER",
    id,
    memberId
  };
}

export function removeGroupMember(id, memberId) {
  return {
    type: "REMOVE_GROUP_MEMBER",
    id,
    memberId
  };
}
