// // // ===== THAY THẾ TOÀN BỘ FILE: src/components/Products.jsx =====

// // import React, { useEffect, useState } from "react"; // 1. Import useEffect, useState
// // import ReactDOM from "react-dom";
// // import classes from "./Products.module.css";
// // // import { useRouteLoaderData } from "react-router-dom"; // 2. Bỏ useRouteLoaderData

// // //Import từ react-redux
// // import { useDispatch, useSelector } from "react-redux";
// // import { productActions } from "../store/product";
// // import Overlay from "./Overlay";
// // import ProductPopup from "./ProductPopup";

// // // (Sửa URL này nếu API của bạn có tiền tố, vd: /api/products/trending)
// // const API_URL = "http://localhost:5000/api/products/trending";

// // const Products = () => {
// //   // 3. Dùng State để lưu sản phẩm thịnh hành
// //   const [trendingProducts, setTrendingProducts] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // const data = useRouteLoaderData("products"); // 4. Bỏ dòng này

// //   const dispatch = useDispatch();
// //   const showProductPopup = useSelector(
// //     (state) => state.product.showProductPopup
// //   );

// //   // 5. Dùng useEffect để gọi API /products/trending
// //   useEffect(() => {
// //     async function fetchTrending() {
// //       setIsLoading(true);
// //       try {
// //         const response = await fetch(API_URL); // Gọi API mới
        
// //         if (!response.ok) {
// //           throw new Error("Không thể tải sản phẩm thịnh hành.");
// //         }
// //         const data = await response.json();
// //         setTrendingProducts(data.products);
// //       } catch (error) {
// //         console.error(error);
// //         // Có thể set sản phẩm rỗng để tránh lỗi
// //         setTrendingProducts([]);
// //       }
// //       setIsLoading(false);
// //     }
    
// //     fetchTrending();
// //   }, []); // [] = Chạy 1 lần khi component mount

// //   const clickProductImgHandler = (product) => {
// //     dispatch(productActions.showPopup(product));
// //   };

// //   return (
// //     <div className={classes.products}>
// //       {/*Hiển thị overlay */}
// //       {showProductPopup &&
// //         ReactDOM.createPortal(<Overlay />, document.getElementById("over-lay"))}
// //       {/* Hiển thị popup sản phẩm */}
// //       {showProductPopup &&
// //         ReactDOM.createPortal(
// //           <ProductPopup />,
// //           document.getElementById("popup")
// //         )}
        
// //       <p>Mỗi gợi ý là một lựa chọn hoàn hảo</p>
// //       <h3>Sản phẩm thịnh hành hàng đầu</h3>
// //       <div className={classes.container}>

// //         {/* 6. Hiển thị loading (nếu cần) */}
// //         {isLoading && <p style={{ textAlign: 'center', width: '100%' }}>Đang tải...</p>}

// //         {/* 7. Map qua 'trendingProducts' (state) thay vì 'data' (loader) */}
// //         {!isLoading &&
// //           trendingProducts.length > 0 &&
// //           trendingProducts.map((product) => ( // 8. Bỏ .slice(0, 8)
// //             <div key={product._id}>
// //               <img
// //                 onClick={() => {
// //                   clickProductImgHandler(product);
// //                 }}
// //                 src={product.img1}
// //                 alt="sản_phẩm"
// //               />
// //               <h3>{product.name}</h3>
// //               <p>
// //                 {new Intl.NumberFormat("vi-VN")
// //                   .format(Number(product.price) || 0) + " đ"}
// //               </p>
// //             </div>
// //           ))}
          
// //         {/* Hiển thị nếu API lỗi hoặc không có sản phẩm */}
// //         {!isLoading && trendingProducts.length === 0 && !isLoading && (
// //           <p style={{ textAlign: 'center', width: '100%' }}>Không tìm thấy sản phẩm thịnh hành.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Products;

// // ===== THAY THẾ TOÀN BỘ FILE: src/components/Products.jsx =====

// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import classes from "./Products.module.css";

// // Import từ react-redux
// import { useDispatch, useSelector } from "react-redux";
// import { productActions } from "../store/product";
// import Overlay from "./Overlay";
// import ProductPopup from "./ProductPopup";

// // URL API lấy sản phẩm trending
// const API_URL = "http://localhost:5000/api/products/trending";

// const Products = () => {
//   // State lưu danh sách sản phẩm
//   const [trendingProducts, setTrendingProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const dispatch = useDispatch();
//   const showProductPopup = useSelector(
//     (state) => state.product.showProductPopup
//   );

//   // useEffect gọi API khi component được mount
//   useEffect(() => {
//     async function fetchTrending() {
//       setIsLoading(true);
//       try {
//         const response = await fetch(API_URL);
        
//         if (!response.ok) {
//           throw new Error("Không thể tải sản phẩm thịnh hành.");
//         }
        
//         const data = await response.json();
        
//         // Kiểm tra xem dữ liệu trả về có mảng products không
//         let products = data.products || [];

