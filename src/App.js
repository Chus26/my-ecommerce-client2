// //Import from react-router-dom
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// //Import components
// import Root from "./pages/Root";
// import ErrorPage from "./pages/ErrorPage";
// import HomePage, { loader as productListLoader } from "./pages/HomePage";

// import ShopPage from "./pages/ShopPage";
// import DetailPage, { loader as productDetailLoader } from "./pages/DetailPage";
// import CartPage from "./pages/CartPage";
// import CheckOutPage, {
//   loader as currenUserLoader,
//   action as CreateOrder,
// } from "./pages/CheckOutPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import { action as authAction } from "./components/AuthForm";
// import { action as logoutAction } from "./pages/Logout";
// import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
// import ProtectedRoutes from "./components/ProtectedRoutes";
// import OrdersPage, { loader as ordersLoader } from "./pages/OrdersPage";
// import ThankYouPage from './pages/ThankYouPage';
// import ProfilePage, { 
//   loader as profileLoader, 
//   action as profileAction 
// } from "./pages/ProfilePage";

// import OrderDetailPage, {
//   loader as orderDetailLoader,
//   action as productReviewAction,
// } from "./pages/OrderDetailPage";



// //Defines  routes via  createBrowerRouter func
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     id: "products",
//     loader: productListLoader,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: "shop",
//         element: <ShopPage />,
//       },
//       {
//         path: "detail/:productId",
//         element: <DetailPage />,
//         loader: productDetailLoader,
//         action: productReviewAction,
//       },
//       {
//         path: "cart",
//         element: <CartPage />,
//       },
//       {
//         path: "checkout",
//         element: (
//           <ProtectedRoutes>
//             <CheckOutPage />
//           </ProtectedRoutes>
//         ),
//         loader: currenUserLoader,
//         action: CreateOrder,
//       },
//       { // <<< --- 2. ADD THIS ROUTE OBJECT ---
//         path: "thank-you",
//         element: <ThankYouPage />,
//         // No loader or action needed for a simple thank you page
//       },
//       {
//         path: "orders",
//         element: (
//           <ProtectedRoutes>
//             <OrdersPage />
//           </ProtectedRoutes>
//         ),

//         loader: ordersLoader,
//       },
//       {
//         path: "orders/:orderId",
//         element: (
//           <ProtectedRoutes>
//             <OrderDetailPage />
//           </ProtectedRoutes>
//         ),
//         loader: orderDetailLoader,
//       },
//       {
//         path: "profile",
//         element: (
//           <ProtectedRoutes>
//             <ProfilePage />
//           </ProtectedRoutes>
//         ),
//         loader: profileLoader, // Dùng loader để lấy thông tin user
//         action: profileAction, // Dùng action để cập nhật
//       },

//       {
//         path: "login",
//         element: (
//           <ProtectedAuthRoute>
//             <LoginPage />
//           </ProtectedAuthRoute>
//         ),
//         action: authAction,
//       },

//       {
//         path: "signup",
//         element: (
//           <ProtectedAuthRoute>
//             <RegisterPage />
//           </ProtectedAuthRoute>
//         ),
//         action: authAction,
//       },
//       {
//         path: "/logout",
//         element: null,
//         action: logoutAction,
//       },
//     ],
//   },
// ]);

// function App() {
//   //Render Router Component Tree
//   return <RouterProvider router={router} />;
// }

// export default App;

// ===== FILE: App.js =====

// Import from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import components
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as productListLoader } from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

import DetailPage, {
  loader as productDetailLoader,
  action as productReviewAction,
} from "./pages/DetailPage";

import CartPage from "./pages/CartPage";
import CheckOutPage, {
  loader as currenUserLoader,
  action as CreateOrder,
} from "./pages/CheckOutPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { action as authAction } from "./components/AuthForm";
import { action as logoutAction } from "./pages/Logout";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
import ProtectedRoutes from "./components/ProtectedRoutes";

import OrdersPage, { loader as ordersLoader } from "./pages/OrdersPage";
import ThankYouPage from "./pages/ThankYouPage";

import ProfilePage, {
  loader as profileLoader,
  action as profileAction,
} from "./pages/ProfilePage";

import OrderDetailPage, {
  loader as orderDetailLoader,
} from "./pages/OrderDetailPage";

// Define routes via createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "products",
    loader: productListLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: productDetailLoader,
        action: productReviewAction,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <CheckOutPage />
          </ProtectedRoutes>
        ),
        loader: currenUserLoader,
        action: CreateOrder,
      },
      {
        path: "thank-you",
        element: <ThankYouPage />,
      },
      {
        path: "orders",
        element: (
          <ProtectedRoutes>
            <OrdersPage />
          </ProtectedRoutes>
        ),
        loader: ordersLoader,
      },
      {
        path: "orders/:orderId",
        element: (
          <ProtectedRoutes>
            <OrderDetailPage />
          </ProtectedRoutes>
        ),
        loader: orderDetailLoader,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
        loader: profileLoader,
        action: profileAction,
      },
      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            <LoginPage />
          </ProtectedAuthRoute>
        ),
        action: authAction,
      },
      {
        path: "signup",
        element: (
          <ProtectedAuthRoute>
            <RegisterPage />
          </ProtectedAuthRoute>
        ),
        action: authAction,
      },
      {
        path: "logout",
        element: null,
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
