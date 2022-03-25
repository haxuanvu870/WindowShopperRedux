import { createSlice } from '@reduxjs/toolkit'
import { Account } from '../../types/Account';

interface IAccountState {
    isLoading: boolean;
    account: Account;
}

const initialState: IAccountState = {
    isLoading: true,
    account: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setIsLoading: (state, {payload}) => { state.isLoading = payload },
        setAccount: (state, {payload}) => { state.account = payload },
        signOut: (state) => { state.account = null },
    },
})

export const { setIsLoading, setAccount, signOut } = accountSlice.actions
export const selectIsLoading = (state) => state.account.isLoading
export const selectAccount = (state) => state.account.user

export default accountSlice.reducer