//         // --- XỬ LÝ RANDOM (TRỘN NGẪU NHIÊN) ---
//         // Sử dụng thuật toán đơn giản để xáo trộn vị trí các sản phẩm
//         products = products.sort(() => 0.5 - Math.random());

//         // Nếu bạn muốn giới hạn hiển thị (ví dụ chỉ lấy 8 cái ngẫu nhiên):
//         // products = products.slice(0, 8);

//         setTrendingProducts(products);
//       } catch (error) {
//         console.error("Lỗi fetch trending:", error);
//         setTrendingProducts([]);
//       }
//       setIsLoading(false);
//     }
    
//     fetchTrending();
//   }, []); 

//   // Xử lý khi click vào ảnh sản phẩm -> Hiện Popup
//   const clickProductImgHandler = (product) => {
//     dispatch(productActions.showPopup(product));
//   };

//   return (
//     <div className={classes.products}>
//       {/* Hiển thị overlay làm tối nền */}
//       {showProductPopup &&
//         ReactDOM.createPortal(<Overlay />, document.getElementById("over-lay"))}
      
//       {/* Hiển thị popup chi tiết sản phẩm */}
//       {showProductPopup &&
//         ReactDOM.createPortal(
//           <ProductPopup />,
//           document.getElementById("popup")
//         )}
        
//       <div className={classes.headerText}>
//         <p>Mỗi gợi ý là một lựa chọn hoàn hảo</p>
//         <h3>Sản phẩm thịnh hành hàng đầu</h3>
//       </div>

//       <div className={classes.container}>
//         {/* Hiển thị Loading */}
//         {isLoading && (
//           <p style={{ textAlign: 'center', width: '100%', color: '#888' }}>
//             Đang tải dữ liệu...
//           </p>
//         )}

//         {/* Hiển thị Danh sách sản phẩm */}
//         {!isLoading &&
//           trendingProducts.length > 0 &&
//           trendingProducts.map((product) => (
//             <div key={product._id} className={classes.item}>
//               <img
//                 onClick={() => clickProductImgHandler(product)}
//                 src={product.img1}
//                 alt={product.name}
//                 className={classes.img} // Đảm bảo class CSS animation nếu có
//               />
//               <h3>{product.name}</h3>
//               <p>
//                 {new Intl.NumberFormat("vi-VN").format(Number(product.price) || 0) + " đ"}
//               </p>
//             </div>
//           ))}
          
//         {/* Hiển thị thông báo nếu không có sản phẩm */}
//         {!isLoading && trendingProducts.length === 0 && (
//           <p style={{ textAlign: 'center', width: '100%' }}>
//             Không tìm thấy sản phẩm thịnh hành nào.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/product";
import Overlay from "./Overlay";
import ProductPopup from "./ProductPopup";

// 👇 SỬA ĐOẠN NÀY 👇
// 1. Kiểm tra xem đang chạy ở đâu (Local hay Online)
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// 2. Điền Link Backend Render của bạn vào chỗ "LINK_RENDER..." bên dưới
const BACKEND_DOMAIN = isLocal 
  ? "http://localhost:5000" 
  : "https://my-ecommerce-server-domr.onrender.com"; // <--- DÁN LINK RENDER VÀO ĐÂY NHÉ!

const API_URL = `${BACKEND_DOMAIN}/api/products/trending`;
// 👆 KẾT THÚC SỬA 👆

const Products = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const showProductPopup = useSelector((state) => state.product.showProductPopup);

  useEffect(() => {
    async function fetchTrending() {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed fetch");
        const data = await response.json();
        
        // Logic Random
        let products = data.products || [];
        products = products.sort(() => 0.5 - Math.random());
        
        setTrendingProducts(products);
      } catch (error) {
        console.error("Lỗi:", error);
        setTrendingProducts([]);
      }
      setIsLoading(false);
    }
    fetchTrending();
  }, []); 

  const clickProductImgHandler = (product) => {
    dispatch(productActions.showPopup(product));
  };

  return (
    <div className={classes.products}>
      {showProductPopup && ReactDOM.createPortal(<Overlay />, document.getElementById("over-lay"))}
      {showProductPopup && ReactDOM.createPortal(<ProductPopup />, document.getElementById("popup"))}
        
      <div className={classes.headerText}>
        <p>Mỗi gợi ý là một lựa chọn hoàn hảo</p>
        <h3>Sản phẩm thịnh hành hàng đầu</h3>
      </div>

      <div className={classes.container}>
        {isLoading && <p style={{ textAlign: 'center', width: '100%', color: '#888' }}>Đang tải dữ liệu...</p>}

        {!isLoading && trendingProducts.length > 0 && trendingProducts.map((product) => (
            <div key={product._id} className={classes.item}>
              <img
                onClick={() => clickProductImgHandler(product)}
                src={product.img1}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{new Intl.NumberFormat("vi-VN").format(Number(product.price) || 0) + " đ"}</p>
            </div>
          ))}
          
        {!isLoading && trendingProducts.length === 0 && (
          <p style={{ textAlign: 'center', width: '100%' }}>Không tìm thấy sản phẩm thịnh hành nào.</p>
        )}
      </div>
    </div>
  );
};

export default Products;