/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import fetchWithTimeout from '../utils/fetchWithTimeout';
//import {getYesterdayFromDate} from '../utils/getDate';
//import PLPDataDAO from '../dao/PLPDataDAO';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';

function requestData() {
    return {
        type: types.FETCH_PLP_DATE_REQUEST,
    };
}

function receiveData(json){
    return {
        type: types.FETCH_PLP_DATA_SUCCESS,
        dataSource: json,
        //dataTime: date
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_PLP_DATA_FAILURE
    };
}

/*function isValidData(responseData) {
    if(responseData.products.data.length > 0)
        return true;
    return false;
}*/

/*export function onlyFetchLocalData(date) {
    return (dispatch)=> {
        var dao = new PLPDataDAO();
        dao.fetchLocalData(date).then((localData) => {
            //Toast.show('local', {position: px2dp(-80)});
            dispatch(receiveData(localData, date));
        }, (localData) => {
            //Toast.show('local', {position: px2dp(-80)});
            dispatch(onlyFetchLocalData(getYesterdayFromDate(date)));
        });
    }
}*/

export function fetchDataIfNeed(type, id) {
    let urlBase = '';
    if(type === '1'){
      urlBase = fetchUrl.plpUrl;
    }
    else {
      urlBase = fetchUrl.searchUrl;
    }

    const url = urlBase+id;

    return (dispatch) => {
        dispatch(requestData());
        //var dao = new PLPDataDAO();
        //dao.fetchLocalData(date).then((localData) => {
            //Toast.show('The data is up to date', {position: px2dp(-80)});
            //console.log(localData);
            //dispatch(receiveData(localData, date));
        //}, (localData)=>{
            //fetchWithTimeout(5000, fetch(url))
            setTimeout(function() {
                fetch(url)
                .then(response => response.json())
                .then(json => {
                    let responseJson;
                    if(json.products){
                        if(!json.products.data){
                          responseJson = json.products;
                        }
                        else {
                          responseJson = json.products.data;
                        }

                        //if(isValidData(responseJson)){
                            //save data action is only triggered once for one day
                            //Toast.show('Welcome to the new dry goods', {position: px2dp(-80)});
                            //dao.save(json.products.data, date);
                            dispatch(receiveData(responseJson));
                        //}
                    }
                    else {
                        fetchWithTimeout(5000, fetch(json.groups[0].categories[0].href))
                        .then(responseInner => responseInner.json())
                        .then(jsonInner => { 
                            let responseJsonInner;
                            if(jsonInner.products){
                                if(!jsonInner.products.data){
                                  responseJsonInner = jsonInner.products;
                                }
                                else {
                                  responseJsonInner = jsonInner.products.data;
                                }

                                //if(isValidData(responseJsonInner)){
                                    //save data action is only triggered once for one day
                                    //Toast.show('Welcome to the new dry goods', {position: px2dp(-80)});
                                    //dao.save(json.products.data, date);
                                    dispatch(receiveData(responseJsonInner));
                                //}
                            }
                        });
                    }
                    
                    /*if(isValidData(responseJson)){
                        //save data action is only triggered once for one day
                        Toast.show('Welcome to the new dry goods', {position: px2dp(-80)});
                        //dao.save(json.products.data, date);
                        dispatch(receiveData(json.products.data, date));
                    }else{
                        if(localData === null) {
                            //if today's data is also null, it will fetch yesterday's data
                            Toast.show('Today is not updated, for you to get past dry goods', {position: px2dp(-80)});
                            dispatch(fetchDataIfNeed(getYesterdayFromDate(date)));
                        }else {
                            Toast.show('Today\'s dry goods have not yet been updated', {position: px2dp(-80)});
                            dispatch(receiveData(localData, date));
                        }
                    }*/
                }).catch((error)=>{
                    Toast.show('Get data failed', {position: px2dp(-80)});
                    dispatch(fetchFailure());
                });
            }, 500);
        //});

    }
}