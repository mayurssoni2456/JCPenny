'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Platform, TouchableNativeFeedback, TouchableHighlight, Linking, ListView, TextInput} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';

import px2dp from '../../utils/px2dp';

import colors from '../../constants/colors';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Toast from 'react-native-root-toast';

import { Container, Title, Content, Text, Button, Left, Body, Right, Spinner, Thumbnail, List, ListItem, Icon} from 'native-base';


import NearByListView from './NearByListView';
import StaticMap from './Map';
import Geocoder from 'react-native-geocoder';


class StoreFragment extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
          results: [],
          title: 'Stores',
          zipcode: '80202',
          isMapEnabled: false,
          initialPosition: 'unknown',
          latLong:{
            lat: 40.7809261,
            lng: -73.9637594
          },
          dataSource: ds.cloneWithRows([])
        }
    }

    render(){
        const {
            actions,
            isOpenThumbnail,
            isOpenNightMode,
            isAutoFetch,
            pageBackgroundColor,
            segmentColor
        } = this.props;

        return (
      <View style={styles.container}>
      <NavigationBar title="Stores"/>
        <ScrollView>
          <View style={{flexDirection:'row', padding:10,flex:0.01, borderBottomWidth:1,borderBottomColor:'lightgrey'}}>

            <TouchableHighlight onPress={this.currentLocation.bind(this)}>
              <View>
                <Icon active name='ios-navigate-outline' style={{color:'red', width:30, height:30,alignSelf:'center'}}/>
              </View>
            </TouchableHighlight>

             <View style={styles.inputView}>
               <TextInput value={this.state.zipcode} underlineColorAndroid='transparent' keyboardType = 'default' style={styles.input} onChangeText={this.onChange.bind(this)} onSubmitEditing={this.onSubmit.bind(this)}>
               </TextInput>
             </View>

             <TouchableHighlight onPress={this.onToggle.bind(this)}>
                  {
                     this.state.isMapEnabled ?
                     <View style={styles.mapIconView}>
                      <Icon active name='ios-list' style={{color:'red'}} />
                      <Text style={{color:'red', paddingLeft:10,fontSize:12}}>List</Text>
                    </View>
                    :
                      <View style={styles.mapIconView}>
                        <Icon active name='ios-pin-outline' style={{color:'red'}} />
                        <Text style={{color:'red', paddingLeft:10,fontSize:12}}>Map</Text>
                      </View>
                 }

            </TouchableHighlight>
          </View>
          <Content>
          {this.state.isMapEnabled ?
            <StaticMap stores={this.state.results}/> : <NearByListView results={this.state.results} navigator={this.props.navigator}/>
          }

          </Content>
        </ScrollView>
      </View>
      );

    }

    _renderTitleContent(){
        const {mainThemeColor, segmentColor, titleColor, rowItemBackgroundColor, arrowColor} = this.props;
        return(
            <View style={[styles.block, styles.intro, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                <View style={styles.introLeft}>
                    <Avatar text="Gank" width={px2dp(50)} backgroundColor={mainThemeColor}/>
                </View>
                <View style={styles.introRight}>
                    <Text style={[styles.title, {color: titleColor}]}>Gank.io</Text>
                    <Icon name="ios-arrow-forward" color={arrowColor} size={px2dp(25)}/>
                </View>
            </View>
        );
    }





  componentDidMount() {
    this.fetchStores();
    this.setupGeoLocation();
  }

  componentWillUnmount(){
      navigator.geolocation.clearWatch(this.watchID);
  }

  setupGeoLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        // here it is showing undefined
        let latLong = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.setState({latLong});
        this.getZipCode();
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });


  }

  getZipCode() {
    Geocoder.geocodePosition(this.state.latLong).then(res => {
      console.log(res);
      console.log(res[0].postalCode);
      this.setState(
        {

          zipcode: res[0].postalCode
        }
      );
    })
    .catch(err => console.log(err))
  }

  fetchStores() {
    var that = this;
    // Set loading to true when the search starts to display a Spinner
    this.setState({
      loading: true
    });

    var urlString = 'https://m.jcpenney.com/v4/stores/zipcode='+this.state.zipcode;
    console.log(urlString);

    return fetch(urlString)
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to
          // false to remove the spinner and display the list of categories
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           that.setState({
            results: responseJson.stores,
            loading: false,
            dataSource:ds.cloneWithRows(responseJson.stores)
        });
      })
      .catch((error) => {

          that.setState({
              loading: false
          });

          console.error(error);
      });
  }

  onChange(text){
    this.setState({
      zipcode: text
    });
  }

  onSubmit(){
    this.fetchStores();
    this.forceUpdate();
  }
  onToggle() {
    this.setState({
        isMapEnabled: !this.state.isMapEnabled
    });
  }

  currentLocation() {
    this.setupGeoLocation();
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#FFFFFF',
  },
  intro: {
      width: theme.screenWidth,
      height: px2dp(80),
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: px2dp(20),
      paddingRight: px2dp(20)
  },
  introLeft: {
      flex: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },
  introRight:{
      flex: 80,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: px2dp(10)
  },
  title: {
      fontSize: px2dp(23),
  },
  block: {
      marginTop: px2dp(12),
      borderBottomWidth: theme.segment.width,
      borderTopWidth: theme.segment.width
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
    height: 150,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  inputView:{
    flex:1,
    height: 32,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    justifyContent:'flex-start',
    marginRight:10,
    marginLeft:5
  },
  mapIconView:{
    flexDirection:'row',
    alignItems: 'center',

  },
  input: {
    height: 38,
  }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: theme.mainThemeColor,
        pageBackgroundColor: theme.pageBackgroundColor,
        rowItemBackgroundColor: theme.rowItemBackgroundColor,
        segmentColor: theme.segmentColor,
        titleColor: theme.titleColor,
        arrowColor: theme.arrowColor
    };
};



export default connect(mapStateToProps)(StoreFragment);