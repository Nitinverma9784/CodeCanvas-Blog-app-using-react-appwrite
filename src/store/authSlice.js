import { createSlice } from "@reduxjs/toolkit";
// creating to check if the user is authenticated or not will ask the store

const initialState = {
    status:false,
    userData:null
}

const authSlice = createSlice({
name : "auth",
initialState,
reducers:{
    login: (state,action) =>{
        state.status = true;
        state.userData = action.payload.userData;

    },
    logout: (state) => {
        state.status = false,
        state.userData = null;
    }

}
})
export const {login,logout} = authSlice.actions;//why exporting this? cuz login & logout are actions in authSlice
export default authSlice.reducer;
