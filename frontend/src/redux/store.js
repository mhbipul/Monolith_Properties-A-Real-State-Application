import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice'


export const store = configureStore({
  reducer: {user: useReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data
      //immutableCheck: false, // Disable immutable check for performance
    }
  )
})