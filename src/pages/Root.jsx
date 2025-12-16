// import React, { useEffect } from "react";
// //React-dom
// import ReactDOM from "react-dom";

// //React-router-dom
// import { Outlet, useLocation, useSubmit } from "react-router-dom";

// //Import components
// import MainNavigation from "../components/MainNavigation";
// import Footer from "../components/Footer";

// //Import react-redux hooks
// import { useDispatch } from "react-redux";

// //Axios
// import axios from "axios";

// //Import auth actions
// import { authActions } from "../store/auth";

// //Import products actions
// import { productActions } from "../store/product";

// //Utilfuncs
// import { getAuthToken, getTokenDuration } from "../utils/auth";
// //Improt cart actions
// import { cartActions } from "../store/cart";
// import LiveChat from "../components/LiveChat";

// const Root = () => {
//   //isAuthenticated ,userName

//   //submit
//   const submit = useSubmit();

//   //location object
//   const location = useLocation();

//   //dispatch
//   const dispatch = useDispatch();

//   //Handle navigation page
//   useEffect(() => {
//     //Hide popup
//     dispatch(productActions.hidePopup());
//     //Get userName from localStorage
//     const userName = localStorage.getItem("userName");
//     //Check cart from local Storage
//     const listCart = localStorage.getItem("cart")
//       ? JSON.parse(localStorage.getItem("cart"))
//       : [];

//     if (listCart.length > 0) {
//       //Dispatch to update cart
//       dispatch(cartActions.updateCart(listCart));
//     } else {
//       //Empty cart state
//       dispatch(cartActions.setEmptyCart());
//     }

//     //Scroll to top
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     // token
//     const token = getAuthToken();

//     //If no token
//     if (!token) {
//       delete axios.defaults.headers.common["Authorization"];
//       return;
//     }
//     //Token expired
//     if (token === "TOKEN EXPIRED" || !userName) {
//       submit(null, { action: "/logout", method: "post" });
//       dispatch(authActions.onLogout());
//       delete axios.defaults.headers.common["Authorization"];
//       return;
//     }
//     //Token valid
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//     //Dispatch setAuth action
//     dispatch(authActions.setAuth({ userName, token }));

//     //Get token duration
//     const tokenDuration = getTokenDuration();

//     //Auto logout when token expired
//     let timeoutId = setTimeout(() => {
//       delete axios.defaults.headers.common["Authorization"];
//       submit(null, { action: "/logout", method: "post" });
//       dispatch(authActions.onLogout());
//     }, tokenDuration);

//     //Clean up function
//     return () => {
//       //Clear timeout
//       clearTimeout(timeoutId);
//     };
//   }, [location.pathname, dispatch, submit]);

//   return (
//     <div>
//       {/* Create portal to render live chat component*/}
//       {ReactDOM.createPortal(
//         <LiveChat />,
//         document.getElementById("live-chat")
//       )}

//       {/* Render Main Navigation */}
//       <MainNavigation />
//       <main>
//         {/* Render nested routes  */}
//         <Outlet />
//       </main>
//       {/* Render Footer Component */}
//       <Footer />
//     </div>
//   );
// };

// export default Root;

// import React, { useEffect } from "react";
// //React-dom
// import ReactDOM from "react-dom";

// //React-router-dom
// import { Outlet, useLocation, useSubmit } from "react-router-dom";

// //Import components
// import MainNavigation from "../components/MainNavigation";
// import Footer from "../components/Footer";

// //Import react-redux hooks
// import { useDispatch } from "react-redux";

// //Axios
// import axios from "axios";

// //Import auth actions
// import { authActions } from "../store/auth";

// //Import products actions
// import { productActions } from "../store/product";

// //Hàm tiện ích
// import { getAuthToken, getTokenDuration } from "../utils/auth";
// //Import cart actions
// import { cartActions } from "../store/cart";
// // import LiveChat from "../components/LiveChat";
// import ContactFAB from '../components/ContactFAB'; // Đảm bảo đường dẫn đúng

// const Root = () => {
//   //isAuthenticated ,userName

//   //submit
//   const submit = useSubmit();

//   //đối tượng location
//   const location = useLocation();

//   //dispatch
//   const dispatch = useDispatch();

