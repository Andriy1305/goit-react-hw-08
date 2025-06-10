import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import { filtersReducer } from "./filters/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import { contactsReducer } from "./contacts/slice";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  auth: authReducer,
  filters: filtersReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "filters"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
