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
} from 'react-native';
import { Feather } from '@expo/vector-icons'; 

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { Dropdown } from 'react-native-material-dropdown';

import GridRow from './GridRow'


import moment from 'moment';

import { Font } from 'expo-font';

import Dialog, { DialogContent } from 'react-native-popup-dialog';



class ObjectsScreen extends Component {
  constructor(props) {
    super(props);

    mycity = this.props.screenProps;
    if (mycity && mycity.id) {
      this.state = { fontLoaded: false, dataSource: [], cities: [], categories: [], city: mycity.id, category: "", cityName: mycity.name, refreshing: false, };
    } else {
      this.state = { fontLoaded: false, dataSource: [], cities: [], categories: [], city: "", category: "", cityName: "Svi", refreshing: false, };
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
    let url = 'https://api.360bih.ba/api/locations?'
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
        }, function () {

        });
        this.prepareForRender();
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
        }, function () {

        });
        this.prepareForRender();
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('https://api.360bih.ba/api/location_categories')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        responseJson.unshift({ id: "", title: "Sve" })
        this.setState({
          isLoading: false,
          categories: responseJson,
        }, function () {

        });
        this.prepareForRender();
      })
      .catch((error) => {
        console.error(error);
      });
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
    fetch('https://api.360bih.ba/api/offers')
      .then((response) => response.json())
      .then((responseJson) => {
        var a = false;
        responseJson.forEach(element => {
          if (element.location.id === article.id) {
            if (element.items != null) {
              element.items.forEach(el => {
                a = true;
              })
            }
          }
        });
        if (a) {
          article.prices = true;
        } else {
          article.prices = false;
        }
        const { navigate } = this.props.navigation;
        navigate({
          routeName: 'Detail',
          params: { ...article },
        });
      })
      .catch((error) => {
        console.error(error);
      });


  };
  onChangeCityPress(value) {
    this.state.city = "" + value.id;
    this.state.cityName = "" + value.name;
    this.setState(previousState => (
      { city: "" + value.id, cityName: "" + value.name, visibleLocation: false }
    ))
    this.loadAllData();
    this.setState({ dataSource: [] })
    this.prepareForRender();
  }
  onChangeCategoryPress(value) {
    this.state.category = "" + value.id;
    this.state.categoryName = "" + value.title;
    this.setState(previousState => (
      { category: "" + value.id, categoryName: value.title, visibleCategory: false }
    ))
    this.loadAllData();
    this.setState({ dataSource: [] })
    this.prepareForRender();
  }

  prepareForRender() {
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
    this.state.dataSource.forEach(element => {
      if (element.featured) {
        copyFeatured.push(element);
      } else {
        copy.push(element);
      }
    });
    const groupedData = GridRow.groupByRows(copy, 2);

    this.setState(previousState => ({
      el1: data,
      el2: copyFeatured,
      el3: groupedData,
      el4: cats
    }))
    this.setState({ refreshing: false });
  }
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
    const data = this.state.el1;
    const copyFeatured = this.state.el2;
    const groupedData = this.state.el3;
    const cats = this.state.el4;

   

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
        }
      >
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
              label='Grad'
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
          style={{
            borderBottomColor: '#D1D3D4',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.objektiTitle} numberOfLines={1}>
          Objekti
        </Text>
        <ScrollView>
          <FlatList
            keyExtractor={item =>
              item.id
            }
            style={{ backgroundColor: "#ffffff", display: "flex",flexDirection: "column" }}
            data={copyFeatured}
            renderItem={this.renderFeatured}
          ></FlatList>
        </ScrollView>
        <FlatList
          keyExtractor={item =>
            item.id
          }
          style={{ backgroundColor: "#ffffff", display: "flex",flexDirection: "column"}}
          data={groupedData}
          renderItem={this.renderRowOne}
        >
        </FlatList>
      </ScrollView>
    );
  }
  renderRowOne = rowData => {
    const cellViews = rowData.item.map(item => {

      const current_day = moment().format('ddd');
      const current_day_hours = item.working_hours ? item.working_hours[current_day] : {};
      return (
        <View backgroundColor="#ffffff"
        style={styles.itemFeatured}>
        <TouchableOpacity key={item.id} onPress={() => this._openArticle(item)}>
          <View style={{ borderRadius: 4, overflow: 'hidden', flexDirection: 'row'}}>
            <View style={{ borderRadius: 8, overflow: 'hidden' }}>
              {(item.galleries && item.galleries[0]) ? (item.galleries[0].images.map(image => {
                return (
                  <ImageBackground style={styles.featuredImage} source={{ uri: image.resized_image_url ? image.resized_image_url : "" }} >
                    <View
              style={{
                position: "absolute",bottom: 10,left: 5,backgroundColor: "#ffffff",
                borderRadius: 22 ,flex:1,justifyContent: "center",alignItems: "center"    }}
            >
              <Text numberOfLines={1} adjustsFontSizeToFit={true} 
                style={{
                  color: "#3f4968",fontSize: 10,fontFamily: "GTWalsheimProM",  
                }}
              >{item.categories.length > 0 ? item.categories[0].title : "nema"}</Text>
            </View>
                  </ImageBackground>
                );
              })[0]) : (
                  <ImageBackground style={styles.featuredImage} source={{ uri: item.images && item.images[0] ? item.images[0].resized_image_url : item.image ? item.image.resized_image_url : "" }} >
                    <View
              style={{
                position: "absolute",bottom: 10,left: 5,backgroundColor: "#ffffff",
                borderRadius: 22,flex:1,justifyContent: "center",alignItems: "center"
              }}
            >
              <Text numberOfLines={1} adjustsFontSizeToFit={true} 
                style={{
                  color: "#3f4968",fontSize: 14,fontFamily: "GTWalsheimProM",  textAlignVertical: "center",textAlign: "center",
                }}
              >{item.categories.length > 0 ? item.categories[0].title : "nema"} </Text>
            </View>
                  </ImageBackground>
                )}

            </View>
            <View style={styles.itemOneContent}>
            
              <Text style={styles.itemOneTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 12, height: 18 }}>
              <Feather name="map-pin" size={12} color="rgba(63, 73, 104, 0.8)" />                       
                <Text style={styles.itemOnePrice} numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 8, height: 18 }}>
                <MaterialIcons name="local-phone" size={16} color="#4A4A4A" />
                <Text style={styles.itemOnePrice} numberOfLines={1}>
                  {item.phone}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 8, height: 18 }}>
                <MaterialIcons name="access-time" size={16} color="#4A4A4A" />
                <Text style={styles.itemOnePrice} numberOfLines={1}>
                  {current_day_hours && (current_day_hours.from || current_day_hours.to) ?
                    ((moment(current_day_hours.from).isValid() ? moment(current_day_hours.from).format('HH:mm') : current_day_hours.from) + " - " +
                      (moment(current_day_hours.to).isValid() ? moment(current_day_hours.to).format('HH:mm') : current_day_hours.to))
                    : 'Zatvoreno'
                  }
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View >
      )
    });
    return (
      <View >
        {cellViews}
      </View>
    );
  };


  renderFeatured = ({ item }) => {
    const current_day = moment().format('ddd');
    const current_day_hours = item.working_hours ? item.working_hours[current_day] : {};

    return (
      <View backgroundColor="#ffffff"
        style={styles.itemFeatured}>
        <TouchableOpacity key={item.id} onPress={() => this._openArticle(item)}>
          <View style={{ borderRadius: 4, overflow: 'hidden', flexDirection: 'row'}}>
          <View style={{ borderRadius: 8, overflow: 'hidden' }}>
              {(item.galleries && item.galleries[0]) ? (item.galleries[0].images.map(image => {
                return (
                  <ImageBackground style={styles.featuredImage} source={{ uri: image.resized_image_url ? image.resized_image_url : "" }} >
                    <View
              style={{
                position: "absolute",bottom: 10,left: 5,backgroundColor: "#ffffff",
                borderRadius: 22 ,flex:1,justifyContent: "center",alignItems: "center" ,padding:5   }}
            >
              <Text numberOfLines={1} adjustsFontSizeToFit={true} 
                style={{
                  color: "#3f4968",fontSize: 10,fontFamily: "GTWalsheimProM",  
                }}
              >{item.categories.length > 0 ? item.categories[0].title : "nema"}</Text>
            </View>
                  </ImageBackground>
                );
              })[0]) : (
                  <ImageBackground style={styles.featuredImage} source={{ uri: item.images && item.images[0] ? item.images[0].resized_image_url : item.image ? item.image.resized_image_url : "" }} >
                    <View
              style={{
                position: "absolute",bottom: 10,left: 5,backgroundColor: "#ffffff",
                borderRadius: 22,flex:1,justifyContent: "center",alignItems: "center"
              }}
            >
              <Text numberOfLines={1} adjustsFontSizeToFit={true} 
                style={{
                  color: "#3f4968",fontSize: 14,fontFamily: "GTWalsheimProM",  textAlignVertical: "center",textAlign: "center",
                }}
              >{item.categories.length > 0 ? item.categories[0].title : "nema"} </Text>
            </View>
                  </ImageBackground>
                )}

            </View>
            <View style={styles.itemOneContent}>
            
              <Text style={styles.itemOneTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 12, height: 18 }}>
              <Feather name="map-pin" size={16} color="rgba(63, 73, 104, 0.8)" />                       
                <Text style={styles.itemOnePrice} numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 8, height: 18 }}>
                <MaterialIcons name="local-phone" size={16} color="#4A4A4A" />
                <Text style={styles.itemOnePrice} numberOfLines={1}>
                  {item.phone}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 8, height: 18 }}>
                <MaterialIcons name="access-time" size={16} color="#4A4A4A" />
                <Text style={styles.itemOnePrice} numberOfLines={1}>
                  {current_day_hours && (current_day_hours.from || current_day_hours.to) ?
                    ((moment(current_day_hours.from).isValid() ? moment(current_day_hours.from).format('HH:mm') : current_day_hours.from) + " - " +
                      (moment(current_day_hours.to).isValid() ? moment(current_day_hours.to).format('HH:mm') : current_day_hours.to))
                    : 'Zatvoreno'
                  }
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View >
    );
  }

}

