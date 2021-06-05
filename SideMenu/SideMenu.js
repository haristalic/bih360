import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { StackNavigator } from 'react-navigation';

const logoIcon = require('../assets/icons/logo.png');
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import logoblueicon from '../app/util/LogoBlueIcon'

import { fonts } from '../styles/fonts';
import { Font } from 'expo-font';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, }
  }
  componentDidMount() {
    this.loadAssetsAsync()
  }
  loadAssetsAsync = async () => {
    await Font.loadAsync({
      "Roboto-Regular": require("../assets/fonts/rregular.ttf"),
      "Roboto-Medium": require("../assets/fonts/rmedium.ttf"),
      "Roboto-Light": require("../assets/fonts/rlight.ttf"),
      "Roboto-Bold": require("../assets/fonts/rbold.ttf"),
    })
    this.setState({ fontLoaded: true })
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _openArticle() {
    const { navigate } = this.props.navigation;
    navigate({
      routeName: 'AddObject',
    });
  };

  _openScreen(screen) {
    const { navigate } = this.props.navigation;
    navigate({
      routeName: screen,
    });
  };
  render() {
    if (!this.state.fontLoaded) {
      return <View />
    }
    return (
      <View style={{ paddingTop: 36, backgroundColor: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "space-between", height: Dimensions.get('screen').height }}>
        <View style={{ display: "flex" }}>
          <View style={{ marginLeft: 16, display: "flex", justifyContent: "flex-start", flexDirection: "row", }}>
            <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
              <MaterialIcons name="close" size={32} color="#4A4A4A" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => this._openScreen('AboutScreen')}>
            <Text style={{ color: "#4A4A4A", marginLeft: 16, marginTop: 24, fontSize: 18 }}>
              O nama
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._openScreen('KontaktScreen')}>
            <Text style={{ color: "#4A4A4A", marginLeft: 16, marginTop: 24, fontSize: 18 }}>
              Kontakt
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._openScreen('TermsScreen')}>
            <Text style={{ color: "#4A4A4A", marginLeft: 16, marginTop: 24, fontSize: 18 }}>
              Uvjeti korištenja
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._openScreen('QuestionsScreen')}>
            <Text style={{ color: "#4A4A4A", marginLeft: 16, marginTop: 24, fontSize: 18 }}>
              Najčešća pitanja
          </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._openArticle()}>
            <Text style={{ color: "#4A4A4A", marginLeft: 16, marginTop: 24, fontSize: 18 }}>
              Dodaj objekat
          </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 16,
              borderBottomColor: '#D1D3D4',
              borderBottomWidth: StyleSheet.hairlineWidth,
              display:"none",
            }}
          />
          <TouchableOpacity onPress={() => this._openArticle()} style={{display:"none"}}>
            <View style={{ marginTop: 24, marginLeft: 16, marginRight: 16, borderWidth: 1, borderColor: "#0C8BB2", borderRadius: 4, height: 49, display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ marginTop: 14, fontSize: 18, color: "#0C8BB2" }}>
                Dodaj objekat
            </Text>
            </View>
          </TouchableOpacity>

        </View>
        <View style={{ display: "none", justifyContent: "flex-end", marginBottom: 16 }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/360bih.ba/')}>
              <FontAwesome name="facebook-square" size={40} color="#0C8BB2" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/360bih.ba/')}>
              <FontAwesome name="instagram" size={40} color="#0C8BB2" />
            </TouchableOpacity>
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginLeft: 16, marginRight: 16 }}>
            <Image source={{ uri: logoblueicon }} style={{ width: 100, height: 27, marginTop: 26, }}></Image>
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginLeft: 16, marginRight: 16, marginTop: 8, marginBottom: 24 }}>
            <Text style={{ fontSize: 13, color: "#9B9B9B" }}>Copyright © 2019 360bih</Text>
          </View>

        </View>

      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;