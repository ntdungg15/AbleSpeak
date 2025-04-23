import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    userInfo : null,
    token : null,
};
export const User = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        // state : current data, action : sent data
        loginSuccess: (state, action) => {
          state.isLoggedIn = true;
          state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
        },
        logout: () => {
            console.log("Logout")
            return initialState; // Reset toàn bộ state về giá trị ban đầu
        }
    }
})
export const { logout , loginSuccess} = User.actions; //destructoring

export default User;