import type { Action } from './types';

export const SET_DEPARTMENT = 'SET_DEPARTMENT';

export function setDepartment(subCategoryInfo:object):Action {
  return {
    type: SET_DEPARTMENT,
    payload: subCategoryInfo
  };
}
