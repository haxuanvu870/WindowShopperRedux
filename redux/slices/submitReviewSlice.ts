import { createSlice } from '@reduxjs/toolkit'

interface IShopState {
    rating: number;
    characterCount: number;
    review: string;
    isSubmitButtonEnabled: boolean;
}

const initialState: IShopState = {
    rating: 4,
    characterCount: 0,
    review: '',
    isSubmitButtonEnabled: false
}

export const submitReviewSlice = createSlice({
    name: 'submitReview',
    initialState,
    reducers: {
        setRating: (state, { payload }) => {
            state.rating = payload
        },
        setReview: (state, { payload }) => {
            state.review = payload.review
        },
        setCharacterCount: (state, { payload }) => {
            state.characterCount = payload.characterCount
            state.review = payload.review
        },
        setButtonAsEnabled: (state, { payload }) => {
            console.log(payload)
            state.isSubmitButtonEnabled = payload
        },
        submitReview: (state, { payload }) => {
            state.rating = payload.rating;
            state.characterCount = payload.characterCount
            state.review = payload.review
            state.isSubmitButtonEnabled = payload.isSubmitButtonEnabled
        },
    },
})

export const { setRating, setReview, setCharacterCount, setButtonAsEnabled } = submitReviewSlice.actions

export const selectRating = (state) => state.submitReview.rating
export const selectReview = (state) => state.submitReview.review
export const selectIsSubmitButtonEnabled = (state) => state.submitReview.isSubmitButtonEnabled

export default submitReviewSlice.reducer