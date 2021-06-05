import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import { WebView } from 'react-native-webview';

class VirtualScreen extends Component {
  render() {
    const item = this.props.screenProps.state.params;
    return (
      <WebView
        source={{ uri: item.video_url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}  
      />
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