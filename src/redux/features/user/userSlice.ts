import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../../interface/authInterface";

interface TInitState {
  data: {
    name: string;
    email: string;
    _id: string;
  };
}

const initialState: TInitState = {
  data: {
    name: "",
    email: "",
    _id: "",
  },
};

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<TUser>) => {
      state.data = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
