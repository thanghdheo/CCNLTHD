import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    currentUser : null,
    isFetching: false,
    error: false,
    user: ''
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    loginStart : (state) => {
        state.isFetching = true
    },
    loginSuccess : (state,action) => {
        state.isFetching = false;
        state.currentUser = action.payload.currentUser;
        state.user = action.payload.user
    },
    loginFailure : (state) => {
        state.isFetching = false;
        state.error = true
    },
    setUsername: (state,action) => {
        state.user = action.payload
    }
    },
});

const { actions, reducer } = userSlice;
export const {loginFailure,loginStart,loginSuccess,setUsername } = actions;
export default reducer;
