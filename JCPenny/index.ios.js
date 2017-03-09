/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Tabs, Tab, Icon } from 'react-native-elements'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class JCPenny extends Component {

    constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'profile',
    };

    const { selectedTab } = this.state;

  }
  
  function changeTab (selectedTab) {
    this.setState({selectedTab})
  }

  render() {

    return (        
      <Tabs>
        <Tab
        titleStyle={{fontWeight: 'bold', fontSize: 10}}
        selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
        selected={selectedTab === 'feed'}
        title={selectedTab === 'feed' ? 'FEED' : null}
        renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='whatshot' size={33} />}
        renderSelectedIcon={() => <Icon color={'#6296f9'} name='whatshot' size={30} />}
        onPress={() => this.changeTab('feed')}>
        <Feed />
        </Tab>

        <Tab
        titleStyle={{fontWeight: 'bold', fontSize: 10}}
        selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
        selected={selectedTab === 'profile'}
        title={selectedTab === 'profile' ? 'PROFILE' : null}
        renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='person' size={33} />}
        renderSelectedIcon={() => <Icon color={'#6296f9'} name='person' size={30} />}
        onPress={() => this.changeTab('profile')}>
        <Profile />
        </Tab>

      </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('JCPenny', () => JCPenny);
