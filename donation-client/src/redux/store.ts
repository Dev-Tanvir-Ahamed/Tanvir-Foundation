import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import donationReducer from "./features/donation/donationSlice";
// Persist configuration
const persistConfig = {
  key: "root", // key for the persisted state
  storage, // use localStorage as the default storage
  whitelist: ["auth", "donation", "Gratitude"], // Specify which slices to persist
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  donation: donationReducer,
  [baseApi.reducerPath]: baseApi.reducer, // API reducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore these actions for serializable check
      },
    }).concat(baseApi.middleware),
  devTools: true,
});

// Create persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
