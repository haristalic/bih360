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
  ImageBackground
} from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { Dropdown } from 'react-native-material-dropdown';

import GridRow from './GridRow'
import moment from 'moment';


import { Font } from 'expo-font';

//import CardView from 'react-native-cardview'

import { Card } from 'react-native-elements';
import Dialog, { DialogContent } from 'react-native-popup-dialog';


class EventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, dataSource: [], cities: [], categories: [], city: "", category: "", cityName: "Svi" }
    mycity = this.props.screenProps;
    if (mycity && mycity.id) {
      this.state.city = mycity.id;
      this.state.cityName = mycity.name;
    }
    this.state.visibleCategory = false;
    this.state.visibleLocation = false;
    this.state.categoryName = "Sve";
  }
  componentDidMount() {
    this.loadAssetsAsync()
    this.loadAllData();
  }
  loadAllData = async () => {
    let url = 'https://api.360bih.ba/api/events?'
    if (this.state.city.length > 0) {
      url = url + '&city=' + this.state.city
    }
    if (this.state.category.length > 0) {
      url = url + '&categories=' + this.state.category
    }
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          refreshing: false
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('https://api.360bih.ba/api/cities')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          cities: responseJson,
          refreshing: false
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });

    fetch('https://api.360bih.ba/api/location_categories')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          categories: responseJson,
          refreshing: false
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  onChangeCityPress(value) {
    this.state.city = "" + value.id;
    this.state.cityName = "" + value.name;
    this.setState(previousState => (
      { city: "" + value.id, cityName: "" + value.name, visibleLocation: false }
    ))
    this.loadAllData();
  }
  onChangeCategoryPress(value) {
    this.state.category = "" + value.id;
    this.state.categoryName = "" + value.title;
    this.setState(previousState => (
      { category: "" + value.id, categoryName: value.title, visibleCategory: false }
    ))
    this.loadAllData();
  }


  loadAssetsAsync = async () => {
    await Font.loadAsync({
      "Roboto-Regular": require("../../assets/fonts/rregular.ttf"),
      "Roboto-Medium": require("../../assets/fonts/rmedium.ttf"),
      "Roboto-Light": require("../../assets/fonts/rlight.ttf"),
      "Roboto-Bold": require("../../assets/fonts/rbold.ttf"),
    })
    this.setState({ fontLoaded: true })
  }
  _openArticle = article => {
    fetch("https://api.360bih.ba/api/locations/" + article.id)
      .then((response) => response.json())
      .then((responseJson) => {
        const { navigate } = this.props.navigation;
        responseJson.fromEvents = true
        navigate({
          routeName: 'Detail',
          params: { ...responseJson },
        });
      })
      .catch((error) => {
        console.error(error);
      });

  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.loadAllData()
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    let data = [];
    this.state.cities.forEach(element => {
      element.value = element.name;
      data.push(element);
    })
    this.state.categories.forEach(element => {
      element.value = element.title;
    })
    let cats = this.state.categories;

    const d = new Date();
    const copy = [];
    const copyFeatured = [];
    if (this.state.dataSource != null) {
      this.state.dataSource.forEach(element => {
          copyFeatured.push(element);
  
      });
    }

    const groupedData = GridRow.groupByRows(copy, 2);
    const groupedDataFeatured = GridRow.groupByRows(copyFeatured, 2);
    if (!this.state.fontLoaded) {
      return <View />
    }
    return (
      <ScrollView backgroundColor="#ffffff" showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={["#0C8BB2", "#0C8BB2", "#0C8BB2"]}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        <View style={styles.cardContainer}>
          <Dialog style={{ marginLeft: 16, marginRight: 16 }}
            visible={this.state.visibleLocation}
            onTouchOutside={() => {
              this.setState({ visibleLocation: false });
            }}
          >
            <DialogContent style={{ paddingTop: 16, height: 250 }}>
              <ScrollView style={{ height: 250 }}>
                {this.state.cities.map((city, index) => {
                  return (
                    <TouchableOpacity onPress={() => {
                      this.onChangeCityPress(city);
                    }}>
                      <Text style={{ color: "#4A4A4A", fontSize: 16, width: Dimensions.get("screen").width - 64, height: 32 }}>
                        {city.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

            </DialogContent>
          </Dialog>
          <Dialog style={{ marginLeft: 16, marginRight: 16 }}
            visible={this.state.visibleCategory}
            onTouchOutside={() => {
              this.setState({ visibleCategory: false });
            }}
          >
            <DialogContent style={{ paddingTop: 16, height: 250 }}>
              <ScrollView style={{ height: 250 }}>
                {this.state.categories.map((city, index) => {
                  return (
                    <TouchableOpacity onPress={() => {
                      this.onChangeCategoryPress(city);
                    }}>
                      <Text style={{ color: "#4A4A4A", fontSize: 16, width: Dimensions.get("screen").width - 64, height: 32 }}>
                        {city.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

            </DialogContent>
          </Dialog>
          <View style={{ display: "flex", flexDirection: "row", width: Dimensions.get('window').width, backgroundColor: "#fff", marginTop:-16, marginBottom:-16 }}>
            {/* <TouchableOpacity onPress={() => {
              this.setState({ visibleLocation: true });
            }}>
              <View style={{ width: Dimensions.get('window').width / 2 - 4, paddingLeft: 8, paddingRight: 8 }}>
                <View style={{ borderColor: "#D8D8D8", borderWidth: 1, borderRadius: 4, height: 40, display: "flex", flexDirection: "row" }}>
                  <MaterialIcons name="pin-drop" size={16} color="#4A4A4A" style={{ marginLeft: 8, marginTop: 12 }} />
                  <Text style={{ color: "#4A4A4A", fontSize: 14, marginLeft: 16, marginTop: 12 }}>
                    {this.state.cityName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}

            <Dropdown
              containerStyle={{ width: Dimensions.get('window').width / 2 - 4, paddingLeft: 8, paddingRight: 8 }}
              label='Gradddd'
              data={this.state.cities}
              onChangeText={(value, index, data) => {
                this.onChangeCityPress(data[index]);
              }}

            />
            <Dropdown
              containerStyle={{ width: Dimensions.get('window').width / 2 - 4, paddingLeft: 8, paddingRight: 16 }}
              label='Kategorija'
              data={this.state.categories}
              onChangeText={(value, index, data) => {
                this.onChangeCategoryPress(data[index]);
              }}
            />
            {/* <TouchableOpacity onPress={() => {
              this.setState({ visibleCategory: true });
            }}>
              <View style={{ width: Dimensions.get('window').width / 2 - 4, paddingLeft: 8, paddingRight: 16 }}>
                <View style={{ borderColor: "#D8D8D8", borderWidth: 1, borderRadius: 4, height: 40, display: "flex", flexDirection: "row" }}>
                  <MaterialIcons name="store" size={16} color="#4A4A4A" style={{ marginLeft: 8, marginTop: 12 }} />
                  <Text style={{ color: "#4A4A4A", fontSize: 14, marginLeft: 16, marginTop: 12 }}>
                    {this.state.categoryName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}

          </View>
        </View>
        <View
       
        />
        <Text style={styles.objektiTitle} numberOfLines={1}>
          Događaji
        </Text>
        <Text style={styles.pronadjeno} numberOfLines={1}>
          Pronađeno je {this.state.dataSource.length > 100 ? "100+" : this.state.dataSource.length} događaja
        </Text>
        <ScrollView  showsHorizontalScrollIndicator={false}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={item =>
              item.id
            }
            style={{ backgroundColor: "#ffffff", display: "flex", flexDirection: "row" }}
            data={copyFeatured}
            renderItem={this.renderFeatured}
          ></FlatList>
        </ScrollView>
      </ScrollView>
    );
  }

  renderFeatured = ({ item }) => (
    <View backgroundColor="#ffffff"
      style={styles.itemFeatured}>
      <TouchableOpacity key={item.id} onPress={() => this._openArticle(item.location)}>
        <View style={{ borderRadius: 4, overflow: 'hidden' }}>
          <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            <ImageBackground style={styles.featuredImage} source={{ uri: item.images.length > 0 ? item.images[0].resized_image_url : "" }} >
              <MaterialIcons style={{ margin: 8 }} name="stars" size={24} color="#ffffff" />
                   <View
              style={{
                position: "absolute",bottom: 5,right: 5,backgroundColor: "#ffffff",
                borderRadius: 22 ,flex:1,justifyContent: "center",alignItems: "center" ,   }}
            >
              <Text numberOfLines={1}
                style={{
                  color: "#3f4968",fontSize: 14,fontFamily: "GTWalsheimProM",padding:6 
                }}
              >{item.type.name}</Text>
            </View>
            </ImageBackground>
          </View>
          <View style={styles.itemOneContent}>
            <Text style={styles.itemOneTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 12, height: 18 }}>
              <MaterialIcons name="place" size={16} color="rgba(63, 73, 104, 0.8)" />
              <Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.location != null ? item.location.address : ""}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 8, height: 18 }}>
              <MaterialIcons name="date-range" size={16} color="rgba(63, 73, 104, 0.8)" />
              <Text style={styles.itemOnePrice} numberOfLines={1}>
                {
                  (item.time && item.time.from) ?
                    (moment(item.time.from).format('DD MMM YYYY.')) : (
                      moment(item.start).isValid() ? moment(item.start).format('DD.MM.YYYY.') : item.start
                    )
                }
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View >
  );

}

const styles = StyleSheet.create({
  itemFeatured: {
    width:350,
    height: 289,
    marginBottom: 5,
    marginLeft:10,
    marginRight:10
    
  },
  itemOneRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  objectCardStyle: {
    width: Dimensions.get('screen').width / 2 - 12,
    height: 267,
    marginTop: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 6,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdown: {
    borderLeftWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textStyle: {
    color: '#FFFFFF'
  },
  cardContainer: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#ffffff',
    padding: 10,
  }, itemTwoCard: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
  },
  itemOneContainer: {
    borderRadius: 5,
    overflow: "hidden",
    flex: 1,
    //width: Dimensions.get('window').width / 2 - 25,
  },
  itemOneImageContainer: {
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 143,
    //width: Dimensions.get('window').width / 2 - 25,
  },
  featuredImage: {
    height: 146,
    borderRadius: 8
    //width: Dimensions.get('window').width / 2 - 25,
  },
  objektiTitle: {
    marginLeft: 16,
    marginTop: 16,
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    color: "#032B43",
    height: 24
  },
  pronadjeno: {
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 16,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    color: "#032B43",
    height: 19
  },
  itemOneTitle: {
    marginTop: 8,
    fontFamily: fonts.primaryMedium,
    fontSize: 16,
    color: "#4A4A4A",
    height: 19
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryLight,
    fontSize: 13,
    color: '#4A4A4A',
    marginVertical: 3,
    height: 18
  },
  itemOnePrice: {
    fontFamily: fonts.primaryLight,
    fontSize: 12,
    marginLeft: 12,
    color:"rgba(63, 73, 104, 0.8)"
  },
  itemOneRow: {
    flexDirection: 'row',
    marginTop: 0,
  },
  itemOneContent: {
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
});

const buttonStyle = {
  position: "relative",
  width: 160,
  height: 170,
  backgroundColor: "#fff",
}

const shadowStyle = {
  width: buttonStyle.width,
  height: buttonStyle.height,
  color: "#000",
  border: 2,
  radius: 3,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 }
}

export default EventsScreen;