// import React from 'react';

// //Import css module
// import classes from './Overlay.module.css';

// //Import from react-redux
// import { useDispatch } from 'react-redux';

// //Import product actions
// import { productActions } from '../store/product';

// const Overlay = () => {
//   //dispatch
//   const dispatch = useDispatch();

//   //Click overlay hide popup function
//   const overlayClickHandler = () => {
//     //dispatch to hide popup

//     dispatch(productActions.hidePopup());
//   };

//   return <div onClick={overlayClickHandler} className={classes.overlay}></div>;
// };

// export default Overlay;

import React from 'react';

//Import css module
import classes from './Overlay.module.css';

//Import từ react-redux
import { useDispatch } from 'react-redux';

//Import product actions
import { productActions } from '../store/product';

const Overlay = () => {
  //dispatch
  const dispatch = useDispatch();

  //Hàm xử lý khi click overlay để ẩn popup
  const overlayClickHandler = () => {
    //dispatch để ẩn popup
    dispatch(productActions.hidePopup());
  };

  return <div onClick={overlayClickHandler} className={classes.overlay}></div>;
};

export default Overlay;
