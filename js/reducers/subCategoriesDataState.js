/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    dataSource: {},
    //dataTime: ''
};

export default function subCategoriesDataState(state=initialState, action){
    switch (action.type){
        case types.FETCH_SUB_CATEGORIES_DATE_REQUEST:
            return Object.assign({}, state, {
                ...state,
                loading: true,
                error: false
            });

        case types.FETCH_SUB_CATEGORIES_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                hasData: true,
                dataSource: action.dataSource,
                //dataTime: action.dataTime
            });

        case types.FETCH_SUB_CATEGORIES_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                error: true
            });

        default:
            return state;
    }
}