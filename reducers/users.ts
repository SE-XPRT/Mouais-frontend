import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  value: {
    token: string | null;
    email: string | null;
  };
};

const initialState: UserState = {
  value: { token: null, email: null },
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateEmail: (state: UserState, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    updateToken: (state: UserState, action: PayloadAction<string>) => {
      state.value.token = action.payload;
    },
  },
});

export const { updateEmail, updateToken } = userSlice.actions;
export default userSlice.reducer;
