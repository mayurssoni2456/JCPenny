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
// const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class StaticMap extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.stores);
    this.state = {
      title: 'Map',
      region: {
        latitude: this.props.stores[0].latitude,
        longitude: this.props.stores[0].longitude,        
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      stores:[],
    };
  }

  render() {
    
    return (


      <Container style={styles.container}>
          <Content>
            <ScrollView>
              <MapView
                provider={this.props.provider}
                style={styleMap.map}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={false}
                rotateEnabled={false}
                initialRegion={this.state.region}
                >
                {this.props.stores.map(marker => (

                  <MapView.Marker
                    coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                    title={marker.name}
                    key={marker.id}
                    description={marker.street}
                  />
                ))}
              </MapView>
            </ScrollView>
          </Content>
      </Container>
    );
  }
}

StaticMap.propTypes = {
  provider: MapView.ProviderPropType,
  //stores: React.PropTypes.arrayOf(React.PropTypes.string),
};

const styleMap = StyleSheet.create({
  container: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    width: 400,
    height: 400,
  },
});

module.exports = StaticMap;
