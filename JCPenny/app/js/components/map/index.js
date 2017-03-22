import React from 'react';
import styles from './styles';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';
import HeaderBar from '../header';
import { Container, Title, Content, Button, Icon, Left, Body, Right, Spinner, Thumbnail} from 'native-base';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class StaticMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Map',
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      headerIconDetails: {
        leftHeaderIcon:'ios-arrow-back',
        leftHeaderIconAction: 'popRoute',            
      }
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <HeaderBar title={this.state.title} headerIconDetails={this.state.headerIconDetails} /> 
          <Content>            
              <ScrollView                                
              >         
                <MapView 
                  provider={this.props.provider}
                  style={styleMap.map}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  pitchEnabled={false}
                  rotateEnabled={false}
                  initialRegion={this.state.region}
                >          
                </MapView>         
              </ScrollView>            
        </Content>
      </Container>
    );
  }
}

StaticMap.propTypes = {
  provider: MapView.ProviderPropType,
};

const styleMap = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    width: 250,
    height: 250,
  },
});

module.exports = StaticMap;
