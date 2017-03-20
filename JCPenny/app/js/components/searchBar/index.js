
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { View, TextInput, TouchableOpacity } from 'react-native';

import navigateTo from '../../actions/footerNav';
import myTheme from '../../themes/base-theme';

import styles from './style';

class SearchBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
    //searchProducts: React.PropTypes.string
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'departments');
  }

  render() {
    return (
      <View>
        <TextInput
          ref={(ref) => this.textInput = ref}
         
          
        />
       
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute))
  };
}

const mapStateToProps = state => ({
  //navigation: state.cardNavigation,
  //searchProducts: state.search.searchProducts
});

export default connect(mapStateToProps, bindAction)(SearchBar);
