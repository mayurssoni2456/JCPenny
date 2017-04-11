'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, InteractionManager, ActivityIndicator, Button, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import * as Actions from '../../actions/requestSubCategoriesData';

import px2dp from '../../utils/px2dp';
import { Container, Title, Content, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import PLP from './PLP';
import SearchBar from '../SearchBar';

class SubCategories extends BackPageComponent{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          searchVisible : false
        };
    }

    toggleSearch(){
        //this.setState({
            //searchVisible: !this.state.searchVisible
        //});
        this.props.navigator.push({
          component: SearchBar
        });
    }
    
    render(){
        const {dataSource, mainThemeColor, pageBackgroundColor, rowItemBackgroundColor, segmentColor} = this.props;
        //alert(this.props.loading);
        return(
            <View style={[styles.container, {backgroundColor: this.props.pageBackgroundColor}]}>
                <NavigationBar
                    title={this.props.title}
                    isBackBtnOnLeft={true}
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                    rightBtnIcon="search"
                    rightBtnPress={() => {this.toggleSearch()}}
                    //searchVisible= {this.state.searchVisible}
                    navigator = {this.props.navigator}
                    />
                <View style={styles.contentContainer}>
                    {this.props.error ?
                        <View style={styles.indicator}>
                            <Text style={{color: this.props.tabIconColor}}>Ooops, Internal Error!! </Text>
                        </View>
                        :
                        (this.props.loading ?
                            <View style={styles.indicator}>
                                <ActivityIndicator
                                    color={this.props.tabIconColor}
                                />
                                <Text style={{marginLeft: 10, color: this.props.tabIconColor}}>Loading...</Text>
                            </View>
                            :
                            <View>
                    {(this.props.error && !this.props.hasData) ?
                        <View style={styles.indicator}>
                            <Text style={{color: this.props.tabIconColor}}>Ooops, Error!!</Text>
                        </View>
                        :
                        (this.props.hasData ?
                        <ListView
                            contentContainerStyle={styles.listView}
                            initialListSize={10}
                            dataSource={this.ds.cloneWithRows(this.processSubCategoriesData(dataSource))}
                            renderRow = {
                               (rowData, sectionId, rowID) => (
                              
                              <View style={styles.viewRow}>  
                                <TouchableHighlight onPress={() => this._itemPressCallback(rowData)} underlayColor='rgba(0,0,0,0)' style={styles.row}>
                                    <View style={{ flex:1,flexDirection: 'row', alignItems: 'center'}}>
                                      <Thumbnail square size={80} source={{uri: rowData.image ? rowData.image.url : 'https://www.freeiconspng.com//uploads//no-image-icon-15.png'}} />
                                      <Text style={{fontWeight: '200', color: '#696969', marginLeft:10}}>{rowData.name}</Text>
                                    </View>
                                </TouchableHighlight>
                              </View>
                               )
                            }
                          /> 
                        :
                        null
                        )
                    }
                </View>
                        )
                    }
                </View>
            </View>
        );
    }

    processSubCategoriesData(data) {
        let ds = [];
        data.forEach(function(item, i){
          item.categories.forEach(function(innerItem, j) {
            ds.push(innerItem);
          });
        });
        return ds;
    }

    _fetchData(){
        this.props.actions.fetchDataIfNeed(this.props.id);
    }


     componentDidMount(){
         this._fetchData();
     }


    _itemPressCallback(rowData){
        this._pushScene(PLP, rowData)
    }

    _pushScene(component, rowData){
        this.props.navigator.push({
            component: component,
            args: {id: rowData.id, navigator: this.props.navigator, title:rowData.name}
        });
    }

    _handleEventEmitter(value){
        if(value)
            this._fetchData();
    }

    _onPress(id) {
        if (id === 0)
            this._fetchData();
        else if (id === 1)
            ;
    }


    _onScroll(event){
        var offsetY = event.nativeEvent.contentOffset.y;
        if(offsetY <= this.imageHeight - theme.toolbar.height){
            var opacity = offsetY / (this.imageHeight - theme.toolbar.height);
            this.setState({opacity: opacity});
        }else{
            this.setState({opacity: 1});
        }
    }

    /*componentDidMount(){
        super.componentDidMount();  // must invoke it for the back button event
        this._fethchData();
    }

    _fethchData(){
        this.props.actions.fetchData(this.props.title +'/10/1');
    }*/

    _listViewOnEndReached(){
        if(!this.props.isRenderFooter) {
            this.props.actions.fetchMoreData(this.props.title + '/10/'+this.props.pageNumber);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    contentContainer: {
        //marginTop: theme.toolbar.height,
        flex: 1,
        zIndex: 0
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    row: {
      flex:1,
      flexDirection: 'row',
      padding: 5,
      margin: 10,
      borderBottomWidth: 1,
      borderColor: '#CCC'
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.subCategoriesDataState.loading,
        hasData: state.subCategoriesDataState.hasData,
        dataSource: state.subCategoriesDataState.dataSource,
        //dataTime: state.subCategoriesDataState.dataTime,
        error: state.subCategoriesDataState.error,
        mainThemeColor: theme.mainThemeColor,
        pageBackgroundColor: theme.pageBackgroundColor,
        rowItemBackgroundColor: theme.rowItemBackgroundColor,
        segmentColor: theme.segmentColor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);

