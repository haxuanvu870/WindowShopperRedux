import { createSlice } from '@reduxjs/toolkit'
import { CartItem } from '../../types/CartItem';

interface ICartState {
    isLoading: boolean;
    cart: CartItem[];
}

const initialState: ICartState = {
    isLoading: true,
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsLoading: (state, {payload}) => { state.isLoading = payload },
        setCart: (state, {payload}) => { state.cart = payload },
        removeFromCart: (state, {payload}) => { state.cart = state.cart.filter(item => item.id !== payload) },
    },
})

export const { setIsLoading, setCart, removeFromCart } = cartSlice.actions

export const selectIsLoading = (state) => state.cart.isLoading
export const selectCart = (state) => state.cart.cart

export default cartSlice.reducer