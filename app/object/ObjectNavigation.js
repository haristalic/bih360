import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image
} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons, MaterialIcons,Feather, Entypo  } from '@expo/vector-icons';
import { Font } from 'expo-font';

import InfoScreen from './screens/InfoScreen'
import EventScreen from './screens/EventScreen'
import PriceScreen from './screens/PriceScreen'
import GalleryScreen from './screens/GalleryScreen'
import VirtualScreen from './screens/VirtualScreen'
import VideoScreen from './screens/VideoScreen'

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderBottomColor: "#ffffff",
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: "#0091D4",
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  headerCaption: {
    color: "#ffffff",
    fontSize: 18,
  },
});

const TABS = {
  Info: {
    screen: InfoScreen,
    navigationOptions: {
      header: (
        <View style={styles.headerContainer}>
          <MaterialIcons name="info" size={24} color="#9B9B9B" />
          <Text style={styles.headerCaption}>Info</Text>
        </View>
      ),
    },
  },
  Cijenik: {
    screen: PriceScreen,
   
  },
  Događaji: {
    screen: EventScreen,
    navigationOptions: {
      header: (
        <View style={styles.headerContainer}>
          <MaterialIcons name="date-range" size={24} color="#9B9B9B" />
          <Text style={styles.headerCaption}>Događaji</Text>
        </View>
      ),
    },
  },
  Virtual: {
    screen: VirtualScreen,
    navigationOptions: {
      header: (
        <View style={styles.headerContainer}>
          <MaterialIcons name="3d-rotation" size={24} color="#9B9B9B" />
          <Text style={styles.headerCaption}>360</Text>
        </View>
      ),
    },
  },
  Video: {
    screen: VideoScreen,
    navigationOptions: {
      header: (
        <View style={styles.headerContainer}>
      <Feather name="video" size={24} color="#ffffff" />    
      <Text style={styles.headerCaption}>Video</Text>
        </View>
      ),
    },
  },
};

export default class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
  }
  _tabNavigator() {
    const location = this.props.navigation.state.params;
    console.log(location.fromEvents)
    const tabs = {};
    tabs.Info = TABS.Info;
    console.log(location);
      tabs.Cijenik = TABS.Cijenik;
      tabs.Događaji = TABS.Događaji;
      tabs.Video = TABS.Video
      tabs.Virtual = TABS.Virtual;
 

    return createBottomTabNavigator(
      tabs,
      {
        initialRouteName: location.fromEvents?"Događaji":"Info",
        defaultNavigationOptions: ({ navigation }) => ({
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            let iconSource;          

            switch (routeName) {
              case 'Info':
                iconSource = "info";

                break;
              case 'Događaji':
                iconSource = "date-range";
                break;
              case 'Cijenik':
                iconSource = "local-offer";
                break;
              case 'Galerija':
                iconSource = "photo-library";
                break;
              case 'Virtual':
                iconSource = "3d-rotation";
                break;
              case 'Video':
                iconSource = "videocam";
                break;
              default:
                iconSource = "local-offer";
            }
            return (
              
              <View style={styles.tabBarItemContainer}>
                <MaterialIcons name={iconSource} size={24} color={focused ? "#ffffff" : "#376894"} />
              </View>
            );
          },
        }),
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
          showLabel: true,
          style: {
            backgroundColor: "#0091D4",
            borderTopWidth: 0.5,
            borderTopColor: '#0091D4',
          },
          labelStyle: {
            color: "#ffffff",
          },
        },
      },
    );
  }
  render() {
    const Tabs = this._tabNavigator.bind(this)();
    const Container = createAppContainer.bind(this)(Tabs);
    return (
      <Container screenProps={this.props.navigation} />
    );
  }
}

/*export default createBottomTabNavigator(
    TABS,
    {
      defaultNavigationOptions: ({ navigation }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state;
          let iconSource;
          switch (routeName) {
            case 'Info':
              iconSource = "info";
              break;
            case 'Događaji':
              iconSource = "date-range";
              break;
            case 'Cijenik':
              iconSource = "local-offer";
              break;
            case 'Galerija':
              iconSource = "photo-library";
              break;
            case 'Virtual':
              iconSource = "3d-rotation";
              break;
            default:
              iconSource = "local-offer";
          }
          return (
            <View style={styles.tabBarItemContainer}>
              <MaterialIcons name={iconSource} size={24} color={focused?"#0C8BB2":"#9B9B9B"} />
            </View>
          );
        },
      }),
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: true,
        style: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0.5,
          borderTopColor: '#d6d6d6',
        },
        labelStyle: {
          color: "#acacac",
        },
      },
    },
  );*/
