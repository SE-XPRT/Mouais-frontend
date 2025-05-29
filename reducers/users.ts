import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    email: string;
    token: string;
    pseudo: string;
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
    updateEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.value.token = action.payload;
    },
    updatePseudo: (state, action: PayloadAction<string>) => {
      state.value.pseudo = action.payload;
    },
    logout: (state) => {
      state.value = {
        email: "",
        token: "",
        pseudo: "",
        coins: 0,
        guestCoins: 3,
        badges: [],
      };
    },
    loadStoredData: (state, action: PayloadAction<Partial<UserState["value"]>>) => {
      state.value.email = action.payload.email ?? "";
      state.value.token = action.payload.token ?? "";
      state.value.pseudo = action.payload.pseudo ?? "";
      state.value.coins = action.payload.coins ?? 0;
    },
    loadStoredGuestCoins: (state, action: PayloadAction<number>) => {
      state.value.guestCoins = action.payload;
    },
    updateCoins: (state, action: PayloadAction<number>) => {
      if (state.value.token) {
        state.value.coins += action.payload;
      } else {
        state.value.guestCoins += action.payload;
      }
    },
    actualizeCoins: (state, action: PayloadAction<number>) => {
      state.value.coins = action.payload;
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
