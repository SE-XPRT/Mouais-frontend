import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type d’un badge
export type Badge = {
  _id: string;
  name: string;
  description: string;
  iconURL: string;
  criteria: string[];
};

// Le type complet du slice
export type BadgesState = {
  list: Badge[];
  unlocked: Badge[];
  latestUnlocked: Badge | null;
};

const initialState: BadgesState = {
  list: [],
  unlocked: [],
  latestUnlocked: null,
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
      const alreadyUnlocked = state.list.some((b) => b._id === newBadge._id);
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
  },
});

export const { setBadges, unlockBadge, resetBadges } = badgesSlice.actions;
export default badgesSlice.reducer;
