// import React from "react";
// import ReactDOM from "react-dom";
// //Import css module
// import classes from "./Products.module.css";


// //Import từ react-router-dom
// import { useRouteLoaderData} from "react-router-dom";



// //Import từ react-redux
// import { useDispatch, useSelector } from "react-redux";

// //Import product actions
// import { productActions } from "../store/product";
// import Overlay from "./Overlay";
// import ProductPopup from "./ProductPopup";

// const Products = () => {
//   //Lấy dữ liệu trả về từ hàm loader
//   const data = useRouteLoaderData("products");

//   //dispatch
//   const dispatch = useDispatch();

//   //Chọn state hiển thị popup sản phẩm
//   const showProductPopup = useSelector(
//     (state) => state.product.showProductPopup
//   ); //Chọn state hiển thị popup sản phẩm

//   //Xử lý khi click vào ảnh sản phẩm
//   const clickProductImgHandler = (product) => {
//     //dispatch để bật popup và set sản phẩm
//     dispatch(productActions.showPopup(product));
//   };

//   return (
//     <div className={classes.products}>
//       {/*Hiển thị overlay */}
//       {showProductPopup &&
//         ReactDOM.createPortal(<Overlay />, document.getElementById("over-lay"))}
//       {/* Hiển thị popup sản phẩm */}
//       {showProductPopup &&
//         ReactDOM.createPortal(
//           <ProductPopup />,
//           document.getElementById("popup")
//         )}
//       <p>Mỗi gợi ý là một lựa chọn hoàn hảo</p>
//       <h3>Sản phẩm thịnh hành hàng đầu</h3>
//       <div className={classes.container}>
//         {/*Kiểm tra dữ liệu và render */}
//         {data &&
//           data.length > 0 &&
//           data.slice(0, 8).map((product) => (
//             <div key={product._id}>
//               <img
//                 onClick={() => {
//                   clickProductImgHandler(product);
//                 }}
//                 src={product.img1}       
//                 alt="sản_phẩm"
//               />
//               <h3>{product.name}</h3>
//               <p>
//                 {/*Định dạng tiền tệ */}
//                 {new Intl.NumberFormat("vi-VN")
//   .format(Number(product.price) || 0) + " đ"}

//               </p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

// ===== THAY THẾ TOÀN BỘ FILE: src/components/Products.jsx =====

import React, { useEffect, useState } from "react"; // 1. Import useEffect, useState
import ReactDOM from "react-dom";
import classes from "./Products.module.css";
// import { useRouteLoaderData } from "react-router-dom"; // 2. Bỏ useRouteLoaderData

//Import từ react-redux
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/product";
import Overlay from "./Overlay";
import ProductPopup from "./ProductPopup";

// (Sửa URL này nếu API của bạn có tiền tố, vd: /api/products/trending)
const API_URL = "http://localhost:5000/api/products/trending";

const Products = () => {
  // 3. Dùng State để lưu sản phẩm thịnh hành
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const data = useRouteLoaderData("products"); // 4. Bỏ dòng này

  const dispatch = useDispatch();
  const showProductPopup = useSelector(
    (state) => state.product.showProductPopup
  );

  // 5. Dùng useEffect để gọi API /products/trending
  useEffect(() => {
    async function fetchTrending() {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL); // Gọi API mới
        
        if (!response.ok) {
          throw new Error("Không thể tải sản phẩm thịnh hành.");
        }
        const data = await response.json();
        setTrendingProducts(data.products);
      } catch (error) {
        console.error(error);
        // Có thể set sản phẩm rỗng để tránh lỗi
        setTrendingProducts([]);
      }
      setIsLoading(false);
    }
    
    fetchTrending();
  }, []); // [] = Chạy 1 lần khi component mount

  const clickProductImgHandler = (product) => {
    dispatch(productActions.showPopup(product));
  };

  return (
    <div className={classes.products}>
      {/*Hiển thị overlay */}
      {showProductPopup &&
        ReactDOM.createPortal(<Overlay />, document.getElementById("over-lay"))}
      {/* Hiển thị popup sản phẩm */}
      {showProductPopup &&
        ReactDOM.createPortal(
          <ProductPopup />,
          document.getElementById("popup")
        )}
        
      <p>Mỗi gợi ý là một lựa chọn hoàn hảo</p>
      <h3>Sản phẩm thịnh hành hàng đầu</h3>
      <div className={classes.container}>

        {/* 6. Hiển thị loading (nếu cần) */}
        {isLoading && <p style={{ textAlign: 'center', width: '100%' }}>Đang tải...</p>}

        {/* 7. Map qua 'trendingProducts' (state) thay vì 'data' (loader) */}
        {!isLoading &&
          trendingProducts.length > 0 &&
          trendingProducts.map((product) => ( // 8. Bỏ .slice(0, 8)
            <div key={product._id}>
              <img
                onClick={() => {
                  clickProductImgHandler(product);
                }}
                src={product.img1}
                alt="sản_phẩm"
              />
              <h3>{product.name}</h3>
              <p>
                {new Intl.NumberFormat("vi-VN")
                  .format(Number(product.price) || 0) + " đ"}
              </p>
            </div>
          ))}
          
        {/* Hiển thị nếu API lỗi hoặc không có sản phẩm */}
        {!isLoading && trendingProducts.length === 0 && !isLoading && (
          <p style={{ textAlign: 'center', width: '100%' }}>Không tìm thấy sản phẩm thịnh hành.</p>
        )}
      </div>
    </div>
  );
};

export default Products;