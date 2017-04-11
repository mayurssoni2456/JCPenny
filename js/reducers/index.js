/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {combineReducers} from 'redux';
import departmentDataState from './departmentDataState';
import subCategoriesDataState from './subCategoriesDataState';
import plpDataState from './plpDataState';
import pdpDataState from './pdpDataState';

export default combineReducers({
    departmentDataState, subCategoriesDataState, plpDataState, pdpDataState
});