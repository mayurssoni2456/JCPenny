'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/requestDepartmentData';
import {StyleSheet, View, Text, ScrollView, Animated, ActivityIndicator,Button,Image, RefreshControl, ListView, TouchableOpacity, TouchableHighlight} from 'react-native';
import theme from '../../constants/theme';
import px2dp from '../../utils/px2dp';
import SubCategories from './SubCategories';
import NavigationBar from '../../components/NavigationBar';
//import {getCurrentDate} from '../../utils/getDate';
import colors from '../../constants/colors';
import { Container, Title, Content, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import SearchBar from '../SearchBar';

class HomeFragment extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            searchVisible : false
        };
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
                <NavigationBar title="Departments" 
                    rightBtnIcon="search"
                    rightBtnPress={() => {this.toggleSearch()}}
                    //searchVisible= {this.state.searchVisible}
                    navigator = {this.props.navigator}
                />
                {this.props.error ?
                    <View style={styles.indicator}>
                        <Text style={{color: this.props.tabIconColor}}>Ooops, Error!! </Text>
                    </View>
                    :
                    (this.props.loading ?
                    <View style={styles.indicator}>
                        <ActivityIndicator
                            color="#ca3538"
                        />
                        <Text style={{marginLeft: 10, color: '#ca3538'}}>Loading...</Text>
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
                          initialListSize={24}
                          dataSource={this.ds.cloneWithRows(dataSource)}
                          renderRow = {
                             (rowData, sectionId, rowID) => (
                            
                            <View style={styles.viewRow}>  
                              <TouchableHighlight onPress={() => this._itemPressCallback(rowData)} underlayColor='rgba(0,0,0,0)' >
                                <View style={{alignItems: 'center'}}>
                                    <Thumbnail square size={80} source={{uri: rowData.image.url}} />
                                    <Text style={{flex: 1,fontWeight: '200', color: '#696969', marginTop:5}}>{rowData.name}</Text>
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
            
        );
    }

    _fetchData(){
        //this.props.actions.fetchDataIfNeed(getCurrentDate());
        this.props.actions.fetchDataIfNeed();
    }

    /**
     * the speed of render is faster than that of getting setting value.
     * this is for when gets the setting value, home page decides whether to refresh the content.
     */
    componentDidMount(){
        this._fetchData();
        //RCTDeviceEventEmitter.addListener('fetch', this._handleEventEmitter.bind(this));
    }

     /*componentWillUnmount(){
         RCTDeviceEventEmitter.removeListener('fetch', this._handleEventEmitter.bind(this));
     }*/

    _itemPressCallback(rowData){
        this._pushScene(SubCategories, rowData)
    }

    _pushScene(component, rowData){
        this.props.navigator.push({
            component: component,
            args: {id: rowData.id, navigator: this.props.navigator, title: rowData.name}
        });
    }

    _handleEventEmitter(){
        this._fetchData();

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    scrollContents: {
        //height: theme.screenHeight+theme.toolbar.height,
    },
    img: {
        width: theme.screenWidth,
        height: px2dp(400),
        resizeMode: 'cover'
    },
    dateLabel: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'relative',
        width: theme.screenWidth,
        height: px2dp(50),
        bottom: px2dp(50),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: px2dp(20),
        marginRight: px2dp(20),
        fontWeight: 'bold'
    },
    footer: {
        width: theme.screenWidth,
        height: px2dp(70),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: theme.segment.width
    },
    bottomBtn: {
        backgroundColor: colors.lightBlue,
        width: theme.screenWidth*0.9,
        height: px2dp(40),
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 30,
    },
    btnLabel: {
        color: '#fff',
        fontSize: px2dp(16)
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(20)
    },
    text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  listView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  viewRow: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 110,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
    return {
        loading: state.departmentDataState.loading,
        hasData: state.departmentDataState.hasData,
        dataSource: state.departmentDataState.dataSource,
        dataTime: state.departmentDataState.dataTime,
        error: state.departmentDataState.error,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment);