// // import React from "react";

// // //CSS module
// // import classes from "./OrdersPage.module.css";
// // import AccessoryRecommendations from "../components/AccessoryRecommendations";
// // //Dịch vụ đơn hàng
// // import { axiosGetUserOrders } from "../services/orderServices";

// // //Lấy token xác thực
// // import { getAuthToken } from "../utils/auth";

// // //React router dom
// // import { useLoaderData, Link } from "react-router-dom";
// // import socket from '../utils/socket-io.js';

// // // dưới các import
// // const API_BASE = (process.env.REACT_APP_BACKEND_API || process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");
// // const makeUrl = (path) => (API_BASE ? `${API_BASE}${path}` : path);


// // // dưới phần import
// // const VI_DELIVERY = {
// //   "Waiting for progressing": "Đang xử lý",
// //   "Shipping": "Đang giao",
// //   "Delivered": "Đã giao",
// //   "Canceled": "Đã huỷ",
// // };

// // const VI_PAYMENT = {
// //   "Waiting for pay": "Chưa thanh toán",
// //   "Paid": "Đã thanh toán",
// //   "Refunded": "Hoàn tiền",
// // };

// // // Hàm ánh xạ class trạng thái giao hàng
// // const lopTrangThaiGiao = (s) =>
// //   s === "Delivered" ? classes.delivered
// //   : s === "Shipping" ? classes.shipping
// //   : s === "Waiting for progressing" ? classes.pending
// //   : classes.canceled;

// // const lopTrangThaiThanhToan = (s) =>
// //   s === "Paid" ? classes.paid
// //   : s === "Refunded" ? classes.refunded
// //   : classes.unpaid;


// // const TrangDonHang = () => {
// //   //Dữ liệu đơn hàng
// //   const { orders: donHang } = useLoaderData();

// //   // Định dạng ngày giờ:  dd/mm/yyyy, hh:mm (vi-VN)
// //   const dinhDangNgayGio = (giatri) => {
// //     if (!giatri) return "—";
// //     return new Date(giatri).toLocaleString("vi-VN", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   // Định dạng tiền VND
// //   const dinhDangVND = (so) =>
// //     new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
// //       Number(so) || 0
// //     );

// //   return (
// //     <div className={classes.orders}>
// //       <div className={classes["orders-banner"]}>
// //         <h2>Lịch sử</h2>
// //         <p>Lịch sử đơn hàng</p>
// //       </div>
// //       <div className={classes["orders-container"]}>
// //         {donHang.length === 0 && <p>Bạn chưa có đơn hàng nào.</p>}
// //         {donHang.length > 0 && (
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>ID Đơn hàng</th>
// //                 <th>ID Người dùng</th>
// //                 <th>Họ và tên</th>
// //                 <th>Ngày đặt</th>
// //                 <th>Số điện thoại</th>
// //                 <th>Địa chỉ</th>
// //                 <th>Tổng cộng</th>
// //                 <th>Giao hàng</th>
// //                 <th>Thanh toán</th>
// //                 <th>Chi tiết</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {donHang.map((dh) => (
// //                 <tr key={dh._id}>
// //                   <td>{dh._id}</td>
// //                   <td>{dh.userId._id}</td>
// //                   <td>{dh.userId.fullName}</td>
// //                   <td>{dinhDangNgayGio(dh.createdAt)}</td>
// //                   <td>{dh.userId.phoneNumber}</td>
// //                   <td>{dh.userId.address}</td>
// //                   <td>{dinhDangVND(dh.totalPrice)}</td>

// //                   <td>
// //                     <span className={`${classes.badge} ${classes.dot} ${lopTrangThaiGiao(dh.deliveryStatus)}`}>
// //                       {VI_DELIVERY[dh.deliveryStatus] ?? dh.deliveryStatus}
// //                     </span>
// //                   </td>

