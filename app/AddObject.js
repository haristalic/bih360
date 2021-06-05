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
          Dodaj novi objekat
        </Text>
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryBold }}>
          Osnovni podaci objekta
        </Text>
        <TextField label="Naziv objekta" containerStyle={{ marginLeft: 16, marginRight: 16, marginTop: 24 }} />

        <Dropdown
          containerStyle={{ marginLeft: 16, marginRight: 16 }}
          label='Grad'
          data={this.state.cities}
        />
        <TextField label="Adresa" containerStyle={{ marginLeft: 16, marginRight: 16 }} />

        <MapView
          style={{ width: Dimensions.get('screen').width - 32, height: 240, marginBottom: 16, marginLeft: 16, marginTop: 30 }}
          initialRegion={{
            latitude: 43.342666,
            longitude: 17.8142463,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0221,
          }}
        >
        </MapView>

        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryBold }}>
          Radno vrijeme
        </Text>

        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 36 }}>
          <CheckBox title="Ponedjeljak" containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
          checked={this.state.checkPon} onPress={()=> { this.setState({checkPon: !this.state.checkPon}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Od'
              data={time}
            />
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Do'
              data={time}
            />
          </View>
        </View>

        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Utorak" containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
          checked={this.state.checkUto} onPress={()=> { this.setState({checkUto: !this.state.checkUto}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Od'
              data={time}
            />
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Srijeda" containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
          checked={this.state.checkSri} onPress={()=> { this.setState({checkSri: !this.state.checkSri}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Od'
              data={time}
            />
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Četvrtak" containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
          checked={this.state.checkCet} onPress={()=> { this.setState({checkCet: !this.state.checkCet}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Od'
              data={time}
            />
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Petak" containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
          checked={this.state.checkPet} onPress={()=> { this.setState({checkPet: !this.state.checkPet}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Od'
              data={time}
            />
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Subota" containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
          checked={this.state.checkSub} onPress={()=> { this.setState({checkSub: !this.state.checkSub}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Od'
              data={time}
            />
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Nedjelja" containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
          checked={this.state.checkNed} onPress={()=> { this.setState({checkNed: !this.state.checkNed}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Od'
              data={time}
            />
            <Dropdown
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 24 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 36,
            borderBottomColor: '#D1D3D4',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryBold }}>
          Kratki opis objekta
        </Text>
        <TextField label="Opis objekta" containerStyle={{ marginLeft: 16, marginRight: 16, marginTop: 24 }} />
        <View
          style={{
            marginTop: 36,
            borderBottomColor: '#D1D3D4',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryBold }}>
          Kontakt podaci (potrebni za verifikaciju objekta)
        </Text>
        <TextField label="Email" containerStyle={{ marginLeft: 16, marginRight: 16, marginTop: 24 }} />
        <TextField label="Broj telefona" containerStyle={{ marginLeft: 16, marginRight: 16, marginTop: 24 }} />
        <View
          style={{
            marginTop: 36,
            borderBottomColor: '#D1D3D4',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <CheckBox title="Prihvaćam opće uvjete i slažem se sa svim pravilima" containerStyle={{ paddingLeft: 16, paddingRight: 16, backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
        checked={this.state.checkUslovi} onPress={()=> { this.setState({checkUslovi: !this.state.checkUslovi}) }}/>
        <View style={{ marginLeft: 16, marginTop: 16, marginBottom: 46 }}>
          <TouchableOpacity onPress={()=>{
            if(this.state.checkUslovi)
            {
              this.props.navigation.pop()
              alert('Uspješno')
            }else{
              alert("Uslovi korištenja nisu prihvaćeni")
            }
            
            }}>
            <View style={{ height: 56, borderColor: "#0C8BB2", backgroundColor: "#0C8BB2", borderWidth: 1, borderRadius: 4, display: "flex", flexDirection: "row", justifyContent: "center", width: Dimensions.get('screen').width - 32 }}>
              <Text style={{ color: "#ffffff", fontSize: 16, marginTop: 16, marginLeft: 16, fontFamily: fonts.primaryBold }}>
                DODAJ OBJEKAT
                 </Text>
            </View>
          </TouchableOpacity>
        </View>

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