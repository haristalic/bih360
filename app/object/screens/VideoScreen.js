import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,Image
} from 'react-native';
import fonts from '../../../styles/fonts';


import { WebView } from 'react-native-webview';
import moment from 'moment';



class VirtualScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, dataSource: [] }
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
 
    const getBackgroundColor =
      current_day_hours && this.isLocationOpen(current_day_hours)
        ? "#1fdc37"
        : "#F6697A";
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
      {( (location.video_url && location.video_url.length > 0))?( <WebView
        source={{ uri: item.video_url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}  
      />):(<View style={{alignItems: 'center',
      justifyContent: 'center',flex:1}}>
            <Image source={require('../../../assets/empty-box-img.png')} style={{ width:258,height:173,marginBottom:40}} />  
            <Text style={{fontSize:20,lineHeight:35, color:'#3f4968',  fontFamily: fonts.primaryMedium}}>Izabrana rubrika je{"\n"} trenutno prazna</Text>   
          </View>)}
     
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

export default VirtualScreen;