// //                   <td>
// //                     <span className={`${classes.badge} ${classes.dot} ${lopTrangThaiThanhToan(dh.paymentStatus)}`}>
// //                       {VI_PAYMENT[dh.paymentStatus] ?? dh.paymentStatus}
// //                     </span>
// //                   </td>


// //                   <td>
// //                     <Link to={dh._id} className={classes.view}>
// //                       Xem <span>&#10137;</span>
// //                     </Link>

// //                     {dh.deliveryStatus === "Waiting for progressing" && (
// //                       <button
// //                         className={classes.cancelBtn}
// //                         onClick={async () => {
// //                           if (!window.confirm("Bạn chắc chắn muốn hủy đơn này?")) return;
// //                           const token = getAuthToken();
// //                           const res = await fetch(makeUrl(`/api/orders/${dh._id}/cancel`), {
// //                             method: "PATCH",
// //                             headers: {
// //                               "Content-Type": "application/json",
// //                               Authorization: `Bearer ${token}`,
// //                             },
// //                           });
// //                           if (!res.ok) {
// //                             const err = await res.json().catch(() => ({}));
// //                             alert(err?.message || "Hủy đơn thất bại.");
// //                             return;
// //                           }
// //                           window.location.reload();
// //                         }}
// //                       >
// //                         Huỷ
// //                       </button>
// //                     )}
// //                   </td>

// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
          
// //         )}
// //          <AccessoryRecommendations title="Gợi ý phụ kiện dành cho bạn" />
        
// //       </div>
// //     </div>
// //   );
// // };

// // export default TrangDonHang;

// // export const loader = async () => {
// //   const token = getAuthToken();
// //   if (!token || token === "TOKEN EXPIRED") return null;

// //   const duLieu = await axiosGetUserOrders(token);
// //   if (!duLieu) return null;

// //   // Sắp xếp mới → cũ theo createdAt
// //   const donHangSapXep = [...duLieu.orders].sort(
// //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// //   );

// //   return { ...duLieu, orders: donHangSapXep };
// // };

// // ===== FILE: OrdersPage.js (Trang Lịch sử đơn hàng của User) =====

// import React, { useState, useEffect } from "react"; // SỬA ĐỔI: Thêm useState, useEffect

// //CSS module
// import classes from "./OrdersPage.module.css";
// import AccessoryRecommendations from "../components/AccessoryRecommendations";
// //Dịch vụ đơn hàng
// import { axiosGetUserOrders } from "../services/orderServices";

// //Lấy token xác thực
// import { getAuthToken } from "../utils/auth";

// //React router dom
// import { useLoaderData, Link } from "react-router-dom";
// import socket from "../utils/socket-io.js";

// // dưới các import
// const API_BASE = (process.env.REACT_APP_BACKEND_API || process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");
// const makeUrl = (path) => (API_BASE ? `${API_BASE}${path}` : path);

// // Dưới phần import
// const VI_DELIVERY = {
//   "Waiting for progressing": "Đang xử lý",
//   "Shipping": "Đang giao",
//   "Delivered": "Đã giao",
//   "Canceled": "Đã huỷ",
// };

// const VI_PAYMENT = {
//   "Waiting for pay": "Chưa thanh toán",
//   "Paid": "Đã thanh toán",
//   "Refunded": "Hoàn tiền",
// };

// // Hàm ánh xạ class trạng thái giao hàng
// const lopTrangThaiGiao = (s) =>
//   s === "Delivered" ? classes.delivered
//     : s === "Shipping" ? classes.shipping
//     : s === "Waiting for progressing" ? classes.pending
//     : classes.canceled;

// const lopTrangThaiThanhToan = (s) =>
//   s === "Paid" ? classes.paid
//     : s === "Refunded" ? classes.refunded
//     : classes.unpaid;

// const TrangDonHang = () => {
//   // SỬA ĐỔI: Dùng useState để quản lý state động
//   const { orders: initialOrders } = useLoaderData();
//   const [donHang, setDonHang] = useState(initialOrders || []);
//   // ===========================================

