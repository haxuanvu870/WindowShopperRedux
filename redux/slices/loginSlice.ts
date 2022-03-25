import { createSlice } from '@reduxjs/toolkit'

interface IDetailsState {
    isPasswordVisible: boolean;
    isEmailValidated: false;
    isPasswordValidated: false;
    isSignInButtonEnabled: false;
};

const initialState: IDetailsState = {
    isPasswordVisible: false,
    isEmailValidated: false,
    isPasswordValidated: false,
    isSignInButtonEnabled: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setPasswordAsVisible: (state, { payload }) => {
            state.isPasswordVisible = payload
        },
        setEmailAsValidated: (state, { payload }) => {
            state.isEmailValidated = payload
        },
        setPasswordAsValidated: (state, { payload }) => {
            state.isPasswordValidated = payload
        },
        setSignInButtonAsEnabled: (state, { payload }) => {
            state.isSignInButtonEnabled = payload
        },
    },
})

export const { setPasswordAsVisible, setEmailAsValidated, setPasswordAsValidated, setSignInButtonAsEnabled } = loginSlice.actions

export const selectPasswordVisibility = (state) => state.login.isPasswordVisible
export const selectEmailIsValidated = (state) => state.login.isEmailValidated
export const selectPaswordIsValidated = (state) => state.login.isPasswordValidated
export const selectIsSignInButtonEnabled = (state) => state.login.isSignInButtonEnabled

export default loginSlice.reducer