import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, ListView, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Title, Content, Text, Button, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import styles from './styles';
import FooterBar from '../footer';
import HeaderBar from '../header';

const {
  //reset,
  pushRoute,
} = actions;

class Stores extends Component {

  static propTypes = {
    loading: React.PropTypes.bool,
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
      headerIconDetails: {
        rightHeaderIcon: 'search',
        rightHeaderIconAction: 'search'  
      },
      
      dataSource: ds.cloneWithRows([{name:'Loading', image: {url:'https://m.jcpenney.com/v4/stores/zipcode=80202'}}])
    }
  }

  componentDidMount() {
    var that = this;
    that.load();
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  load() {
    var that = this;
    // Set loading to true when the search starts to display a Spinner
    that.setState({
      loading: true
    });

    
    return fetch('https://m.jcpenney.com/v4/stores/zipcode=80202')
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

  render() {
    console.log(this.state.results);

    let counter = 0;
    return (
      <Container style={styles.container}>
      <HeaderBar title="Find Store" headerIconDetails={this.state.headerIconDetails} />  

        <TouchableHighlight style={{flexDirection:'row', flex:0.1, onPress={this.onMapClick}}}>

          <View style={{flexDirection:'row', padding:15,flex:0.1, borderBottomWidth:1,borderBottomColor:'lightgrey'}}>                    
          
            <View>
              <Icon active name='ios-navigate-outline' style={{color:'red', width:50, height:30,alignSelf:'center'}}/>            
            </View>   

           <View style={{flexDirection:'column', flex:0.8}}>
              <Text style={{fontSize:13, fontWeight:'600'}}>823030</Text>
              <Text style={{height:15, fontSize:12}}>Tap to change location </Text>
           </View>

           <View style={{flexDirection:'row', alignItems: 'center'}}>
              <Icon active name='map'/>
              <Text style={{color:'red', paddingLeft:10,fontSize:12}}>Map</Text>            
            </View>  

          </View>
        </TouchableHighlight>
      

      <Content>                      
      <ListItem itemHeader first>
        <Text style={{fontSize:12, color:'grey'}}>Nearby Stores</Text>
      </ListItem>        
      {this.state.loading ? 
        <Spinner /> :                                                     
        <List dataArray={this.state.results} renderRow={(item) =>                                    
          <ListItem button onPress={() => this.pushRoute('pdp', item.url)}>                  
          <View style={{flexDirection:'column', flex:1}}>

          <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
          <Text style={{fontWeight: 'bold', color: '#696969', fontSize: 14}}>{item.name}</Text>
          <Text style={{ color: '#696969', fontSize: 14,paddingLeft: 10}}>{item.distance} mi</Text>                      
          </View>                    
          <View style={{flexDirection:'row', paddingTop:5}} >
          <Text style={{color: '#696969', fontSize: 14,flexDirection:'row'}}>{item.street}</Text>                      
          </View>
          </View>                      
          </ListItem>
        } />
      }
      </Content>

      <FooterBar />
      </Container>
      );
  }
}

function bindAction(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Stores);