//   // Định dạng ngày giờ: dd/mm/yyyy, hh:mm (vi-VN)
//   const dinhDangNgayGio = (giatri) => {
//     if (!giatri) return "—";
//     return new Date(giatri).toLocaleString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Định dạng tiền VND
//   const dinhDangVND = (so) =>
//     new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
//       Number(so) || 0
//     );

//   // THÊM MỚI: Thêm useEffect để lắng nghe socket
//   // useEffect(() => {
//   //   const handleOrderUpdate = (data) => {
//   //     const { action, order } = data;

//   //     // Khi Admin cập nhật hoặc khi chính user này huỷ đơn
//   //     if (action === "ADMIN_UPDATED_STATUS" || action === "USER_CANCELED") {
//   //       setDonHang((prevOrders) => {
//   //         const index = prevOrders.findIndex((o) => o._id === order._id);
//   //         if (index !== -1) {
//   //           console.log("User OrdersPage: Socket received update:", action, order);
//   //           const newOrders = [...prevOrders];
//   //           newOrders[index] = order;
//   //           return newOrders;
//   //         }
//   //         return prevOrders;
//   //       });
//   //     }
//   //   };

//   //   socket.on("order", handleOrderUpdate);

//   //   // Dọn dẹp listener khi component bị unmount
//   //   return () => {
//   //     socket.off("order", handleOrderUpdate);
//   //   };
//   // }, []); // Chỉ chạy 1 lần khi mount
//   // // ===========================================
//     useEffect(() => {
//     const token = getAuthToken();
//     const currentUserId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

//     const handleOrderUpdate = (data) => {
//       const { action, order } = data;

//       if (action === "NEW_ORDER") {
//         if (currentUserId && order.userId && order.userId._id === currentUserId) {
//           console.log("User OrdersPage: Socket received NEW order:", order);
//           setDonHang((prevOrders) => [order, ...prevOrders]);
//         }
//         return;
//       }

//       if (action === "ADMIN_UPDATED_STATUS" || action === "USER_CANCELED") {
//         setDonHang((prevOrders) => {
//           const index = prevOrders.findIndex((o) => o._id === order._id);
//           if (index !== -1) {
//             console.log("User OrdersPage: Socket received update:", action, order);
//             const newOrders = [...prevOrders];
//             newOrders[index] = order;
//             return newOrders;
//           }
//           return prevOrders;
//         });
//       }
//     };

//     socket.on("order", handleOrderUpdate);

//     return () => {
//       socket.off("order", handleOrderUpdate);
//     };
//   }, [donHang]);


//   return (
//     <div className={classes.orders}>
//       <div className={classes["orders-banner"]}>
//         <h2>Lịch sử</h2>
//         <p>Lịch sử đơn hàng</p>
//       </div>

//       <div className={classes["orders-container"]}>
//         {/* SỬA ĐỔI: Render từ state 'donHang' */}
//         {donHang.length === 0 && <p>Bạn chưa có đơn hàng nào.</p>}
//         {donHang.length > 0 && (
//           <table>
//             <thead>
//               <tr>
//                 <th>ID Đơn hàng</th>
//                 <th>ID Người dùng</th>
//                 <th>Họ và tên</th>
//                 <th>Ngày đặt</th>
//                 <th>Số điện thoại</th>
//                 <th>Địa chỉ</th>
//                 <th>Tổng cộng</th>
//                 <th>Giao hàng</th>
//                 <th>Thanh toán</th>
//                 <th>Chi tiết</th>
//               </tr>
//             </thead>
//             <tbody>
//               {donHang.map((dh) => (
//                 <tr key={dh._id}>
//                   <td>{dh._id}</td>
//                   <td>{dh.userId._id}</td>
//                   <td>{dh.userId.fullName}</td>
//                   <td>{dinhDangNgayGio(dh.createdAt)}</td>
//                   <td>{dh.userId.phoneNumber}</td>
//                   <td>{dh.userId.address}</td>
//                   <td>{dinhDangVND(dh.totalPrice)}</td>
//                   <td>
//                     <span className={`${classes.badge} ${classes.dot} ${lopTrangThaiGiao(dh.deliveryStatus)}`}>
//                       {VI_DELIVERY[dh.deliveryStatus] ?? dh.deliveryStatus}
//                     </span>
//                   </td>
//                   <td>
//                     <span className={`${classes.badge} ${classes.dot} ${lopTrangThaiThanhToan(dh.paymentStatus)}`}>
//                       {VI_PAYMENT[dh.paymentStatus] ?? dh.paymentStatus}
//                     </span>
//                   </td>
//                   <td>
//                     <Link to={dh._id} className={classes.view}>
//                       Xem <span>&#10137;</span>
//                     </Link>
//                     {dh.deliveryStatus === "Waiting for progressing" && (
//                       <button
//                         className={classes.cancelBtn}
//                         onClick={async () => {
//                           if (!window.confirm("Bạn chắc chắn muốn hủy đơn này?")) return;
//                           const token = getAuthToken();
//                           const res = await fetch(makeUrl(`/api/orders/${dh._id}/cancel`), {
//                             method: "PATCH",
//                             headers: {
//                               "Content-Type": "application/json",
//                               Authorization: `Bearer ${token}`,
//                             },
//                           });
//                           if (!res.ok) {
//                             const err = await res.json().catch(() => ({}));
//                             alert(err?.message || "Hủy đơn thất bại.");
//                             return;
//                           }

//                           // ❌ XÓA window.location.reload()
//                           // UI sẽ tự cập nhật nhờ listener socket
//                         }}
//                       >
//                         Huỷ
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <AccessoryRecommendations title="Gợi ý phụ kiện dành cho bạn" />
//     </div>
//   );
// };

// export default TrangDonHang;

// // Phần loader giữ nguyên
// export const loader = async () => {
//   const token = getAuthToken();
//   if (!token || token === "TOKEN EXPIRED") return null;

//   const duLieu = await axiosGetUserOrders(token);
//   if (!duLieu) return null;

//   // Sắp xếp mới → cũ theo createdAt
//   const donHangSapXep = [...duLieu.orders].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   return { ...duLieu, orders: donHangSapXep };
// };

// ===== FILE: OrdersPage.js (ĐÃ LÀM SẠCH) =====
import React, { useState, useEffect } from "react";
import classes from "./OrdersPage.module.css";
import AccessoryRecommendations from "../components/AccessoryRecommendations";
import { axiosGetUserOrders } from "../services/orderServices";
import { getAuthToken } from "../utils/auth";
import { useLoaderData, Link } from "react-router-dom";
import socket from "../utils/socket-io.js";

