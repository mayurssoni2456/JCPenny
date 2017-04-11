import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, ListView, TouchableHighlight, TextInput} from 'react-native';
import { Container, Title, Content, Text, Button, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
//import { Grid, Row } from 'react-native-easy-grid';

import Barcode from './Barcode';


class NearByListView extends Component {

  constructor(props){
    super(props);
  }

  renderBarcodeScanView() {
    this.props.navigator.push({
        component: Barcode
    });
  }

  render() {

    return(
      <Container>
        <Content>
          <ListItem itemHeader first style={{height:50, justifyContent:'space-between', alignItems:'flex-start'}}>
            <Text style={{fontSize:15, color:'#696969'}}>Nearby Stores</Text>
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
