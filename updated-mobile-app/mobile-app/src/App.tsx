import '../i18.config'

import { QueryClient, QueryClientProvider } from 'react-query'
import { persistor, store } from './store/store'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React, { useEffect } from 'react'
import { RootNavigation } from './RootNavigation'
import Toast from 'react-native-toast-message'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Settings } from 'react-native-fbsdk-next'

import { NativeModules, NativeEventEmitter } from 'react-native'
import { Cache } from 'react-native-cache'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  NotificationToaster,
  NotificationToasterHelper
} from './components/NotificationToast'

GoogleSignin.configure()
Settings.initializeSDK()

const queryClient = new QueryClient()

function App(): JSX.Element {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigation />
            <Toast />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default App
