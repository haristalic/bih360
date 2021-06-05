import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Linking,
  Dimensions,
  WebView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import moment from 'moment';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HTML from 'react-native-render-html';

import GridRow from '../../home/GridRow'

class PriceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, dataSource: [] }
  }
  componentDidMount() {
    fetch('https://api.360bih.ba/api/offers')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }
  isLocationOpen(day_hours) {
    if (day_hours) {

      const moment_format = moment(day_hours.from).isValid() ? '' : 'HH:mm';

      const now = moment().minutes() + moment().hours() * 60;
      const opening_hours = moment(day_hours.from, moment_format).minutes() + moment(day_hours.from, moment_format).hours() * 60;
      const closing_hours = moment(day_hours.to, moment_format).minutes() + moment(day_hours.to, moment_format).hours() * 60;
      return now > opening_hours && now < closing_hours;
    } else {
      return false;
    }
  }
  render() {
    const item = this.props.screenProps.state.params;
    const location = item;
    const current_day = moment().format('ddd');
    const current_day_hours = item ? item.working_hours ? item.working_hours[current_day] : {} : {};
    const copy = [];
    const copyFeatured = [];
    this.state.dataSource.forEach(element => {
      if (element.location.id === item.id) {
        if (element.items != null) {
          element.items.forEach(el => {
            copy.push(el);
          })
        }

      }
    });
    const groupedData = GridRow.groupByRows(copy, 2);
    const groupedDataFeatured = GridRow.groupByRows(copyFeatured, 2);
    return (
      <ScrollView>
        <View style={styles.itemOneImageContainer}>
          <Image style={styles.itemOneImage} source={{ uri: location.images && location.images[0] ? location.images[0].content_url : location.image ? location.image.content_url : "" }} />
          <View style={styles.naslovContainer}>
            <View style={{ width: 80, height: 80, alignContent: "center", justifyContent: "space-around" }}>
              <View style={{ height: 63, width: 63, backgroundColor: "#ffffff", borderRadius: 32, }}>
                <Image style={styles.naslovLogo} source={{ uri: location.logo ? location.logo.content_url : location.images && location.images[0] ? location.images[0].content_url : "" }} />

              </View>
            </View>
            <View style={{ width: Dimensions.get('window').width - 116, height: 80, display: "flex", flexDirection: 'column', justifyContent: "space-around" }}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
                <Text style={{ fontSize: 13, color: "#032B43" }}>{item.categories.length > 0 ? item.categories[0].title : ""}</Text>

                {current_day_hours && this.isLocationOpen(current_day_hours) ? (
                  <Text style={{ fontSize: 13, color: "#1DB7A3", textAlign: "right" }}>
                    Otvoreno
                </Text>) :
                  (<Text style={{ fontSize: 13, color: "#F6697A", textAlign: "right" }}>
                    Zatvoreno
                  </Text>)}
              </View>
              <View>
                <Text style={{ fontSize: 24, color: "#032B43", fontFamily: fonts.primaryBold }}>
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#D1D3D4',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={{ marginTop: 12, marginLeft: 16 }}>
            <Text style={styles.itemCijenik} numberOfLines={1}>
              Cijenik
            </Text>
          </View>
          <ScrollView>
            <FlatList
              keyExtractor={item =>
                item.id
              }
              style={{ backgroundColor: "#ffffff" }}
              data={copy}
              renderItem={this.renderFeatured}
            ></FlatList>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }



  renderFeatured = ({ item }) => (
    <View backgroundColor="#ffffff"
      style={styles.itemFeatured}>
      <View>
        <View style={{ borderRadius: 4, overflow: 'hidden' }}>
          <View style={styles.itemOneContent}>
            <View style={{ marginTop: 12, height: 21, marginLeft: 16, marginRight: 16, width: Dimensions.get('screen').width - 32, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.itemOneTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.itemOneTitle} numberOfLines={1}>
                {item.price} KM
              </Text>
            </View>
            <View style={{ marginTop: 8, height: 18 }}>
              <Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View >
  );

}



const styles = StyleSheet.create({
  naslovContainer: {
    display: "flex",
    flexDirection: 'row',
    width: Dimensions.get("window").width - 32,
    height: 80,
    margin: 16,
  },
  naslovLogo: {
    height: 63,
    width: 63,
    backgroundColor: "#ffffff",
    borderRadius: 32,
  },
  itemOneImageContainer: {
    backgroundColor: "#fafafa",
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-around',
  },
  nerdImage: {
    width: 80,
    height: 80,
  },
  availableText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 40,
    marginVertical: 3,
  },
  textContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  itemFeatured: {
    width: Dimensions.get('screen').width - 16,
    height: 55,
    marginBottom: 16,
    marginRight: 8
  },
  itemOneRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  objectCardStyle: {
    width: Dimensions.get('screen').width / 2 - 12,
    height: 267,
    marginTop: 2,
    marginLeft: 4,
    marginRight: 4,
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
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.1
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
    height: 200,
    //width: Dimensions.get('window').width / 2 - 25,
  },
  featuredImage: {
    height: 200,
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
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: "#4A4A4A",
    height: 19
  },

  itemCijenik: {
    marginTop: 8,
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    color: "#4A4A4A",
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryLight,
    fontSize: 13,
    color: '#4A4A4A',
    marginVertical: 3,
    height: 18
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    marginLeft: 16
  },
  itemPonuda: {
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    marginLeft: 12
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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


export default PriceScreen;