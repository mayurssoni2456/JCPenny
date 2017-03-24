import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, ListView, TouchableHighlight, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Title, Content, Text, Button, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';



class NearByListView extends Component {

  static propTypes = {
    results: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  constructor(props)
  {
    super(props);

  }

  render() {

    return(
      <Container>
        <Content>
          <ListItem itemHeader first>
            <Text style={{fontSize:12, color:'grey'}}>Nearby Stores</Text>
          </ListItem>
          <List dataArray={this.props.results} renderRow={(item) =>
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
        </Content>
      </Container>
    );
  }
}
export default NearByListView;