import React, { useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import GroupContext from "./GroupContext";

import PlayerContext from "./PlayerContext";
import {
  addGroupMember,
  removeGroupMember,
  createGroup,
  destroyGroup
} from "./actions";

export function usePlayerDispatch() {
  const { dispatch } = useContext(PlayerContext);
  return dispatch;
}

let count = 0;
function defaultGenerator() {
  return count++;
}

export function useUniqueID(generator = defaultGenerator) {
  const idRef = useRef();
  if (!idRef.current) {
    idRef.current = generator();
  }
  return idRef.current;
}

export function useGroupMember(memberID, suppliedGroup) {
  const groupFromContext = useContext(GroupContext);
  const group = suppliedGroup || groupFromContext;
  const groupID = group && group.id;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!groupID) {
      return;
    }
    dispatch(addGroupMember(groupID, memberID));
    return () => dispatch(removeGroupMember(groupID, memberID));
  }, [groupID, memberID,dispatch]);
}


