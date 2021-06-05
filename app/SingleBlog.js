import React, { Component } from "react";
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
  Linking,
  WebView,
  Clipboard,
} from "react-native";

import { CheckBox } from "react-native-elements";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Dropdown } from "react-native-material-dropdown";

import moment from "moment";

import { Font } from "expo-font";

import Dialog, { DialogContent } from "react-native-popup-dialog";

import MapView from "react-native-maps";
import Marker from "react-native-maps";
import HTML from "react-native-render-html";



class SingleBlog extends Component {
  render() {
    const blog = this.props.navigation.state.params;
    var fontSize=18;
var htmlstyles =StyleSheet.create({
        a: {
                fontWeight: '300',
                fontSize:fontSize
        },
	p:{
		fontSize:fontSize,
	},
	strong:{
		fontWeight:'bold',
		fontSize:fontSize
	},
	li:{
		fontSize:fontSize,
	}
})

    console.log(blog);
    return (
      <ScrollView>
        <ImageBackground
          style={{ height: 220 }}
          source={{ uri: blog.image.content_url }}
        >
          <View
            style={{
              position: "absolute", bottom: 10, right: 10,backgroundColor:"#ffffff",width:89,height:20,borderRadius:22,  
              overflow: "hidden",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#3f4968",
                fontSize: 14,
                fontFamily:"GTWalsheimProM"
                
              }}
            >{blog.category.title}</Text>
          </View>
        </ImageBackground>
        <Text style={{fontFamily:"GTWalsheimProM",fontSize:30,marginLeft: 16,
              marginTop: 16,width:313}}>{blog.title} </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: Dimensions.get("screen").width,
          }}
        >        

          <View
            style={{
              fontSize: 16,
              marginLeft: 16,
              marginTop: 16,
              height: 20,
              flexDirection: "row",
            }}
          >
            <View></View>
            <MaterialIcons name="schedule" size={16} color="rgba(63, 73, 104, 0.5)" />
            <Text style={{fontFamily:"GTWalsheimProL",fontSize: 12,marginLeft:5,marginRight:30, color: "rgba(63, 73, 104, 0.5)" }}>
              {moment(blog.created_at).format("DD MMM YYYY")}
            </Text>
            <MaterialIcons name="calendar-today" size={14} color="rgba(63, 73, 104, 0.5)" />
            <Text style={{ fontFamily:"GTWalsheimProL",color: "rgba(63, 73, 104, 0.5)", fontSize: 12,marginLeft:5 }}>
              {moment(blog.created_at).format("hh:mmA")}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginLeft: 16,
            marginRight: 16,
            marginTop: 16,
            borderBottomColor: "#D1D3D4",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={{ margin: 16, }}>
        <HTML
              html={"<k>" + blog.content + "</k>"}
              renderers={{
                k: (htmlAttribs, children, convertedCSSStyles, passProps) => (
                  <Text
                    style={{ color: "rgba(63, 73, 104, 0.8)", fontSize: 16, fontFamily: fonts.primaryLight,lineHeight:30
                  }}
                  >
                    {children}
                  </Text>
                ),
              }}
            />
       
        </View>

        <View
          style={{
            marginLeft: 16,
            marginRight: 16,
            marginTop: 16,
            borderBottomColor: "#D1D3D4",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View
          style={{
            display: "none",
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            marginTop: 16,
          }}
        >
          <Text
            style={{
              color: "#9B9B9B",
              fontSize: 14,
              marginLeft: 16,
              fontFamily: fonts.primaryBold,
              marginTop: 8,
            }}
          >
            Podijeli
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            onPress={() =>
              Linking.openURL(
                "https://www.facebook.com/sharer/sharer.php?u=https://stage.360bih.ba/blog/" +
                  blog.slug
              )
            }
          >
            <FontAwesome name="facebook-square" size={36} color="#9B9B9B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 24 }}
            onPress={() =>
              Linking.openURL(
                "https://www.instagram.com/" + blog.locations &&
                  blog.locations.length > 0
                  ? blog.locations[0].instagram
                  : ""
              )
            }
          >
            <FontAwesome name="instagram" size={36} color="#9B9B9B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 24 }}
            onPress={() =>
              Clipboard.setString("https://stage.360bih.ba/blog/" + blog.slug)
            }
          >
            <FontAwesome name="clipboard" size={36} color="#9B9B9B" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleBlog;
