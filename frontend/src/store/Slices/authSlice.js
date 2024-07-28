import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
    isLoggedIn: JSON.parse(localStorage.getItem("user")) ? true : false,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            localStorage.setItem("token", action.payload.accessToken);
            console.log(action.payload.user)
            let Loggeduser = { ...action.payload.user };
            delete Loggeduser.password;
            delete Loggeduser.email;
            localStorage.setItem("user", JSON.stringify(Loggeduser));
            state.user = Loggeduser
            state.isLoggedIn = true
        },
        logout(state, action) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            state.user = null
            state.isLoggedIn = false;
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