const styles = StyleSheet.create({
  itemFeatured: {
    width: Dimensions.get('window').width,
    marginLeft: 8,
    marginRight: 8,
    marginBottom:20
  },
  itemOneRow: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  objectCardStyle: {
    width: Dimensions.get('screen').width / 2 - 12,
    height: 233,
    marginTop: 2,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 6,
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
    overflow: "visible",

    width: Dimensions.get('window').width ,
  },
  itemOneImageContainer: {
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 143,
    //width: Dimensions.get('window').width / 2 - 25,
  },
  featuredImage: {
    height: 103,
    width:134,
    borderRadius: 8
    //width: Dimensions.get('window').width / 2 - 25,
  },
  objektiTitle: {
    marginLeft: 16,
    marginTop: 16,
    marginBottom:10,
    fontFamily: fonts.primaryMedium,
    fontSize: 30,
    color: "#032B43",
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
    fontFamily: fonts.primaryMedium,
    fontSize: 20,
    color: "#3f4968",
    width:600,
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
    fontSize: 13,
    marginLeft: 12,
    color:"rgba(63, 73, 104, 0.8)"
  },
  itemOneRow: {
    flexDirection: 'column',
    marginTop: 0,
  },
  itemOneContent: {
    flex:1,
    marginHorizontal:15
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

export default ObjectsScreen;