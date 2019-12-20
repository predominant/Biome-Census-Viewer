import { useState, useDebugValue } from 'react';

const ViewState = {
  INSPECTOR: 1,
  DATA: 2,
  DEBUG: 1024,
};
export default ViewState;

export function useViewState(_initialState = ViewState.INSPECTOR) {
  const [viewState, setViewState] = useState(_initialState);
  useDebugValue(Object.keys(ViewState).find(key => ViewState[key] === viewState));
  return [viewState, setViewState];
};
