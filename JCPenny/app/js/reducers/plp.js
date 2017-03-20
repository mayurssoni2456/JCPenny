
import type { Action } from '../actions/types';
import { SET_PLP } from '../actions/plp';

export type State = {
    plpUrl: string
}

const initialState = {
  plpUrl: undefined,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_PLP) {
    return {
      ...state,
      plpUrl: action.payload,
    };
  }
  return state;
}
