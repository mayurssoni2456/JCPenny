
import React, { Component } from 'react';

import { Tabs, Tab, Icon } from 'react-native-elements'
import {StyleSheet, View, Text} from 'react-native';
import Shop from './Shop';
import Stores from './Stores';
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

   _renderContent = (color: string, pageText: string, num?: number) => {     
    return (
      <View style={{backgroundColor:'red', flex:1 }}> 
      <Text> hello </Text>  
      </View>
      ); 
    };


  render() {

  const { selectedTab } = this.state

    return (        
      
      // <Shop />

      <Tabs>              
        <Tab
        title={"Shop"}
        titleStyle={{fontWeight: 'bold', fontSize: 10}}
        selected={selectedTab === 'shop'}
        selectedTitleStyle={{marginTop: -1, marginBottom: 6}}                
        renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='shopping-basket' size={33} />}
        renderSelectedIcon={() => <Icon color={'#6296f9'} name='shopping-basket' size={30} />}
        onPress={() => this.changeTab('shop')}        
        >                    
        <Shop />
        </Tab>        
        <Tab
        title={"Store"}
        titleStyle={{fontWeight: 'bold', fontSize: 10}}
        selectedTitleStyle={{marginTop: -1, marginBottom: 6}}   
        selected={selectedTab === 'stores'}             
        renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='store' size={33} />}
        renderSelectedIcon={() => <Icon color={'#6296f9'} name='store' size={30} />}
        onPress={() => this.changeTab('stores')}>        
        <Stores />
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
