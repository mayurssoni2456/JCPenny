
import type { Action } from '../actions/types';
import { SET_PDP } from '../actions/pdp';

export type State = {
    pdpUrl: string
}

const initialState = {
  pdpUrl: undefined,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_PDP) {
    return {
      ...state,
      pdpUrl: action.payload,
    };
  }
  return state;
}