const API_BASE = (process.env.REACT_APP_BACKEND_API || process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");
const makeUrl = (path) => (API_BASE ? `${API_BASE}${path}` : path);

const VI_DELIVERY = {
  "Waiting for progressing": "Đang xử lý",
  Shipping: "Đang giao",
  Delivered: "Đã giao",
  Canceled: "Đã huỷ",
};

const VI_PAYMENT = {
  "Waiting for pay": "Chưa thanh toán",
  Paid: "Đã thanh toán",
  Refunded: "Hoàn tiền",
};

const lopTrangThaiGiao = (s) =>
  s === "Delivered"
    ? classes.delivered
    : s === "Shipping"
    ? classes.shipping
    : s === "Waiting for progressing"
    ? classes.pending
    : classes.canceled;

const lopTrangThaiThanhToan = (s) =>
  s === "Paid"
    ? classes.paid
    : s === "Refunded"
    ? classes.refunded
    : classes.unpaid;

const TrangDonHang = () => {
  const { orders: initialOrders } = useLoaderData();
  const [donHang, setDonHang] = useState(initialOrders || []);

  const dinhDangNgayGio = (giatri) => {
    if (!giatri) return "—";
    return new Date(giatri).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const dinhDangVND = (so) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(so) || 0);

  useEffect(() => {
    const token = getAuthToken();
    const currentUserId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

    const handleOrderUpdate = (data) => {
      const { action, order } = data;

      if (action === "NEW_ORDER") {
        if (currentUserId && order.userId && order.userId._id === currentUserId) {
          console.log("User OrdersPage: Socket received NEW order:", order);
          setDonHang((prevOrders) => [order, ...prevOrders]);
        }
        return;
      }

      if (action === "ADMIN_UPDATED_STATUS" || action === "USER_CANCELED") {
        setDonHang((prevOrders) => {
          const index = prevOrders.findIndex((o) => o._id === order._id);
          if (index !== -1) {
            console.log("User OrdersPage: Socket received update:", action, order);
            const newOrders = [...prevOrders];
            newOrders[index] = order;
            return newOrders;
          }
          return prevOrders;
        });
      }
    };

    socket.on("order", handleOrderUpdate);
    return () => socket.off("order", handleOrderUpdate);
  }, [donHang]);

  return (
    <div className={classes.orders}>
      <div className={classes["orders-banner"]}>
        <h2>Lịch sử</h2>
        <p>Lịch sử đơn hàng</p>
      </div>

      <div className={classes["orders-container"]}>
        {donHang.length === 0 && <p>Bạn chưa có đơn hàng nào.</p>}
        {donHang.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID Đơn hàng</th>
                <th>ID Người dùng</th>
                <th>Họ và tên</th>
                <th>Ngày đặt</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Tổng cộng</th>
                <th>Giao hàng</th>
                <th>Thanh toán</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {donHang.map((dh) => (
                <tr key={dh._id}>
                  <td>{dh._id}</td>
                  <td>{dh.userId._id}</td>
                  <td>{dh.userId.fullName}</td>
                  <td>{dinhDangNgayGio(dh.createdAt)}</td>
                  <td>{dh.userId.phoneNumber}</td>
                  <td>{dh.userId.address}</td>
                  <td>{dinhDangVND(dh.totalPrice)}</td>
                  <td>
                    <span className={`${classes.badge} ${classes.dot} ${lopTrangThaiGiao(dh.deliveryStatus)}`}>
                      {VI_DELIVERY[dh.deliveryStatus] ?? dh.deliveryStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`${classes.badge} ${classes.dot} ${lopTrangThaiThanhToan(dh.paymentStatus)}`}>
                      {VI_PAYMENT[dh.paymentStatus] ?? dh.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <Link to={dh._id} className={classes.view}>
                      Xem <span>&#10137;</span>
                    </Link>
                    {dh.deliveryStatus === "Waiting for progressing" && (
                      <button
                        className={classes.cancelBtn}
                        onClick={async () => {
                          if (!window.confirm("Bạn chắc chắn muốn hủy đơn này?")) return;
                          const token = getAuthToken();
                          const res = await fetch(makeUrl(`/api/orders/${dh._id}/cancel`), {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                          });
                          if (!res.ok) {
                            const err = await res.json().catch(() => ({}));
                            alert(err?.message || "Hủy đơn thất bại.");
                            return;
                          }
                        }}
                      >
                        Huỷ
                      </button>
                    )}

                    {/* === THÊM MỚI (TỪ BƯỚC 3.1) === */}
                      {dh.deliveryStatus === "Delivered" && (
                        <Link to={dh._id} className={classes.reviewBtn}> {/* Bạn cần thêm CSS cho class .reviewBtn (ví dụ: màu xanh) */}
                          Đánh giá
                        </Link>
                      )}
                      {/* ============================= */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AccessoryRecommendations />
    </div>
  );
};

export default TrangDonHang;

export const loader = async () => {
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") return null;

  const duLieu = await axiosGetUserOrders(token);
  if (!duLieu) return null;

  const donHangSapXep = [...duLieu.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return { ...duLieu, orders: donHangSapXep };
};
