import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import locationNameSlice from './locationNameSlice'
import mapReducer from './mapSlice'
import authSlice from './auth'
import mapSlice from './mapSlice'
import clubSlice from './clubSlice'
import fetchRouteSlice from './fetchRouteSlice'
import langSlice from './langSlice'
import storiesSlice from './storiesSlice'
import locationSlice from './locationSlice'
import datingSlice from './datingSlice'
import mingleSlice from './mingleSlice'
import mingleCommentSlice from './mingleCommentSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  auth: authSlice,
  map: mapSlice,
  club: clubSlice,
  route: fetchRouteSlice,
  lang: langSlice,
  stories: storiesSlice,
  location: locationSlice,
  dating: datingSlice,
  minglePosts: mingleSlice,
  locationName: locationNameSlice,
  mingleComments: mingleCommentSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

store.subscribe(() => {
  // console.log('store', store.getState())
})
