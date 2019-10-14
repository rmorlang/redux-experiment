import React, { useState, useRef, useContext, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import GroupContext from './GroupContext';
import { useUniqueID, useGroupMember } from './hooks';
import { createGroup, destroyGroup } from './actions';

import store from './store';

/*
 * Group has two functions.
 *
 * First, it provides a default Redux store to all children.
 * TODO - it should probably only provide a store if one does not exist
 *
 * Second, ir provides a Context and some wiring to implement the concept
 * of Groups, which allow nested components to target actions at all
 * members of the same Group.
 */

export function useGroup(group) {
  const parent = useContext(GroupContext);
  const parentID = parent && parent.id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createGroup(group));
    return () => dispatch(destroyGroup(group));
  }, [group, dispatch]);

  useGroupMember(group, parent);

  const isSelectable = useSelector((state) => state.groups.groups[group]);

  const render = isSelectable ? (jsx) => jsx : () => null;
  return { dispatch, render, parentID };
}

function GroupContextProvider({ children }) {
  const id = `group:${useUniqueID()}`;

  const { dispatch, render, parentID } = useGroup(id);
  const context = {
    id,
    parentID,
    dispatch,
  };
  return render(
    <GroupContext.Provider value={context}>{children}</GroupContext.Provider>,
  );
}

export default function Group({ children }) {
  // TODO should not have presentation
  const style = {
    clear: 'both',
    border: '1px solid red',
    margin: 10,
    display: 'flex',
  };
  return (
    <Provider store={store}>
      <GroupContextProvider>
        <div style={style}>{children}</div>
      </GroupContextProvider>
    </Provider>
  );
}
