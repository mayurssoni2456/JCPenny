'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/requestDepartmentData';
import {TextInput, Platform, StyleSheet, Button, View, Text, ScrollView, Animated, ActivityIndicator,Image, RefreshControl, ListView, TouchableOpacity, TouchableHighlight} from 'react-native';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import BackPageComponent from '../components/BackPageComponent';
import NavigationBar from '../components/NavigationBar';
//import {getCurrentDate} from '../../utils/getDate';
import colors from '../constants/colors';
import { Container, Title, Content, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import PLP from './HomeTab/PLP';

class SearchBar extends BackPageComponent{
    constructor(props){
        super(props);
        this.state = {
            searchText:''
        }
        this._handleTextInput = this._handleTextInput.bind(this);
    }

    _itemPressCallback(){
        this._pushScene(PLP, this.state.searchText)
    }

    _pushScene(component, search){
        var handleSearchText = search.split(' ').join('%20');
        this.props.navigator.push({
            component: component,
            args: {navigator: this.props.navigator, searchText: handleSearchText, title: search}
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar title="Search" 
                    isBackBtnOnLeft={true}
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                    navigator = {this.props.navigator}
                />
                <View style={styles.searchbox}>
                    <View style={styles.searchboxBorder}>
                        <TextInput
                            style={styles.textInput}
                            returnKeyType={'search'}
                            value={this.state.searchText}
                            onChange={this._handleTextInput}
                            underlineColorAndroid="transparent"
                        />
                        <Button title='Go' onPress={()=>this._itemPressCallback('plp')}/>
                    </View>
                </View>
            </View>

        );
    }

    _handleTextInput(event) {
        const text = event.nativeEvent.text;
        this.setState({searchText:text})
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a'
    },
    textInput: {
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                height: 35
            },
            android: {
                height: 48
            }
        })
    },
    searchboxBorder: {
        borderRadius: 3,
        backgroundColor: 'white',
        paddingHorizontal: 3,

    },
    searchbox: {
        backgroundColor: '#191919',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 16
    },
    seperator: {
        marginTop: 10,
        backgroundColor: '#8E8E8E'
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);