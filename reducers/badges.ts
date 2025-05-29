import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type d’un badge
export type Badge = {
  _id: string;
  name: string;
  description: string;
  iconURL: string;
  iconName: string;
  criteria: string[];
};

// Le type complet du slice
export type BadgesState = {
  list: Badge[];
  unlocked: Badge[];
  latestUnlocked: Badge | null;
  hasWonFilterBadge: boolean;
};

const initialState: BadgesState = {
  list: [],
  unlocked: [],
  latestUnlocked: null,
  hasWonFilterBadge: false,
};

const badgesSlice = createSlice({
  name: "badges",
  initialState,
  reducers: {
    setBadges: (state, action: PayloadAction<Badge[]>) => {
      state.list = action.payload;
    },
    unlockBadge: (state, action: PayloadAction<Badge>) => {
      const newBadge = action.payload;
      const alreadyUnlocked = state.unlocked.some(
        (b) => b._id === newBadge._id
      );
      if (!alreadyUnlocked) {
        state.list.push(newBadge);
        state.unlocked.push(newBadge);
        state.latestUnlocked = newBadge;
      }
    },
    resetLatestUnlocked: (state) => {
      state.latestUnlocked = null;
    },
    resetBadges: (state) => {
      state.unlocked = [];
      state.latestUnlocked = null;
    },
    setHasWonFilterBadge: (state, action: PayloadAction<boolean>) => {
      state.hasWonFilterBadge = action.payload;
    },
  },
});

export const {
  setBadges,
  unlockBadge,
  resetLatestUnlocked,
  resetBadges,
  setHasWonFilterBadge,
} = badgesSlice.actions;
export default badgesSlice.reducer;
