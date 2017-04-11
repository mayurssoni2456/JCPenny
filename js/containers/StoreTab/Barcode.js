'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Camera from 'react-native-camera';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';

class BadInstagramCloneApp extends BackPageComponent {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      cameraType: 'back',
      text: '',
      torchMode: 'off',
      type: '',
    };
  }

  barcodeReceived(e) {
    //if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
    
    this.setState({
      barcode: e.data,
      text: `${e.data} (${e.type})`,
      type: e.type,
    });
    alert(e.data)
    /*this.props.navigator.push({
        component: PDP,
        args: {id: product.id, navigator: this.props.navigator, title: product.name}
    });*/
    //Actions.pdp({pdpUrl:'http://m.jcpenney.com/v4/barcodes/5184550020909'})
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.pageBackgroundColor}]}>
        <NavigationBar
          title="Barcode Scanner"
          isBackBtnOnLeft={true}
          leftBtnIcon="arrow-back"
          leftBtnPress={this._handleBack.bind(this)} />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.barcodeReceived.bind(this)}>
        </Camera>
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.toolbar.paddingTop
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
});

module.exports = BadInstagramCloneApp;

