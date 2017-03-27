import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

import Main from './app/js/index';

AppRegistry.registerComponent('JCPenny', () => Main);
