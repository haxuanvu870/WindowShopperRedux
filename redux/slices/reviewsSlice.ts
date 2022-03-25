import { createSlice } from '@reduxjs/toolkit'
import { Review } from '../../types/Review';

interface IReviewState {
    isLoading: boolean;
    reviews: Review[],
}

const initialState: IReviewState = {
    isLoading: true,
    reviews: [],
}

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setIsLoading: (state, {payload}) => { state.isLoading = payload },
        setReviews: (state, {payload}) => { state.reviews = payload },
    },
})

export const { setIsLoading, setReviews } = reviewsSlice.actions

export const selectIsLoading = (state) => state.reviews.isLoading
export const selectReviews = (state) => state.reviews.reviews

export default reviewsSlice.reducer