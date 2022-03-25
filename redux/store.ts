import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './slices/authSlice';
import loginReducer from './slices/loginSlice';
import createAccountReducer from './slices/createAccountSlice';
import accountReducer from './slices/accountSlice';
import cartReducer from './slices/cartSlice';
import shopReducer from './slices/shopSlice';
import itemDetailsReducer from './slices/itemDetailsSlice';
import reviewsReducer from './slices/reviewsSlice';
import submitReviewReducer from './slices/submitReviewSlice';

export default configureStore({
    reducer: {
      auth: authReducer,
      login: loginReducer,
      createAccount: createAccountReducer,
      account: accountReducer,
      cart: cartReducer,
      shop: shopReducer,
      itemDetails: itemDetailsReducer,
      reviews: reviewsReducer,
      submitReview: submitReviewReducer
    },
    middleware: (applyMiddleware) => applyMiddleware(thunk)
})
