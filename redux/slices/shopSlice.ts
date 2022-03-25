import { createSlice } from '@reduxjs/toolkit'
import { Item } from '../../types/Item';

interface IShopState {
    isLoading: boolean;
    items: Item[];
}

const initialState: IShopState = {
    isLoading: true,
    items: [],
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setIsLoading: (state, {payload}) => { state.isLoading = payload },
        setItems: (state, {payload}) => { state.items = payload },
    },
})

export const { setIsLoading, setItems } = shopSlice.actions

export const selectIsLoading = (state) => state.shop.isLoading
export const selectItems = (state) => state.shop.items

export default shopSlice.reducer