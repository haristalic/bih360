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
  BackHandler
} from 'react-native';

import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

import ImageSlider from 'react-native-image-slider';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HTML from 'react-native-render-html';

import Dialog, { DialogContent } from 'react-native-popup-dialog';

import GridRow from '../../home/GridRow'
import moment from 'moment';

import GallerySwiper from "react-native-gallery-swiper";

class GalleryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, dataSource: [], visible: false, imageUri: "", images: [], copy:[] }
    this.hideDialog = this.hideDialog.bind(this)

    var gallery = this
    BackHandler.addEventListener('hardwareBackPress', function () {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.

      if (gallery.state.visible) {
        // gallery.goBack();
        gallery.setState({ visible: false })
        return true;
      } else {
        gallery.props.screenProps.goBack()
        console.log(gallery)
        return true;
      }
      return false;
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
  hideDialog() {
    console.log("asdf")
    this.setState({ visible: false })
  }
  render() {
    const item = this.props.screenProps.state.params;
    const location = item;
    const current_day = moment().format('ddd');
    const current_day_hours = item ? item.working_hours ? item.working_hours[current_day] : {} : {};
    var copy = this.state.copy;
    const copyFeatured = [];
    var images = this.state.images;
    if (images.length == 0) {
      if (item.galleries != null) {
        var count = 0
        item.galleries.forEach(element => {
          if (element.images != null) {
            element.images.forEach(el => {
              el.position = count
              count += 1
              copy.push(el);
              images.push(el.resized_image_url);
            })
          }
        });
      }
      
    }
    const groupedData = GridRow.groupByRows(copy, 2);
    const groupedDataFeatured = GridRow.groupByRows(copyFeatured, 2);
    var gallery = this;

    console.log('asdf')
    var screen = this
    return (
      <ScrollView>
        <Dialog style={{ marginLeft: 0, marginRight: 0 }}
          overlayOpacity={0.7}
          visible={this.state.visible}
          onTouchOutside={() => {
            console.log('asdf')
            this.setState({ visible: false });
          }}
        >
          <DialogContent style={{ paddingBottom: 0, alignContent: "center" }}>
            <ImageSlider images={images} style={{ width: Dimensions.get('screen').width, height: 250 }}
              customSlide={({ index, item, style, width }) => (
                // It's important to put style here because it's got offset inside
                <View key={index} style={[style, { display: "flex", flexDirection: "column", justifyContent: "space-around" }]} >
                  <TouchableOpacity
                    onPress={() => { gallery.hideDialog() }}
                  >
                    <View style={{ width: Dimensions.get('screen').width, height: (Dimensions.get('screen').height - 250) / 2 }} />
                  </TouchableOpacity>
                  <Image style={styles.itemOneImage} source={{ uri: item }} />

                  <TouchableOpacity
                    onPress={() => { gallery.hideDialog() }}
                  >
                    <View style={{ width: Dimensions.get('screen').width, height: (Dimensions.get('screen').height - 250) / 2 }} />
                  </TouchableOpacity>
                </View>
              )}></ImageSlider>
          </DialogContent>
        </Dialog>
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


          <ScrollView style={{ marginTop: 24, marginLeft: 8, marginRight: 8 }}>
            <FlatList
              keyExtractor={item =>
                item.id
              }
              style={{ backgroundColor: "#ffffff", display: "flex", flexDirection: "row" }}
              data={groupedData}
              renderItem={this.renderRowOne}
            ></FlatList>
          </ScrollView>

        </View>
      </ScrollView>
    );
  }

  renderRowOne = rowData => {
    const cellViews = rowData.item.map((item, index) => (
      <View backgroundColor="#ffffff"
        style={styles.objectCardStyle}>
        <TouchableOpacity key={item.id} onPress={() => {
          this.state.images = []
          this.state.images.push(this.state.copy[item.position].resized_image_url)
          for(var i = 0;i < this.state.copy.length; i++)
          {
            if (i!=item.position){
              this.state.images.push(this.state.copy[i].resized_image_url)
            }
          }
          this.setState({ visible: true, imageUri: item.resized_image_url, imageIndex: item.position })
          console.log("item.resized_image_url");
        }} >
          <View>
            <View style={{ borderRadius: 8, overflow: 'hidden' }}>
              <Image style={styles.itemOneImageGallery} source={{ uri: item.resized_image_url }} />
            </View>
          </View>
        </TouchableOpacity>
      </View >
    ));
    return (
      <View style={styles.itemOneRow}>
        {cellViews}
      </View>
    );
  };
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
    overflow: 'hidden',
    backgroundColor: "#fafafa",
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width,
  },
  itemOneImageGallery: {
    height: 110,
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
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
  }, itemFeatured: {
    width: Dimensions.get('screen').width - 16,
    height: 289,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8
  },
  itemOneRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  objectCardStyle: {
    width: Dimensions.get('screen').width / 2 - 24,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
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
    fontFamily: fonts.primaryBold,
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
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    marginLeft: 12
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


export default GalleryScreen;