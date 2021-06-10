import React, { useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native';
import Purchases from 'react-native-purchases';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import config from './src/aws-exports';
import { API_KEY } from './src/config';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function App() {
  // const [purchasesSetup, setPurchasesSetup] = useState(false);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   Purchases.setDebugLogsEnabled(true);
  //   Purchases.setup(API_KEY);
  // }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);