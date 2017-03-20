import type { Action } from './types';

export const SET_PLP = 'SET_PLP';

export function setPLP(plpUrl:string):Action {
  return {
    type: SET_PLP,
    payload: plpUrl,
  };
}
