import React, { Component } from "react";
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
  TouchableOpacity,
} from "react-native";

import Dialog, { DialogContent } from "react-native-popup-dialog";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { Ionicons, MaterialIcons, FontAwesome ,Feather,AntDesign,MaterialCommunityIcons} from "@expo/vector-icons";
import HTML from "react-native-render-html";
import moment from "moment";
import MapView from "react-native-maps";
import Marker from "react-native-maps";

import ImageSlider from "react-native-image-slider";

class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.props.navigation.setParams({ asdf: "asdf" });
  }
  isLocationOpen(day_hours) {
    if (day_hours) {
      const moment_format = moment(day_hours.from).isValid() ? "" : "HH:mm";

      const now = moment().minutes() + moment().hours() * 60;
      const opening_hours =
        moment(day_hours.from, moment_format).minutes() +
        moment(day_hours.from, moment_format).hours() * 60;
      const closing_hours =
        moment(day_hours.to, moment_format).minutes() +
        moment(day_hours.to, moment_format).hours() * 60;
      return now > opening_hours && now < closing_hours;
    } else {
      return false;
    }
  }

  render() {
    const item = this.props.screenProps.state.params;
    const current_day = moment().format("ddd");
    const current_day_hours = item
      ? item.working_hours
        ? item.working_hours[current_day]
        : {}
      : {};
    const location = item;
    const getBackgroundColor =
      current_day_hours && this.isLocationOpen(current_day_hours)
        ? "#1fdc37"
        : "#F6697A";
    const DAYS = [
      { value: "Mon", label: "Ponedjeljak" },
      { value: "Tue", label: "Utorak" },
      { value: "Wed", label: "Srijeda" },
      { value: "Thu", label: "Četvrtak" },
      { value: "Fri", label: "Petak" },
      { value: "Sat", label: "Subota" },
      { value: "Sun", label: "Nedjelja" },
    ];
    const images = [];
    location.galleries.forEach((element)=>
    {
      element.images.forEach((img)=>{
        images.push(img.content_url);

      })
    })
    location.images &&
      location.images.forEach((element) => {
        images.push(element.content_url);
      });
    if (images.length == 0 && location.image && location.image.content_url) {
      images.push(location.image.content_url);
    }
    return (
      <ScrollView>
        <View
          style={{
            width: Dimensions.get("window").width - 116,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            marginLeft: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
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
        </View>
        <View style={styles.itemOneImageContainer}>
          {images.length > 1 ? (
            <ImageSlider
              images={images}
              style={styles.itemOneImage}
              customSlide={({ index, item, style, width }) => (
                // It's important to put style here because it's got offset inside
                <View key={index} style={[style]}>
                  <Image style={styles.itemOneImage} source={{ uri: item }} />
                </View>
              )}
            ></ImageSlider>
          ) : (
            <Image
              style={styles.itemOneImage}
              source={{
                uri:
                  location.images && location.images[0]
                    ? location.images[0].content_url
                    : location.image
                    ? location.image.content_url
                    : "",
              }}
            />
          )}
<View >
          <View style={{ marginTop: 24, marginLeft: 20, marginBottom: 16,backgroundColor:'' }}>
            <Text style={{fontSize:20,color:"#3f4968"}}>Kategorija</Text>
            {item.categories.length >0 ?  (<View style={{ width:150,height:34,padding:15,backgroundColor:'rgba(63, 73, 104, 0.8)', 
                 justifyContent: 'center',padding:15,
                 marginBottom:15,marginTop:10,
                  borderRadius:22}}>
              <Text style={{ fontSize: 14, color: "#ffffff",textAlign:'center' }}>{item.categories.length > 0 ? item.categories[0].title : "nema"}</Text>
           </View>):(<View/>)}
           

          {item.address ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                height: 18,
              }}
            >
                <Feather name="map-pin" size={16} color="rgba(63, 73, 104, 0.8)" />                       
              <Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.address}
              </Text>
            </View>
          ) : (
            <View />
          )}
           {item.phone ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                height: 18,
              }}
            >
              <AntDesign name="phone" size={16}  color="rgba(63, 73, 104, 0.8)" />                
              <Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.phone}
              </Text>
            </View>
          ) : (
            <View />
          )}
             <TouchableOpacity
          onPress={() => {
            this.setState({ visible: true });
          }}
        >
          <View
            style={{ display: "flex",
            flexDirection: "row",
            marginTop: 15,
            height: 18, }}
          >
              <Ionicons name="time-outline" size={16} color="rgba(63, 73, 104, 0.8)" />               
            <Text
              style={{
                fontFamily: fonts.primaryRegular,
                fontSize: 14,
                marginLeft: 12,
                color: "#4A4A4A",
              }}
              numberOfLines={1}
            >
              {current_day_hours &&
              (current_day_hours.from || current_day_hours.to)
                ? (moment(current_day_hours.from).isValid()
                    ? moment(current_day_hours.from).format("HH:mm")
                    : current_day_hours.from) +
                  " - " +
                  (moment(current_day_hours.to).isValid()
                    ? moment(current_day_hours.to).format("HH:mm")
                    : current_day_hours.to)
                : "Zatvoreno"}
            </Text>

            <MaterialIcons
              style={{ marginLeft: 4 }}
              name="keyboard-arrow-down"
              size={16}
              color="#4A4A4A"
            />
          </View>
        </TouchableOpacity>
          {item.website ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                height: 18,
              }}
            >