//   //Xử lý khi điều hướng trang
//   useEffect(() => {
//     //Ẩn popup
//     dispatch(productActions.hidePopup());
//     //Lấy userName từ localStorage
//     const userName = localStorage.getItem("userName");
//     //Kiểm tra giỏ hàng từ localStorage
//     const listCart = localStorage.getItem("cart")
//       ? JSON.parse(localStorage.getItem("cart"))
//       : [];

//     if (listCart.length > 0) {
//       //Dispatch để cập nhật giỏ hàng
//       dispatch(cartActions.updateCart(listCart));
//     } else {
//       //Giỏ hàng rỗng
//       dispatch(cartActions.setEmptyCart());
//     }

//     //Cuộn lên đầu trang
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     // token
//     const token = getAuthToken();

//     //Nếu không có token
//     if (!token) {
//       delete axios.defaults.headers.common["Authorization"];
//       return;
//     }
//     //Token hết hạn
//     if (token === "TOKEN EXPIRED" || !userName) {
//       submit(null, { action: "/logout", method: "post" });
//       dispatch(authActions.onLogout());
//       delete axios.defaults.headers.common["Authorization"];
//       return;
//     }
//     //Token hợp lệ
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//     //Dispatch setAuth action
//     dispatch(authActions.setAuth({ userName, token }));

//     //Lấy thời gian hết hạn token
//     const tokenDuration = getTokenDuration();

//     //Tự động đăng xuất khi token hết hạn
//     let timeoutId = setTimeout(() => {
//       delete axios.defaults.headers.common["Authorization"];
//       submit(null, { action: "/logout", method: "post" });
//       dispatch(authActions.onLogout());
//     }, tokenDuration);

//     //Hàm clean up
//     return () => {
//       //Xóa timeout
//       clearTimeout(timeoutId);
//     };
//   }, [location.pathname, dispatch, submit]);

//   return (
//     <div>
//       {/* Tạo portal để render component live chat */}
//       {ReactDOM.createPortal(
//         <LiveChat />,
//         document.getElementById("live-chat")
//       )}

//       {/* Render thanh điều hướng chính */}
//       <MainNavigation />
//       <main>
//         {/* Render các route lồng nhau */}
//         <Outlet />
//       </main>
//       {/* Render Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Root;

// ===== FILE: pages/Root.jsx =====

import React, { useEffect } from "react";
import { Outlet, useLocation, useSubmit } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

// Components
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import ContactFAB from "../components/ContactFAB";

// Actions
import { authActions } from "../store/auth";
import { productActions } from "../store/product";
import { cartActions } from "../store/cart";

// Utils
import { getAuthToken, getTokenDuration } from "../utils/auth";

const Root = () => {
  const submit = useSubmit();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Ẩn popup khi chuyển trang
    dispatch(productActions.hidePopup());

    // Lấy userName từ localStorage
    const userName = localStorage.getItem("userName");

    // Kiểm tra giỏ hàng từ localStorage
    const listCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    if (listCart.length > 0) {
      dispatch(cartActions.updateCart(listCart));
    } else {
      dispatch(cartActions.setEmptyCart());
    }

    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Xử lý token
    const token = getAuthToken();

    if (!token) {
      delete axios.defaults.headers.common["Authorization"];
      return;
    }

    if (token === "TOKEN EXPIRED" || !userName) {
      submit(null, { action: "/logout", method: "post" });
      dispatch(authActions.onLogout());
      delete axios.defaults.headers.common["Authorization"];
      return;
    }

    // Token hợp lệ
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(authActions.setAuth({ userName, token }));

    // Lấy thời gian hết hạn token
    const tokenDuration = getTokenDuration();

    if (tokenDuration > 0) {
      // Tự động logout khi token hết hạn
      const timeoutId = setTimeout(() => {
        console.log("Token expired, logging out automatically.");
        delete axios.defaults.headers.common["Authorization"];
        submit(null, { action: "/logout", method: "post" });
        dispatch(authActions.onLogout());
      }, tokenDuration);

      // Cleanup
      return () => clearTimeout(timeoutId);
    } else {
      // Token đã hết hạn hoặc không hợp lệ
      console.log("Token already expired or invalid duration, logging out.");
      delete axios.defaults.headers.common["Authorization"];
      submit(null, { action: "/logout", method: "post" });
      dispatch(authActions.onLogout());
    }
  }, [location.pathname, dispatch, submit]);

  return (
    <div>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ContactFAB />
    </div>
  );
};

export default Root;
