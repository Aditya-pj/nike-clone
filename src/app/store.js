import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { favouritesReducer } from "../features/favourites/favouriteSlice";

const persistConfig = {
    key:'root',
    storage,
    whitelist: ['cart','auth','favourites']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    'cart':cartReducer,
    'favourites':favouritesReducer,
    'auth':authReducer,
    
}));

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export const persistedStore = persistStore(store);
export default store;