import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  RefreshControl,
  Dimensions,
  SectionList,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
  TextInput,
  Picker,
} from 'react-native';

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

import {
  CheckBox
} from 'react-native-elements'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Dropdown } from 'react-native-material-dropdown';


import moment from 'moment';


import Dialog, { DialogContent } from 'react-native-popup-dialog';

import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
const data = [{
  value: '01:00',
}, {
  value: '02:00',
}, {
  value: '3',
}];
class AddObject extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      cities: [],
      checkPon: false,
      checkUto: false,
      checkSri: false,
      checkCet: false,
      checkPet: false,
      checkSub: false,
      checkNed: false,
      checkUslovi: false,
    }
  }
  componentDidMount() {
    fetch('https://api.360bih.ba/api/cities')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          cities: responseJson,
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    var time = []
    for (var i = 1; i <= 24; i++) {
      var el = { value: (i < 10 ? "0" + i : i + "") + ":00" }
      time.push(el)
    }

    var cities = []
    console.log(this.state.cities)
    if (this.state.cities) {
      this.state.cities.forEach(el => {
        el.value = el.name
      })
    }
    return (
      <ScrollView>
        <Text style={{ fontSize: 24, color: "#4A4A4A", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryRegular }}>
          Najčešća pitanja
        </Text>
      </ScrollView>
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

export default AddObject;