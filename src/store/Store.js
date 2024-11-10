import {configureStore} from '@reduxjs/toolkit'
import feedReducer from './slices/feedSlice'
import authReducer from './slices/authSlice'

export const store =configureStore({
    reducer: {
        feedSlice:feedReducer,
        authSlice:authReducer,
    }
})


