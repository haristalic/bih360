import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image
} from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Font } from 'expo-font';

import { FontAwesome5 } from '@expo/vector-icons'; 

import ObjectsScreen from './home/ObjectsScreen'
import EventsScreen from './home/EventsScreen'
import BlogScreen from './home/BlogScreen'
import SelectCityScreen from './SelectCityScreen'


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



export default createBottomTabNavigator(
    {Objekti: {
      screen: ObjectsScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Text style={styles.headerCaption}>Objekti</Text>
          </View>
        ),
      },
      },
      

      Blog: {
        screen: BlogScreen,
        navigationOptions: {
          header: (
            <View style={styles.headerContainer}>
              <Text style={styles.headerCaption}>Blog</Text>
            </View>
          ),
        },
      },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        // eslint-disable-next-line react/prop-types
      
      tabBarIcon: ({ focused }) => { 
        console.log(navigation); 
          const { routeName } = navigation.state;
          let iconSource;
          switch (routeName) {
            case 'Objekti':
              iconSource = "building";
              break;
          
            case 'Blog':
              iconSource = "blog";
              break;
            default:
              iconSource = "blog";
          }
          return (
            <View style={styles.tabBarItemContainer}>
              <FontAwesome5 name={iconSource} size={24} color={focused?"#ffffff":"#376894"} />
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
  