import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Overlay,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView, 
  StatusBar,
  Platform,FlatList
} from 'react-native';

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import ImageBG from './util/SelectCityIcon';
import stackNav from './stacknav';
import SideMenu from '../SideMenu/SideMenu'
import logowhiteicon from "./util/LogoWhite";
import { Feather } from '@expo/vector-icons'; 


import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { fonts } from '../styles/fonts';

import { Font } from 'expo-font';

import {  createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
class SelectCityScreen extends Component {


  constructor(props) {
    super(props)
    const drawernav = createDrawerNavigator({
      Item1: {
        screen: stackNav,
      }
    }, {
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width - 120,
        drawerPosition:"right"
      });
    const Navigation = createAppContainer(drawernav);
    this.state = {
      isLoaded: false,
      nav: Navigation,
      fontLoaded: false,
      cities: [],
      visible: false,
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      "Roboto-Regular": require("../assets/fonts/rregular.ttf"),
      "Roboto-Medium": require("../assets/fonts/rmedium.ttf"),
      "Roboto-Light": require("../assets/fonts/rlight.ttf"),
      "Roboto-Bold": require("../assets/fonts/rbold.ttf"),
    })
    this.setState({ fontLoaded: true })
    this.loadAssetsAsync()
    
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

    // Start counting when the page is loaded
    /*this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.setState({ component: <stackNav></stackNav>, isLoaded: false })
    }, 5000);*/
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
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }



  selectCity(city) {
    console.log(city.name);
    this.setState({ component: <stackNav></stackNav>, visible:false, myCity: city })
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.setState({ component: <stackNav></stackNav>, isLoaded: true })
    }, 500);

  }

  render() {
    const Navigation = this.state.nav;
    if (!this.state.fontLoaded) {
      return <View />;
    }
    if (this.state.isLoaded) {
      return (<Navigation screenProps={this.state.myCity} />)
    }
    const ticketItem = ({item}) => {
        
      return (
          <View style={{marginRight:20,borderRadius:20}} >
            <TouchableOpacity style={{ flexDirection:'row',backgroundColor:"#ffffff" ,width: Dimensions.get("screen").width-40, marginLeft: 20,marginTop:20}}onPress={() => {
                      this.selectCity(item);
                    }}>
            <View  >
            <Image
          style={ {
            width: 66,
            height: 58,
            borderBottomLeftRadius:5,
            borderTopLeftRadius:5
          }}          source={{uri: 'https://www.smartcitiesworld.net/AcuCustom/Sitename/DAM/019/Sydney_Harbour_at_night_Adobe.jpg'}}
        /></View>
        <View style={{  marginLeft: 16,width: Dimensions.get("screen").width - 64, height: 32}}>
                 <Text style={{ color: "#4A4A4A", fontSize: 20 }}>
                        {item.name}</Text>   
                        <View style={{  marginTop:5, flexDirection: "row",width: Dimensions.get("screen").width - 64, height: 32}}>
                        <Feather name="map-pin" size={12} color="rgba(63, 73, 104, 0.8)" />                       
                        <Text style={{fontSize:12,color:'rgba(63, 73, 104, 0.8)',height:14,fontFamily:"GTWalsheimProL"}}>  objekata</Text>  
          </View>   
          </View>
       
                      </TouchableOpacity>
          </View>
      );
  };
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
   
   <ImageBackground source={require('../assets/header-panorama.jpg')}resizeMode={"cover"} style={{flex:1}} >
     <View style={{display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", width: Dimensions.get('screen').width, height:68, }}>
       {/* <Image source={{ uri: logowhiteicon }} style={{ marginLeft: 16, marginTop: 40, height: 28, width: 100, }} /> */}
     </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", width: Dimensions.get('screen').width, marginTop: 29 }}>
     <Text style={{ fontFamily: "GTWalsheimProM", color: "#3f4968", fontWeight:"bold",fontSize:40, alignItems: "center", alignContent: "center" }}>
       Istraži 360BiH
         </Text>
   </View>
   <View style={{ display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", width: Dimensions.get('screen').width, marginLeft: 10,marginRight:10}}>
     <Text style={{ fontFamily: "GTWalsheimProL", justifyContent: "center", display: "flex", textAlign: "center", color: "#3f4968", fontSize: 16,textAlign:"left" , marginLeft: 16, marginRight: 16, marginTop: 24,lineHeight:30 }}>
       360BiH predstavlja novu vrstu oglašivačkog{"\n"} 
       internetskog medija putem koje je moguća{"\n"}
       promocija lokalnih sadržaja iz raznih sfera života.{"\n"}
       Naš je primarni cilj, digitalnim putem pružiti novo{"\n"}
        i drugačije korisničko iskustvo kroz nove vidove{"\n"} 
        oglašavanja i različite vrste virtualnih šetnji kroz{"\n"}
        prostor.
         </Text>
   </View >     
      </ImageBackground>
      </View>
      <View style={{flex:1}}>
      <View style={{backgroundColor:'#f2f5f9',width: Dimensions.get("screen").width,flex:1}}>
      <Text style={{  marginTop: 16, marginLeft:20,  height: 56, color: "#3f4968" ,fontSize: 30, fontFamily: "GTWalsheimProM" }}>
         Odaberite grad
         </Text>
      <SafeAreaView style={styles.container}>
  
<FlatList
 data={this.state.cities}
         renderItem={ticketItem}
     
/>
</SafeAreaView> 
</View>
</View>   
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

export default SelectCityScreen;