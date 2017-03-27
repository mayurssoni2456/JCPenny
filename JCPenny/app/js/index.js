import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Departments from './components/departments';
import SubCategories from './components/subCategories';
import PLP from './components/plp';
import PDP from './components/pdp';
import Footer from './components/footer';
import Stores from './components/stores';
import BarcodeScanner from './components/barcodeScanner';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst
} from 'react-native-router-flux';
import Error from './components/Error';
import Button from 'react-native-button';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};


class Main extends Component {
  render() {
    return (
      <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideTabBar>
          
            <Scene key="subCategories" component={SubCategories} title="Register" onRight={() => alert('Right button')}
                    rightTitle="Search"/>
            
            <Scene key="departments" component={Departments} title="Departments" initial onRight={() => alert('Right button')}
                    rightTitle="Search"/>

            <Scene key="stores" component={Stores} title="Stores" onRight={() => alert('Right button')}
                    rightTitle="Search"/>

            <Scene key="plp" component={PLP} title="PLP" onRight={() => alert('Right button')}
                    rightTitle="Search"/>

            <Scene key="pdp" component={PDP} title="PDP" onRight={() => alert('Right button')}
                    rightTitle="Search"/>

            <Scene key="barcodeScanner" component={BarcodeScanner} title="Barcode Scanner" onRight={() => alert('Right button')}
                    rightTitle="Search"/>
          
          </Scene>
          <Scene key="error" component={Error} />
        </Scene>
      </Router>
    );
  }
}

export default Main;
