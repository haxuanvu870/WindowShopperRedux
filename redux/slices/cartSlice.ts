import { createSlice } from '@reduxjs/toolkit'
import { CartItem } from '../../types/CartItem';

interface ICartState {
    isLoading: boolean;
    cart: CartItem[];
    totalItems: number;
    totalPrice: string;
}

const initialState: ICartState = {
    isLoading: true,
    cart: [],
    totalItems: 0,
    totalPrice: '0.00'
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsLoading: (state, {payload}) => { state.isLoading = payload },
        setCart: (state, {payload}) => { state.cart = payload },
        setTotalItems: (state, {payload}) => { state.totalItems = payload },
        setTotalPrice: (state, {payload}) => { state.totalPrice = payload },
    },
})

export const { setIsLoading, setCart, setTotalItems, setTotalPrice } = cartSlice.actions

export const selectIsLoading = (state) => state.cart.isLoading
export const selectCart = (state) => state.cart.cart
export const selectTotalItems = (state) => state.cart.totalItems
export const selectTotalPrice = (state) => state.cart.totalPrice

export default cartSlice.reducer