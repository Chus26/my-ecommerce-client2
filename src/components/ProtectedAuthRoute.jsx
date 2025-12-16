// import React from "react";

// //React router dom
// import { Navigate } from "react-router-dom";

// const ProtectedAuthRoute = (props) => {
//   //Get token from localStorage
//   const token = localStorage.getItem("token");

//   //Get redirect
//   const redirect = localStorage.getItem("redirect");
//   let pathname = redirect;

//   //If user logged in
//   if (token && token !== "TOKEN EXPIRED") {
//     //Redirect to save page /  homepage when entering login/signup page
//     if (pathname) {
//       localStorage.removeItem("redirect");
//       return <Navigate to={pathname}></Navigate>;
//     }

//     return <Navigate to="/" />;
//   }

//   return <React.Fragment>{props.children}</React.Fragment>;
// };

// export default ProtectedAuthRoute;

import React from "react";

//React router dom
import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = (props) => {
  //Lấy token từ localStorage
  const token = localStorage.getItem("token");

  //Lấy đường dẫn redirect
  const redirect = localStorage.getItem("redirect");
  let pathname = redirect;

  //Nếu người dùng đã đăng nhập
  if (token && token !== "TOKEN EXPIRED") {
    //Chuyển hướng về trang đã lưu / trang chủ khi vào trang login/signup
    if (pathname) {
      localStorage.removeItem("redirect");
      return <Navigate to={pathname}></Navigate>;
    }

    return <Navigate to="/" />;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ProtectedAuthRoute;
