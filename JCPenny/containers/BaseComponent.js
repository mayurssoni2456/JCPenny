
import React, { Component } from 'react';

import { Tabs, Tab, Icon } from 'react-native-elements'
import {StyleSheet, View, Text} from 'react-native';
import shop from './Shop';
export default class BaseComponent extends Component {

 constructor(props) {
    super(props);
      console.log("baseComponent");

    this.state = {
      selectedTab: 'shop',
    };
  }
    

  changeTab (selectedTab) {
    this.setState({selectedTab})    
  }

   _renderContent = (color: string, pageText: string, num?: number) => { return ( <View style={[styles.tabContent, {backgroundColor: color}]}> <Text style={styles.tabText}>{pageText}</Text> <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text> </View> ); };


  render() {

  const { selectedTab } = this.state

    return (        
      
      <Tabs>              
        <Tab
        title={"Shop"}
        titleStyle={{fontWeight: 'bold', fontSize: 10}}
        selectedTitleStyle={{marginTop: -1, marginBottom: 6}}                
        renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='shopping-basket' size={33} />}
        renderSelectedIcon={() => <Icon color={'#6296f9'} name='shopping-basket' size={30} />}
        onPress={() => this.changeTab('shop')}>      
        <shop />         
        </Tab>
        <Tab
        title={"Store"}
        titleStyle={{fontWeight: 'bold', fontSize: 10}}
        selectedTitleStyle={{marginTop: -1, marginBottom: 6}}                
        renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='store' size={33} />}
        renderSelectedIcon={() => <Icon color={'#6296f9'} name='store' size={30} />}
        onPress={() => this.changeTab('profile')}>        
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
    backgroundColor: 'green',
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
