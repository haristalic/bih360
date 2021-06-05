import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Overlay
} from 'react-native';


import SplachIcon from './util/SplashIcon';
import stackNav from './stacknav';
import SideMenu from './../SideMenu/SideMenu'
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'

class SplashScreen extends Component {
  constructor(props) {
    super(props)
    const drawernav = createDrawerNavigator({
      Item1: {
        screen: stackNav,
      }
    }, {
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width - 120,
      });
    const Navigation = createAppContainer(drawernav);
    this.state = {
      isLoaded: false,
      nav: Navigation
    }
  }
  componentDidMount() {

    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.setState({ component: <stackNav></stackNav>, isLoaded: true })
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  
  render() {
    const Navigation = this.state.nav;
    if (this.state.isLoaded) {
      return (<Navigation />)
    }
    return (
      <View style={styles.container}>
          <Image source={{uri: SplachIcon}} resizeMode={"cover"} style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SplashScreen;