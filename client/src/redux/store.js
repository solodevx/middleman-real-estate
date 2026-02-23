import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/es/storage";

// 1️⃣ Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// 2️⃣ Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist user slice
  version: 1,
};

// 3️⃣ Wrap rootReducer in persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ allows redux-persist objects
    }),
});

// 5️⃣ Persistor
export const persistor = persistStore(store);