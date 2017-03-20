
import type { Action } from '../actions/types';
import { SET_DEPARTMENT } from '../actions/department';

export type State = {
    departmentData: object
}

const initialState = {
  departmentData: undefined,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_DEPARTMENT) {
    return {
      ...state,
      departmentData: action.payload,
    };
  }
  return state;
}
