
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental, View } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import Departments from './components/departments/';
import SubCategories from './components/subCategories';
import SplashPage from './components/splashscreen/';
import Stores from './components/stores';
import PLP from './components/plp';
import PDP from './components/pdp';
import Map from './components/map';

import { statusBarColor } from './themes/base-theme';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'departments' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }


  popRoute() {
    this.props.popRoute();
  }


  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'departments':
        return <Departments />;
      case 'subCategories':
        return <SubCategories />;
      case 'stores':
        return <Stores />;
      case 'plp':
        return <PLP />;
      case 'pdp':
        return <PDP />;
      case 'pdp':
        return <PDP />;
      case 'map':
        return <Map />;
      default :
        return <Departments />;
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
