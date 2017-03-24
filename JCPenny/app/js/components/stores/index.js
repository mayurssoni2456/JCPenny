import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, ListView, TouchableHighlight, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Title, Content, Text, Button, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import styles from './styles';
import FooterBar from '../footer';
import HeaderBar from '../header';
import NearByListView from './NearByListView';
import StaticMap from '../map';

import { setMap } from '../../actions/map';

const {
  //reset,
  pushRoute,
} = actions;

class Stores extends Component {

  static propTypes = {
    zipcode: React.PropTypes.string,
    loading: React.PropTypes.bool,
    isMapEnabled: React.PropTypes.bool,
    pushRoute: React.PropTypes.func,
    results: React.PropTypes.arrayOf(React.PropTypes.string),
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    title: React.PropTypes.string,
    headerIconDetails: React.PropTypes.shape({
      key: React.PropTypes.string
    })
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      results: [],
      title: 'Stores',
      zipcode: '80202',
      isMapEnabled: false,
      headerIconDetails: {
        rightHeaderIcon: 'search',
        rightHeaderIconAction: 'search'
      },

      dataSource: ds.cloneWithRows([])
      //[{name:'Loading', image: {url:'https://m.jcpenney.com/v4/stores/zipcode=80202'}}]
    }
  }

  componentDidMount() {
    this.load();
  }

  load() {
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

   pushRoute(route, index) {
    this.props.setMap();
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  onChange(text)
  {
    this.setState({
      zipcode: text
    });
  }

  onSubmit()
  {
    this.load();
    this.forceUpdate();
  }
  onMapClick()
  {
    this.setState({
        isMapEnabled: !this.state.isMapEnabled
    });
      this.forceUpdate();
  }
  render() {
    console.log(this.state.results);

    let counter = 0;
    return (

      <Container style={styles.container}>
      <HeaderBar title="Find Store" headerIconDetails={this.state.headerIconDetails} />
      {/*  Search Header */}
        <View style={{flexDirection:'row', padding:10,flex:0.05, borderBottomWidth:1,borderBottomColor:'lightgrey'}}>


            <View>
              <Icon active name='ios-navigate-outline' style={{color:'red', width:30, height:30,alignSelf:'center'}}/>
            </View>

           <View style={styles.inputView}>
             <TextInput keyboardType = 'default' style={styles.input} onChangeText={this.onChange.bind(this)} onSubmitEditing={this.onSubmit.bind(this)}>
             </TextInput>
           </View>

           <TouchableHighlight onPress={this.onMapClick.bind(this)}>
                {
                   this.state.isMapEnabled ?
                   <View style={styles.mapIconView}>
                    <Icon active name='ios-list' style={{color:'red'}} />
                    <Text style={{color:'red', paddingLeft:10,fontSize:12}}>List</Text>
                  </View>
                  :
                    <View style={styles.mapIconView}>
                      <Icon active name='ios-pin-outline' style={{color:'red'}}/>
                      <Text style={{color:'red', paddingLeft:10,fontSize:12}}>Map</Text>
                    </View>
               }

          </TouchableHighlight>
        </View>
        <Content>
        {this.state.isMapEnabled ?
          <StaticMap stores={this.state.results}/> : <NearByListView results={this.state.results}/>
        }

        </Content>

      {/* <FooterBar /> */}
      </Container>
      );
  }
}

function bindAction(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    setMap:() => dispatch(setMap())
  };
}
const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Stores);
