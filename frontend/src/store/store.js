import  { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice'


export const store = configureStore({
    reducer : authReducer
})