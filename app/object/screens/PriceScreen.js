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
    const getBackgroundColor =
      current_day_hours && this.isLocationOpen(current_day_hours)
        ? "#1fdc37"
        : "#F6697A";
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
    console.log(location.prices);
    return (
      <View style={{flex:1}}>
         <View
            style={{ flexDirection: "row", justifyContent: "space-between" , marginLeft: 20,
          }}
          >
            {/**comentar */}
            <View>
              <View style={{ marginBottom: 10, marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 34,
                    color: "#032B43",
                    fontFamily: fonts.primaryLight,
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: getBackgroundColor,
                  width: 93,
                  borderRadius: 3,
                  padding: 5,
                  overflow: "hidden",
                  textAlign: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                {current_day_hours && this.isLocationOpen(current_day_hours) ? (
                  <Text style={{ fontSize: 14, color: "#ffffff" }}>
                    OTVORENO
                  </Text>
                ) : (
                  <Text style={{ fontSize: 14, color: "#ffffff", }}>
                    ZATVORENO
                  </Text>
                )}
              </View>
            </View>
          </View>
        {(location.prices)?(
        <View style={styles.itemOneImageContainer}>
          <View
            style={{
              borderBottomColor: '#D1D3D4',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

         
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
        </View>):(<View style={{alignItems: 'center',
    justifyContent: 'center',flex:1}}>
          <Image source={require('../../../assets/empty-box-img.png')} style={{ width:258,height:173,marginBottom:40}} />  
          <Text style={{fontSize:20,lineHeight:35, color:'#3f4968',  fontFamily: fonts.primaryMedium,}}>Izabrana rubrika je{"\n"} trenutno prazna</Text>   
        </View>
)}
      </View>
    );
  }



  renderFeatured = ({ item }) => (
    <View backgroundColor="#ffffff"
      style={styles.itemFeatured}>
      <View>
        <View style={{ borderRadius: 4, overflow: 'hidden' }}>
          <View style={styles.itemOneContent}>
            <View style={{ marginTop: 12,  marginLeft: 16, marginRight: 16, width: Dimensions.get('screen').width - 32, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.itemOneTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={{backgroundColor:"#f8f8f8",borderRadius:22,paddingLeft:12,paddingRight:12}}>
              <Text style={{fontSize:14,color:"#3f4968", fontFamily: fonts.primaryMedium, textAlign: 'center',marginTop:7}} numberOfLines={1}>
                {item.price} KM
              </Text>
              </View>
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
    fontFamily: fonts.primaryMedium,
    fontSize: 20,
    color: "#3f4968",
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
    fontFamily: fonts.primaryLight,
    fontSize: 13,
    marginLeft: 16,
    color:"#3f4968"
  },
  itemPonuda: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
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