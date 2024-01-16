import { configureStore, combineReducers } from '@reduxjs/toolkit'
import eventsReducer from '@/store/reducers/eventsReducer'
import menuReducer from '@/store/reducers/menuReducer'
import profileReducer from '@/store/reducers/profileReducer'
import messagesReducer from "@/store/reducers/messagesReducer";
import notificationsReducer from "@/store/reducers/notificationsReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  menu: menuReducer,
  profile: profileReducer,
  notifications: notificationsReducer,
  messages: messagesReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  }) 
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']