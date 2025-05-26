import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserState = {
  value: {
    email: string | "";
    token: string | "";
    pseudo: string | "";
  };
};

const initialState: UserState = {
  value: {
    email: "",
    token: "",
    pseudo: "",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.value.email = action.payload;
      // Sauvegarder l'email dans AsyncStorage
      AsyncStorage.setItem("userEmail", action.payload);
    },
    updateToken: (state, action) => {
      state.value.token = action.payload;
      // Sauvegarder le token dans AsyncStorage
      AsyncStorage.setItem("userToken", action.payload);
    },
    updatePseudo: (state, action) => {
      state.value.pseudo = action.payload;
      // On ne sauvegarde plus le pseudo dans AsyncStorage
    },
    logout: (state) => {
      state.value.email = "";
      state.value.token = "";
      state.value.pseudo = "";
      // On ne supprime plus le pseudo de AsyncStorage car il n'y est plus stocké
      AsyncStorage.multiRemove(["userEmail", "userToken"]);
    },
    // Nouveau reducer pour charger les données sauvegardées
    loadStoredData: (state, action) => {
      state.value.email = action.payload.email || "";
      state.value.token = action.payload.token || "";
      state.value.pseudo = "";
    },
  },
});

export const {
  updateEmail,
  updateToken,
  updatePseudo,
  logout,
  loadStoredData,
} = usersSlice.actions;
export default usersSlice.reducer;
