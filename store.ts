import { configureStore } from "@reduxjs/toolkit";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import users from "./reducers/users";
import filters from "./reducers/filters";
import badges from "./reducers/badges";
import records from "./reducers/records";

const persistConfig = {
  key: "users",
  storage: AsyncStorage,
  whitelist: ["value"],
};

const persistedUsersReducer = persistReducer(persistConfig, users);

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
    filters,
    badges,
    records,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
