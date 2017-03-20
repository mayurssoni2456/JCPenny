import type { Action } from './types';

export const SET_PDP = 'SET_PDP';

export function setPDP(pdpUrl:string):Action {
  return {
    type: SET_PDP,
    payload: pdpUrl,
  };
}
