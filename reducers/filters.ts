import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  zones: {
    cheveux: false,
    smile: false,
    makeup: false,
    outfit: false,
  },
  tone: 50,
};

export type FiltersState = typeof initialState;

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleZone: (
      state,
      action: PayloadAction<keyof typeof initialState.zones>
      // typeof initialState.zones = l'objet { cheveux: false, smile: false, ... }
      // keyof ... = les noms des clés de cet objet
      // Equivalent à : PayloadAction<"cheveux" | "smile" | "makeup" | "outfit">
    ) => {
      state.zones[action.payload] = !state.zones[action.payload];
      // Bascule logique : chaque fois que le user clique, ça inverse true/false
    },
    setTone: (state, action: PayloadAction<number>) => {
      state.tone = action.payload;
    },
  },
});

export const { toggleZone, setTone } = filtersSlice.actions;
export default filtersSlice.reducer;
