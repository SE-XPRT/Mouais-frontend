import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserState = {
  value: {
    email: string | "";
    token: string | "";
    pseudo: string | "";
    coins: number;
    guestCoins: number;
    badges: [];
  };
};

const initialState: UserState = {
  value: {
    email: "",
    token: "",
    pseudo: "",
    coins: 0,
    guestCoins: 3,
    badges: [],
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.value.email = action.payload;
      AsyncStorage.setItem("userEmail", action.payload);
    },
    updateToken: (state, action) => {
      state.value.token = action.payload;
      AsyncStorage.setItem("userToken", action.payload);
    },
    updatePseudo: (state, action) => {
      state.value.pseudo = action.payload;
    },
    logout: (state) => {
      state.value.email = "";
      state.value.token = "";
      state.value.pseudo = "";
      state.value.coins = 0;
      AsyncStorage.multiRemove(["userEmail", "userToken", "userCoins"]);
    },
    loadStoredData: (state, action) => {
      state.value.email = action.payload.email || "";
      state.value.token = action.payload.token || "";
      state.value.pseudo = "";
    },
    loadStoredGuestCoins: (state, action: PayloadAction<number>) => {
      state.value.guestCoins = action.payload;
    },
    updateCoins: (state, action: PayloadAction<number>) => {
      if (state.value.token) {
        state.value.coins += action.payload;
        AsyncStorage.setItem("userCoins", state.value.coins.toString());
      } else {
        state.value.guestCoins += action.payload;
        AsyncStorage.setItem("guestCoins", state.value.guestCoins.toString());
      }
    },
    actualizeCoins: (state, action: PayloadAction<number>) => {
      state.value.coins = action.payload;
      AsyncStorage.setItem("userCoins", action.payload.toString());
    },
  },
});

export const {
  updateEmail,
  updateToken,
  updatePseudo,
  logout,
  loadStoredData,
  loadStoredGuestCoins,
  updateCoins,
  actualizeCoins,
} = usersSlice.actions;

export default usersSlice.reducer;
