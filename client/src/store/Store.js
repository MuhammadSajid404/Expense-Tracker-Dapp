import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { SliceReducer } from './Slice'

export const Store = configureStore({
    reducer: {
        SliceReducer: SliceReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})