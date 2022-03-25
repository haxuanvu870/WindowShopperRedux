import { createSlice } from '@reduxjs/toolkit'

interface IDetailsState {
    selectedSize: string;
    selectedQuantity: string,
};

const initialState: IDetailsState = {
    selectedSize: 'S',
    selectedQuantity: '1',
};

export const itemDetailsSlice = createSlice({
    name: 'itemDetails',
    initialState,
    reducers: {
        setSelectedSize: (state, { payload }) => {
            state.selectedSize = payload
        },
        setSelectedQuantity: (state, { payload }) => {
            state.selectedQuantity = payload
        },
    },
})

export const {
    setSelectedSize,
    setSelectedQuantity,
} = itemDetailsSlice.actions

export const selectSelectedSize = (state) => state.itemDetails.selectedSize
export const selectSelectedQuantity = (state) => state.itemDetails.selectedQuantity

export default itemDetailsSlice.reducer