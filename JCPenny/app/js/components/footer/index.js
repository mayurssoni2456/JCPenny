
import React, { Component } from 'react';

import { Text, Footer, FooterTab, Button, Icon } from 'native-base';

import myTheme from '../../themes/base-theme';
import {Actions, ActionConst} from "react-native-router-flux";


export default class FooterBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    //this.props.navigateTo(route, 'Departments');
    if(route === 'Departments') {
      Actions.departments({ type: ActionConst.RESET });
    }
    else {
      Actions.stores({ type: ActionConst.RESET });
    }
    
  }

  render() {
    return (
      <Footer>
        <FooterTab>
            <Button onPress={() => this.navigateTo('Departments')}>
                <Icon name="home" />
                <Text>Departments</Text>
            </Button>
            <Button onPress={() => this.navigateTo('Stores')}>
                <Icon name="navigate" />
                <Text>Stores</Text>
            </Button>
        </FooterTab>
      </Footer>
    );
  }
}