<MaterialCommunityIcons name="web" size={16}  color="rgba(63, 73, 104, 0.8)" />            
  <Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.website}
              </Text>
            </View>
          ) : (
            <View />
          )}
          {item.email ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                height: 18,
              }}
            >
<MaterialCommunityIcons name="email-outline"  size={16}  color="rgba(63, 73, 104, 0.8)"/>             
<Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
          ) : (
            <View />
          )}
          {item.facebook ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                height: 18,
              }}
            >
<Feather name="facebook" size={16}  color="rgba(63, 73, 104, 0.8)" />              
<Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.facebook}
              </Text>
            </View>
          ) : (
            <View />
          )}
          {item.twitter ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                height: 18,
              }}
            >
              <FontAwesome name="twitter-square" size={16} color="#4A4A4A" />
              <Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.twitter}
              </Text>
            </View>
          ) : (
            <View />
          )}
          {item.instagram ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                height: 18,
              }}
            >
              <FontAwesome name="instagram" size={16} color="#4A4A4A" />
              <Text style={styles.itemOnePrice} numberOfLines={1}>
                {item.instagram}
              </Text>
            </View>
          ) : (
            <View />
          )}
            <Text
              style={{
                fontSize: 30,
                color: "#3f4968",
                marginTop:30,
                fontFamily: fonts.primaryMedium,
              }}
            >
              O nama
            </Text></View>
          </View>

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              textAlign: "justifyContent",
              color: "#032B43",
            }}
          >
            <HTML
              style={{ marginTop: 12 }}
              html={"<k>" + item.description+ "</k>"}
            
              renderers={{
                k: (htmlAttribs, children, convertedCSSStyles, passProps) => (
                  <Text
                    textAlign="justify"
                    style={{ color: "rgba(63, 73, 104, 0.8)", fontSize: 16, fontFamily: fonts.primaryLight,lineHeight:25
                  }}
                  
                  >
                    {children}
                  </Text>
                ),     div: (htmlAttribs, children, convertedCSSStyles, passProps) => (
                  <Text
                    textAlign="justify"
                    style={{ color: "rgba(63, 73, 104, 0.8)", fontSize: 16, fontFamily: fonts.primaryLight,lineHeight:25
                  }}
                  
                  >
                    {children}
                  </Text>
                ),
              }}
            />
            
          </View>

        
        </View>
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
        >
          <DialogContent style={{ paddingTop: 16 }}>
            {DAYS.map((single_day, index) => {
              const day_working_hours =
                location.working_hours[single_day.value] || {};

              return (
                <View
                  key={index}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {day_working_hours.from && day_working_hours.to ? (
                    <Text
                      style={{ marginRight: 8, color:"rgba(63, 73, 104, 0.8)", fontSize: 14 }}
                    >
                      {(moment(day_working_hours.from).isValid()
                        ? moment(day_working_hours.from).format("HH:mm")
                        : day_working_hours.from) +
                        " - " +
                        (moment(day_working_hours.to).isValid()
                          ? moment(day_working_hours.to).format("HH:mm")
                          : day_working_hours.to)}
                    </Text>
                  ) : (
                    <Text
                      style={{ fontSize: 14, color: "#F6697A", marginRight: 8 }}
                    >
                      Ne radi
                    </Text>
                  )}
                  <Text
                    style={{
                      marginLeft: "auto",
                      fontSize: 12,
                      color:
                        current_day === single_day.value
                          ? current_day_hours &&
                            this.isLocationOpen(current_day_hours)
                            ? "#00C752"
                            : "#F6697A"
                          : "#4A4A4A",
                    }}
                  >
                    {single_day.label}
                  </Text>
                </View>
              );
            })}
          </DialogContent>
        </Dialog>
        <View
          style={{
            marginTop: 16,
            borderBottomColor: "#D1D3D4",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ }}>
          <MapView
            style={{
              width: Dimensions.get("screen").width ,
              height: 240,
              marginBottom: 16,
            }}
            initialRegion={{
              latitude: parseFloat(location.map_lat),
              longitude: parseFloat(location.map_lon),
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0221,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(location.map_lat),
                longitude: parseFloat(location.map_lon),
              }}
              title={location.title}
              description=""
            />
          </MapView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  naslovContainer: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("window").width - 32,
    height: 80,
    margin: 16,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryLight,
    fontSize: 16,
    marginLeft: 12,
    color:"rgba(63, 73, 104, 0.8)",
  },
  naslovLogo: {
    height: 63,
    width: 63,
    backgroundColor: "#ffffff",
    borderRadius: 32,
  },
  itemOneImageContainer: {
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: "space-around",
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
    alignItems: "center",
  },
  buttonsContainer: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  button: {
    alignSelf: "stretch",
    marginBottom: 20,
  },
});

export default InfoScreen;
