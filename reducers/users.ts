import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  value: { email: null },
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateEmail: (state: UserState, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
  },
});

export const { updateEmail } = userSlice.actions;
export default userSlice.reducer;
