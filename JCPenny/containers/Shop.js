import React, {Component} from 'react';
import {Icon } from 'react-native-elements'
import {View, Text, TouchableOpacity} from 'react-native';

export default class Shop extends Component {

	constructor(props)
	{
		super(props);
		console.log("Shop component");
	}
	render()
	{
		console.log("shop loaded")
		return(
				<View style={{flex: 1, backgroundColor:'red', justifyContent:'center'}}>
				<Text >Department </Text>
				</View>
			);
	}
}
