import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State initial
const initialState = {
  photosTaken: 0,
  averageRate: 0,
  averagePhotosPerDay: 0,
  loading: false,
  error: null as string | null,
};

// Typage automatique basé sur initialState
export type RecordsState = typeof initialState;

const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords: (
      state,
      action: PayloadAction<{
        photosTaken: number;
        averageRate: number;
        averagePhotosPerDay: number;
      }>
    ) => {
      state.photosTaken = action.payload.photosTaken;
      state.averageRate = action.payload.averageRate;
      state.averagePhotosPerDay = action.payload.averagePhotosPerDay;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRecords, setLoading, setError } = recordsSlice.actions;
export default recordsSlice.reducer;
