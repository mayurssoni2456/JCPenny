
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { View, TextInput, TouchableOpacity } from 'react-native';

//import navigateTo from '../../actions/footerNav';
import myTheme from '../../themes/base-theme';

import styles from './style';

export default class SearchBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
    //searchProducts: React.PropTypes.string
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'departments');
  }

  render() {
    return (
      <View style={{backgroundColor: '#f7f7f7', top:50}}>
        <InputGroup>                                             
          <Input placeholder="Search" value={this.state.searchText}  onChangeText={(text) => this.setState({searchText:text})}/>                    
          <Button transparent onPress={()=>this.pushRoute('plp')}><Text>Go</Text></Button>
        </InputGroup>                    
        
      </View>
    );
  }
}



