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
		return(
				<View style={{flex: 1, backgroundColor:'red'}}>
				<Text>Department </Text>
				</View>
			);
	}
}
