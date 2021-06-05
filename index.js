
import {AppRegistry} from 'react-native';
import App from './App'; // main app file of Expo
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// import { AppRegistry, Platform } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('bih360', () => App);

// if (Platform.OS === 'web') {
//   const rootTag = document.getElementById('root') || document.getElementById('main');
//   AppRegistry.runApplication('bih360', { rootTag });
// }
