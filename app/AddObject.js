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
import { Ionicons, MaterialIcons,AntDesign } from '@expo/vector-icons';

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
        <Text style={{ fontSize: 30, color: "#3f4968", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryMedium}}>
          Dodaj novi objekat
        </Text>
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 30, fontFamily: fonts.primaryMedium }}>
          Naziv objekta        
        </Text>
        <TextField label="npr. Restoran Vanilla" containerStyle={{ marginLeft: 16, marginRight: 16 }} />
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryMedium }}>
          Odabir grada       
        </Text>
        <Dropdown
        renderAccessory={()=> <View style={{}}>
        <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
              </View>}
          containerStyle={{ marginLeft: 16, marginRight: 16 }}
          label='Grad'
          data={this.state.cities}
        />
          <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryMedium }}>
          Adresa      
        </Text>
        <TextField label="Adresa" containerStyle={{ marginLeft: 16, marginRight: 16 }} />
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryMedium }}>
          Adresa  na karti    
        </Text>
        <MapView
          style={{ width: Dimensions.get('screen').width , height: 240, marginBottom: 16, marginTop: 16 }}
          initialRegion={{
            latitude: 43.342666,
            longitude: 17.8142463,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0221,
          }}
        >
        </MapView>
        <View
          style={{
            marginTop: 10,
            borderBottomColor: '#D1D3D4',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16,  fontFamily: fonts.primaryMedium }}>
          Kratki opis objekta
        </Text>
        <TextField label="Opis objekta" containerStyle={{ marginLeft: 16, marginRight: 16}} />

        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryMedium}}>
          Kontakt podaci (potrebni za verifikaciju objekta)
        </Text>
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryMedium }}>
          Email     
        </Text>
        <TextField label="Email" containerStyle={{ marginLeft: 16, marginRight: 16 }} />
        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryMedium }}>
          Broj telefona     
        </Text>
        <TextField label="+387..." containerStyle={{ marginLeft: 16, marginRight: 16 }} />
        <View
          style={{
            marginTop: 36,
            borderBottomColor: '#D1D3D4',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <Text style={{ fontSize: 18, color: "#032B43", marginLeft: 16, marginTop: 16, fontFamily: fonts.primaryMedium}}>
          Radno vrijeme
        </Text>

        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 36 }}>
          <CheckBox title="Ponedjeljak" textStyle={{fontFamily: fonts.primaryLight,fontSize:16}} containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0,  marginLeft: -10 }} 
          checked={this.state.checkPon} onPress={()=> { this.setState({checkPon: !this.state.checkPon}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Od'
              data={time}
            />
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Do'
              data={time}
            />
          </View>
        </View>

        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Utorak" textStyle={{fontFamily: fonts.primaryLight,fontSize:16}} containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0,  marginLeft: -10 }} 
          checked={this.state.checkUto} onPress={()=> { this.setState({checkUto: !this.state.checkUto}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Od'
              data={time}
            />
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Srijeda" textStyle={{fontFamily: fonts.primaryLight,fontSize:16}} containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0,  marginLeft: -10 }} 
          checked={this.state.checkSri} onPress={()=> { this.setState({checkSri: !this.state.checkSri}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
          renderAccessory={()=> <View style={{}}>
          <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Od'
              data={time}
            />
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Četvrtak" textStyle={{fontFamily: fonts.primaryLight,fontSize:16}} containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, marginLeft: -10 }} 
          checked={this.state.checkCet} onPress={()=> { this.setState({checkCet: !this.state.checkCet}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
          renderAccessory={()=> <View style={{}}>
          <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Od'
              data={time}
            />
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Petak" textStyle={{fontFamily: fonts.primaryLight,fontSize:16}} containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0,  marginLeft: -10 }} 
          checked={this.state.checkPet} onPress={()=> { this.setState({checkPet: !this.state.checkPet}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
          renderAccessory={()=> <View style={{}}>
          <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Od'
              data={time}
            />
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Subota" textStyle={{fontFamily: fonts.primaryLight,fontSize:16}} containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0,  marginLeft: -10 }} 
          checked={this.state.checkSub} onPress={()=> { this.setState({checkSub: !this.state.checkSub}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
          renderAccessory={()=> <View style={{}}>
          <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50}}
              label='Od'
              data={time}
            />
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Do'
              data={time}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 32 }}>
          <CheckBox title="Nedjelja"textStyle={{fontFamily: fonts.primaryLight,fontSize:16}} containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0,  marginLeft: -10 }} 
          checked={this.state.checkNed} checkedColor={"#3f4968"} onPress={()=> { this.setState({checkNed: !this.state.checkNed}) }}/>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Dropdown
          renderAccessory={()=> <View style={{}}>
          <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
              label='Od'
              data={time}
            />
            <Dropdown
            renderAccessory={()=> <View style={{}}>
            <AntDesign style={{justifyContent: "flex-end"}} name="down" size={20}  color="rgba(63, 73, 104, 0.8)" />
                  </View>}
              containerStyle={{ width: Dimensions.get('screen').width / 2 - 50 }}
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
        
     

        <CheckBox title="Prihvaćam opće uvjete i slažem se sa svim pravilima"textStyle={{fontFamily: fonts.primaryLight,fontSize:16,color:"rgba(63, 73, 104, 0.8)"}} containerStyle={{ paddingLeft: 16, paddingRight: 16, backgroundColor: "#ffffff", borderWidth: 0, marginLeft: 0 }} 
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
            <View style={{ height: 51, borderColor: "#0C8BB2", backgroundColor: "#2cc2f7", borderWidth: 1, borderRadius: 4, display: "flex", flexDirection: "row", justifyContent: "center", width:196 }}>
              <Text style={{ color: "#ffffff", fontSize: 16, marginTop: 16, marginLeft: 16, fontFamily: fonts.primaryMedium}}>
                Dodaj objekat
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