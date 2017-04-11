'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, InteractionManager, ActivityIndicator, Button, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
//import * as Actions from '../../actions/requestCategoryData';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';
//import ListViewForCategory from '../../components/ListViewForCategory';
//import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import * as Actions from '../../actions/requestPLPData';
//import {StyleSheet, View, Text, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity, TouchableHighlight} from 'react-native';

import px2dp from '../../utils/px2dp';
import { Container, Title, Content, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import PDP from './PDP';
import SearchBar from '../SearchBar';

//import {getCurrentDate} from '../../utils/getDate';
//import * as Info from '../../utils/handleHomeDataSource';

class PLP extends BackPageComponent{
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
                    navigator = {this.props.navigator}/>
                
                <View style={styles.contentContainer}>
                    {this.props.error ?
                        <View style={styles.indicator}>
                            <Text style={{color: this.props.tabIconColor}}>Ooops, Error!! </Text>
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
                            <View
                    
                    
                    >
                    {(this.props.error && !this.props.hasData) ?
                        <View style={styles.indicator}>
                            <Text style={{color: this.props.tabIconColor}}>Ooops, Error!!</Text>
                        </View>
                        :
                        (this.props.hasData ?
                                <ListView
                                    contentContainerStyle={styles.listView}
                                    initialListSize={10}
                                    initialPageSize={10}
                                    dataSource={this.ds.cloneWithRows(dataSource)}
                                    renderRow = {
                                       (rowData, sectionId, rowID) => (
                                      
                                      <View>  
                                        <TouchableHighlight onPress={() =>  this._itemPressCallback(rowData)} underlayColor='rgba(0,0,0,0)' style={styles.viewRow}>
                                            <View style={{ flex:1,flexDirection: 'row', alignItems: 'center'}}>
                                              <Thumbnail square size={80} source={require('../../assets/no-image-icon-15.png')} />
                                              <Text style={{fontWeight: '200', color: '#696969', fontSize: 14, flex:1}}>{rowData.name}</Text>
                                              {rowData.prices ? 
                                              <View >
                                                <Text style={{fontWeight: '200', color: '#ca3538', fontSize: 14, flex:1}}>{rowData.prices[0].max} sale</Text>
                                                <Text style={{fontWeight: '200', color: '#696969', fontSize: 14, flex:1}}>{rowData.prices[1].max} original</Text>
                                              </View>
                                              :
                                              null
                                              }
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

    processPLPData(data) {
        if(data.products){
            if(!responseJson.products.data){
              return responseJson.products;
            }
            else {
              return responseJson.products.data;

            }
          }
    }

    _itemPressCallback(product){
        this._pushScene(PDP, product)
    }

    _pushScene(component, product){
        this.props.navigator.push({
            component: component,
            args: {id: product.id, navigator: this.props.navigator, title: product.name}
        });
    }

    _fetchData(){
        if(this.props.id){
           this.props.actions.fetchDataIfNeed('1',this.props.id);
        }
        else {
           this.props.actions.fetchDataIfNeed('2', this.props.searchText)
        }
        
    }

    /**
     * the speed of render is faster than that of getting setting value.
     * this is for when gets the setting value, home page decides whether to refresh the content.
     */
     componentDidMount(){
         //RCTDeviceEventEmitter.addListener('fetch', this._handleEventEmitter.bind(this));
         this._fetchData();
     }

     componentWillUnmount(){
         //RCTDeviceEventEmitter.removeListener('fetch', this._handleEventEmitter.bind(this));
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
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  viewRow: {
    flex:1,
      flexDirection: 'row',
      padding: 5,
      margin: 5,
      borderBottomWidth: 1,
      borderColor: '#CCC'
  },
});

const mapStateToProps = (state) => {
    return {
        loading: state.plpDataState.loading,
        hasData: state.plpDataState.hasData,
        dataSource: state.plpDataState.dataSource,
        //dataTime: state.plpDataState.dataTime,
        error: state.plpDataState.error,
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

export default connect(mapStateToProps, mapDispatchToProps)(PLP);

