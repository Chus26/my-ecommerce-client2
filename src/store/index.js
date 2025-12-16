// //Improt configureStore from redux toolkit
// import { configureStore } from '@reduxjs/toolkit';

// //Import product slice reducer
// import productSlice from './product';

// //Import auth slice reducer
// import authSlice from './auth';

// //Import cart slice reducer
// import cartSlice from './cart';

// //Import live chat slice reducer
// import liveChatSlice from './live-chat';

// const store = configureStore({
//   reducer: {
//     product: productSlice,
//     auth: authSlice,
//     cart: cartSlice,
//     liveChat: liveChatSlice,
//   },
// });

// //export store
// export default store;

//Import configureStore từ redux toolkit
import { configureStore } from '@reduxjs/toolkit';

//Import reducer của product slice
import productSlice from './product';

//Import reducer của auth slice
import authSlice from './auth';

//Import reducer của cart slice
import cartSlice from './cart';



const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    cart: cartSlice,
  },
});

//Xuất store
export default store;
