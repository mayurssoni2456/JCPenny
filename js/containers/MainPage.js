/**
 * Created by wangdi on 22/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragment from './HomeTab/index';
import StoreFragment from './StoreTab/index';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import {connect} from 'react-redux';
import {store} from '../store/index';
//import {initialSettingsStateFacade} from '../actions/modifySettings';

class MainPage extends Component{

    render(){
        return(
            <BottomTabBar
                navigator={this.props.navigator}
                mainThemeColor={this.props.mainThemeColor}
                rowItemBackgroundColor={this.props.rowItemBackgroundColor}
                tabIconColor={this.props.tabIconColor}
            />
        );
    }
}

class BottomTabBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }

    _renderItem(Component, tab, tabName, normalIcon, selectedIcon){
        const {navigator, tabIconColor} = this.props;
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === tab}
                title={tabName}
                selectedTitleStyle={{color: tabIconColor}}
                renderIcon={() => <Image style={styles.tabBarItemIcon} source={normalIcon} />}
                renderSelectedIcon={() => <Image style={[styles.tabBarItemIcon, {tintColor: tabIconColor}]} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: tab })}>
                {<Component navigator={navigator}/>}
            </TabNavigator.Item>
        );
    }

    render(){
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={[styles.tabBarStyle, {backgroundColor: this.props.rowItemBackgroundColor}]}
                sceneStyle={{
                    paddingTop: theme.toolbar.paddingTop, //immersive experience
                    paddingBottom: styles.tabBarStyle.height}}>
                {this._renderItem(HomeFragment, 'home', 'Departments', this.state.homeNormal, this.state.homeSelected)}
                {this._renderItem(StoreFragment, 'more', 'Stores', this.state.compassNormal, this.state.compassSelected)}
            </TabNavigator>
        );
    }

    componentWillMount(){
        const tabIconColor = this.props.tabIconColor;
        if(Platform.OS === 'ios') {
            Icon.getImageSource('ios-home-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({homeNormal: source}));
            Icon.getImageSource('ios-home-outline', 100, tabIconColor).then((source) => this.setState({homeSelected: source}));
            Icon.getImageSource('ios-compass-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({compassNormal: source}));
            Icon.getImageSource('ios-compass-outline', 100, tabIconColor).then((source) => this.setState({compassSelected: source}));
            Icon.getImageSource('ios-list-box-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({moreNormal: source}));
            Icon.getImageSource('ios-list-box-outline', 100, tabIconColor).then((source) => this.setState({moreSelected: source}));
            Icon.getImageSource('ios-cube-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({collectionNormal: source}));
            Icon.getImageSource('ios-cube-outline', 100, tabIconColor).then((source) => this.setState({collectionSelected: source}));
        }else if(Platform.OS === 'android'){
            Icon.getImageSource('md-home', 100, theme.tabButton.normalColor).then((source) => this.setState({homeNormal: source}));
            Icon.getImageSource('md-home', 100, tabIconColor).then((source) => this.setState({homeSelected: source}));
            Icon.getImageSource('md-compass', 100, theme.tabButton.normalColor).then((source) => this.setState({compassNormal: source}));
            Icon.getImageSource('md-compass', 100, tabIconColor).then((source) => this.setState({compassSelected: source}));
            Icon.getImageSource('md-list-box', 100, theme.tabButton.normalColor).then((source) => this.setState({moreNormal: source}));
            Icon.getImageSource('md-list-box', 100, tabIconColor).then((source) => this.setState({moreSelected: source}));
            Icon.getImageSource('md-cube', 100, theme.tabButton.normalColor).then((source) => this.setState({collectionNormal: source}));
            Icon.getImageSource('md-cube', 100, tabIconColor).then((source) => this.setState({collectionSelected: source}));
        }
    }

    componentDidMount(){
        //store.dispatch(initialSettingsStateFacade());
    }
}

const mapStateToProps = (state) => {
    return {
        mainThemeColor: theme.mainThemeColor,
        rowItemBackgroundColor: theme.rowItemBackgroundColor,
        tabIconColor: theme.tabIconColor
    };
};

const styles = {
    tabBarItemIcon: {
        width: px2dp(20),
        height: px2dp(20)
    },
    tabBarStyle: {
        height: px2dp(50),
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? px2dp(6) : px2dp(3)
    }
}

export default connect(mapStateToProps)(MainPage);