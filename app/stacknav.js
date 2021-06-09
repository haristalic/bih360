import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import IOSIcon from "react-native-vector-icons/Ionicons";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import DetailScreen from "./object/ObjectNavigation";
import AddObject from "./AddObject";
import AboutScreen from './AboutScreen'
import KontaktScreen from './KontaktScreen'
import QuestionScreen from './QuestionsScreen'
import TermsScreen from './TermsScreen'
const logoIcon = require('../assets/icons/logowhite.png');
import logoblueicon from "./util/LogoBlueIcon";
import logowhiteicon from "./util/LogoWhite";
import SingleBlog from './SingleBlog';

import HomeNavigationScreen from './HomeNavigation'
import BlogScreen from './home/BlogScreen';

const stackNav = createStackNavigator({
  Main: {
    screen: HomeNavigationScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Image source={{ uri: logowhiteicon }}  resizeMode="contain" style={{ height: 68, width: 100, flex: 1}} />
      ), headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', textAlign: 'center', justifyContent: 'center' },
      headerRight: (<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" color="#ffffff" size={30} style={{ marginHorizontal: 15 }} />
      </TouchableOpacity>
      ),headerLeft:null,
      backgroundColor: "#0091D4",
    }),
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Text style={{color:"#ffffff", fontSize:18}}>{navigation.state.params?navigation.state.params.title:""}</Text>
      ),
    }),
  },
  AddObject: {
    screen: AddObject,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Text style={{color:"#ffffff", fontSize:18}}>{navigation.state.params?navigation.state.params.title:""}</Text>
      ),
    }),
  },
  AboutScreen: {
    screen: AboutScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Text style={{color:"#ffffff", fontSize:18}}>{navigation.state.params?navigation.state.params.title:""}</Text>
      ),
    }),
  },
  KontaktScreen: {
    screen: KontaktScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Text style={{color:"#ffffff", fontSize:18}}>{navigation.state.params?navigation.state.params.title:""}</Text>
      ),
    }),
  },
  QuestionsScreen: {
    screen: QuestionScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Text style={{color:"#ffffff", fontSize:18}}>{navigation.state.params?navigation.state.params.title:""}</Text>
      ),
    }),
  },
  TermsScreen: {
    screen: TermsScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Text style={{color:"#ffffff", fontSize:18}}>{navigation.state.params?navigation.state.params.title:""}</Text>
      ),
    }),
  },
  SingleBlog: {
    screen: SingleBlog,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Image source={{ uri: logowhiteicon }}  resizeMode="contain" style={{ height: 68, width: 100, flex: 1}} />
      ), headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', textAlign: 'center', justifyContent: 'center' },
      headerRight: (<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" color="#ffffff" size={30} style={{ marginHorizontal: 15 }} />
      </TouchableOpacity>
      ),
      backgroundColor: "#0091D4",
    }),
  }
},
  {
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: "#0091D4",
      },
      headerTitleStyle: {
        color: "#ffffff",
      },
      headerTintColor: "#ffffff",
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          {Platform.OS === 'ios' ?
            <Ionicons name="ios-arrow-back" size={24} color={"#ffffff"} /> :
            <MaterialIcons name="arrow-back" size={24} color={"#ffffff"} />
          }

        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNav);