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
import * as Actions from '../../actions/requestPDPData';
//import {StyleSheet, View, Text, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity, TouchableHighlight} from 'react-native';

import px2dp from '../../utils/px2dp';
import { Container, Title, Content, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';


//import {getCurrentDate} from '../../utils/getDate';
//import * as Info from '../../utils/handleHomeDataSource';

class PLP extends BackPageComponent{
    constructor(props){
        super(props);
        //this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
                    rightBtnIcon="heart"
                    rightBtnPress={() => {alert('Added to favourites')}}/>
              
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
                            <View>
                                {(this.props.error && !this.props.hasData) ?
                                    <View style={styles.indicator}>
                                        <Text style={{color: this.props.tabIconColor}}>Ooops, Error!!</Text>
                                    </View>
                                    :
                                    (this.props.hasData ?
                                    <View style={{padding:10, alignItems: 'center'}}>
                                      <Text style={{marginTop:20}}>{dataSource.name}</Text>
                                      { this.props.dataSource.image ? 
                                      <Image style={{width: 300, height: 300, marginTop:20, marginBottom:20}} source={{uri:this.props.dataSource.image.url }}/>
                                      :
                                      null
                                      }
                                      { this.props.dataSource.images ? 
                                      <Image style={{width: 300, height: 300, marginTop:20, marginBottom:20}} source={{uri:this.props.dataSource.images[0].url }}/>
                                      :
                                      null
                                      } 
                                      <Button color="#ca3538" title="Add to Bag" onPress={()=>{alert('Added to Bag')}}/>
                                    </View>
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


    _fetchData(){
        this.props.actions.fetchDataIfNeed(this.props.id);
    }

    /**
     * the speed of render is faster than that of getting setting value.
     * this is for when gets the setting value, home page decides whether to refresh the content.
     */
     componentDidMount(){
         //RCTDeviceEventEmitter.addListener('fetch', this._handleEventEmitter.bind(this));
         this._fetchData();
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
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.pdpDataState.loading,
        hasData: state.pdpDataState.hasData,
        dataSource: state.pdpDataState.dataSource,
        //dataTime: state.pdpDataState.dataTime,
        error: state.pdpDataState.error,
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

