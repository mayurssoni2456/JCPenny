import type { Action } from './types';

export const SET_MAP = 'SET_MAP';

export function setMap():Action {
  return {
    type: SET_MAP,    
  };
}
