import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import SelectCityScreen from './app/SelectCityScreen';


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <SelectCityScreen />
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/icons/home.png'),
      require('./assets/icons/icon.png'),
      require('./assets/icons/logo.png'),
      require('./assets/icons/logowhite.png'),
      require('./assets/icons/splash.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      "Roboto-Regular": require("./assets/fonts/rregular.ttf"),
      "Roboto-Medium": require("./assets/fonts/rmedium.ttf"),
      "Roboto-Light": require("./assets/fonts/rlight.ttf"),
      "Roboto-Bold": require("./assets/fonts/rbold.ttf"),
      "GTWalsheimProB": require("./assets/fonts/GTWalsheimPro-Bold.ttf"),
      "GTWalsheimProL": require("./assets/fonts/GTWalsheimPro-Light.ttf"),
      "GTWalsheimProM": require("./assets/fonts/GTWalsheimPro-Medium.ttf")
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    paddingTop:(Platform.OS === 'ios') ? 20 : 0,
    flex: 1,
    backgroundColor: '#fff',
  },
});
