import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, ListView, TouchableHighlight, TextInput} from 'react-native';
//import { connect } from 'react-redux';
//import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Title, Content, Text, Button, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import {Actions} from "react-native-router-flux";


class NearByListView extends Component {

  static propTypes = {

  }

  constructor(props)
  {
    super(props);

  }

  renderBarcodeScanView() {
    Actions.barcodeScanner();
  }

  render() {

    return(
      <Container>
        <Content>
          <ListItem itemHeader first style={{height:40, justifyContent:'space-between', alignItems:'flex-start'}}>
            <Text style={{fontSize:14, color:'grey'}}>Nearby Stores</Text>
            <Button transparent onPress={() => this.renderBarcodeScanView()} style={{height:20}} iconRight>
              <Icon name='ios-barcode-outline' />
            </Button>
          </ListItem>
          <List dataArray={this.props.results} renderRow={(item) =>
            <ListItem>
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
        </Content>
      </Container>
    );
  }
}
export default NearByListView;
