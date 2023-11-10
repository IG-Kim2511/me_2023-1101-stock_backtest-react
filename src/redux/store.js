// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';

// 🦄new : configureStore (createStore 새로운 버전)
const store = configureStore({
  reducer: {
     // 이름과 키를 정확하게 일치시킬 필요는 없지만, 이름과 키를 일치시키는 것은 코드를 이해하고 디버깅하기 쉽게 만드는 좋은 관행입니다. 
    cart: cartReducer, 
  },
});

export default store;


/* 
🦄 reducers 여러개 추가하기
  // store
  import { configureStore } from "@reduxjs/toolkit";
  import slideReducer from "../features/slices/sliderSlice";
  import productsReducer from "../features/slices/productsSlice";
  import cartReducer from "../features/slices/cartSlice";
  import authReducer from "../features/slices/authSlice";

  export const store = configureStore({
    reducer: {   
      slider: slideReducer,
      products: productsReducer,
      cart: cartReducer,
      user: authReducer,
    },
  });
*/