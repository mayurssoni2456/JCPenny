/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import fetchWithTimeout from '../utils/fetchWithTimeout';
//import {getYesterdayFromDate} from '../utils/getDate';
//import DepartmentDataDAO from '../dao/DepartmentDataDAO';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';

function requestData() {
    return {
        type: types.FETCH_DEPARTMENT_DATE_REQUEST,
    };
}

function receiveData(json, date){
    return {
        type: types.FETCH_DEPARTMENT_DATA_SUCCESS,
        dataSource: json,
        //dataTime: date
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_DEPARTMENT_DATA_FAILURE
    };
}

function isValidData(responseData) {
    if(responseData.groups.length === 1)
        return true;
    return false;
}

/*export function onlyFetchLocalData(date) {
    return (dispatch)=> {
        var dao = new DepartmentDataDAO();
        dao.fetchLocalData(date).then((localData) => {
            //Toast.show('local', {position: px2dp(-80)});
            dispatch(receiveData(localData, date));
        }, (localData) => {
            //Toast.show('local', {position: px2dp(-80)});
            dispatch(onlyFetchLocalData(getYesterdayFromDate(date)));
        });
    }
}*/

export function fetchDataIfNeed(date) {

    const url = fetchUrl.departmentUrl;
    return (dispatch) => {
        dispatch(requestData());
        //var dao = new DepartmentDataDAO();
        //dao.fetchLocalData(date).then((localData) => {
            //Toast.show('The data is up to date', {position: px2dp(-80)});
            //console.log(localData);
            //dispatch(receiveData(localData, date));
        //}, (localData)=>{
            //fetchWithTimeout(5000, fetch(url))
                fetch(url)
                .then(response => response.json())
                .then(json => {
                    if(isValidData(json)){
                        //save data action is only triggered once for one day
                        //Toast.show('Welcome to the new dry goods', {position: px2dp(-80)});
                        //dao.save(json.groups[0].categories, date);
                        dispatch(receiveData(json.groups[0].categories));
                    }/*else{
                        if(localData === null) {
                            //if today's data is also null, it will fetch yesterday's data
                            //Toast.show('Today is not updated, for you to get past dry goods', {position: px2dp(-80)});
                            dispatch(fetchDataIfNeed(getYesterdayFromDate(date)));
                        }else {
                            //Toast.show('Today\'s dry goods have not yet been updated', {position: px2dp(-80)});
                            dispatch(receiveData(localData, date));
                        }
                    }*/
                }).catch((error)=>{
                    Toast.show('Get data failed', {position: px2dp(-80)});
                    dispatch(fetchFailure());
                });
        //});

    }
}