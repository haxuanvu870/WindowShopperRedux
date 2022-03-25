import { createSlice } from '@reduxjs/toolkit'

interface ICreateAccountState {
    isPasswordVisible: boolean;
    isConfirmPasswordVisible: boolean;
    isEmailValidated: boolean;
    isPasswordValidated: boolean;
    isConfirmPasswordValidated: boolean;
    isSignUpButtonEnabled: boolean;
};

const initialState: ICreateAccountState = {
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
    isEmailValidated: false,
    isPasswordValidated: false,
    isConfirmPasswordValidated: false,
    isSignUpButtonEnabled: false
};

export const createAccountSlice = createSlice({
    name: 'createAccount',
    initialState,
    reducers: {
        setPasswordAsVisible: (state, { payload }) => {
            state.isPasswordVisible = payload
        },
        setConfirmPasswordAsVisible: (state, { payload }) => {
            state.isConfirmPasswordVisible = payload
        },
        setEmailAsValidated: (state, { payload }) => {
            state.isEmailValidated = payload
        },
        setPasswordAsValidated: (state, { payload }) => {
            state.isPasswordValidated = payload
        },
        setConfirmPasswordAsValidated: (state, { payload }) => {
            state.isConfirmPasswordValidated = payload
        },
        setSignUpButtonAsEnabled: (state, { payload }) => {
            state.isSignUpButtonEnabled = payload
        },
    },
})

export const {
    setPasswordAsVisible,
    setConfirmPasswordAsVisible,
    setEmailAsValidated,
    setPasswordAsValidated,
    setConfirmPasswordAsValidated,
    setSignUpButtonAsEnabled
} = createAccountSlice.actions

export const selectPasswordVisibility = (state) => state.createAccount.isPasswordVisible
export const selectConfirmPasswordVisibility = (state) => state.createAccount.isConfirmPasswordVisible

export const selectEmailIsValidated = (state) => state.createAccount.isEmailValidated
export const selectPaswordIsValidated = (state) => state.createAccount.isPasswordValidated
export const selectConfirmPaswordIsValidated = (state) => state.createAccount.isConfirmPasswordValidated
export const selectIsSignUpButtonEnabled = (state) => state.createAccount.isSignUpButtonEnabled

export default createAccountSlice.reducer