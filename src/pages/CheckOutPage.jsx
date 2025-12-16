// // ===== FILE: src/pages/CheckOutPage.jsx (Đã cập nhật COD) =====
// import React, { useMemo, useState, useEffect } from "react";
// import classes from "./CheckOutPage.module.css";
// import { useSelector } from "react-redux";
// import { axiosGetCurrentUser } from "../services/authServices";
// import { axiosCreateOrder } from "../services/orderServices";
// import {
//   useLoaderData,
//   useActionData,
//   Navigate,
//   Form,
//   redirect,
// } from "react-router-dom";
// import { getAuthToken } from "../utils/auth";

// const CheckOutPage = () => {
//   const data = useLoaderData();
//   const actionData = useActionData();

//   const addressErrors = actionData?.errors?.filter(
//     (error) => error.path === "address"
//   );

//   const [userInfo, setUserInfo] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//   });

//   useEffect(() => {
//     if (data?.user) {
//       setUserInfo({
//         fullName: data.user.fullName || "",
//         email: data.user.email || "",
//         phoneNumber: data.user.phoneNumber || "",
//         address: data.user.address || "",
//       });
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const listCart = useSelector((state) => state.cart.listCart);

//   const checkoutTotalPrice = useMemo(() => {
//     return listCart.reduce((acc, curr) => {
//       return acc + curr.price * curr.quantity;
//     }, 0);
//   }, [listCart]);

//   if (
//     JSON.parse(localStorage.getItem("cart")) &&
//     JSON.parse(localStorage.getItem("cart")).length === 0
//   ) {
//     alert("Vui lòng thêm ít nhất một sản phẩm vào giỏ trước khi truy cập trang này.");
//     return <Navigate to="/shop" />;
//   }

//   return (
//     <div className={classes.checkout}>
//       <div className={classes["checkout-banner"]}>
//         <h2>Thanh toán</h2>
//         <div>
//           <h3>Trang chủ /</h3>
//           <h3> Giỏ hàng /</h3>
//           <p> Thanh toán</p>
//         </div>
//       </div>
//       <h3>Chi tiết thanh toán</h3>
//       <div className={classes.container}>
//         <div className={classes.left}>
//           <Form action="/checkout" method="post">
//             <div className={classes["form-control"]}>
//               <label>Họ và tên:</label>
//               <input
//                 value={userInfo.fullName}
//                 onChange={handleChange}
//                 name="fullName"
//                 type="text"
//                 placeholder="Nhập họ và tên của bạn!"
//                 required
//               />
//             </div>

//             <div className={classes["form-control"]}>
//               <label>Email:</label>
//               <input
//                 value={userInfo.email}
//                 onChange={handleChange}
//                 type="email"
//                 name="email"
//                 placeholder="Nhập email của bạn!"
//                 required
//               />
//             </div>

//             <div className={classes["form-control"]}>
//               <label>Số điện thoại:</label>
//               <input
//                 type="text"
//                 value={userInfo.phoneNumber}
//                 onChange={handleChange}
//                 name="phoneNumber"
//                 placeholder="Nhập số điện thoại của bạn!"
//                 required
//               />
//             </div>

//             <div className={classes["form-control"]}>
//               <label>Địa chỉ:</label>
//               {addressErrors && addressErrors.length > 0 && (
//                 <p className={classes.error}>{addressErrors[0].msg}</p>
//               )}
//               <input
//                 type="text"
//                 name="address"
//                 value={userInfo.address}
//                 onChange={handleChange}
//                 placeholder="Nhập địa chỉ của bạn!"
//                 required
//               />
//             </div>

//             <input type="hidden" name="totalPrice" value={checkoutTotalPrice} />
//             <div>
//               <button type="submit">Đặt hàng (COD)</button>
//             </div>
//           </Form>
//         </div>

//         <div className={classes.right}>
//           <div className={classes.wrapper}>
//             <h2>Đơn hàng của bạn</h2>
//             {listCart &&
//               listCart.map((cart) => (
//                 <div key={cart.id} className={classes["item-order"]}>
//                   <h3>{cart.name}</h3>
//                   <p>
//                     {new Intl.NumberFormat("vi-VN").format(
//                       Number(cart.price) || 0
//                     ) + ` đ x ${cart.quantity}`}
//                   </p>
//                 </div>
//               ))}

//             {/* === THÊM MỤC PHƯƠNG THỨC THANH TOÁN === */}
//             <div className={classes.paymentMethod}>
//               <h3>Phương thức</h3>
//               <p>Thanh toán khi nhận hàng (COD)</p>
//             </div>
//             {/* ======================================= */}

//             <div className={classes.total}>
//               <h3>Tổng cộng</h3>
//               <p>
//                 {new Intl.NumberFormat("vi-VN").format(
//                   Number(checkoutTotalPrice) || 0
//                 ) + " đ"}
//               </p>
//             </div>

//             {/* === THÊM LƯU Ý VỀ PHÍ SHIP === */}
//             <div className={classes.shippingNote}>
//               <p>Lưu ý: Quý khách vui lòng nhận hàng để tránh phát sinh phí vận chuyển </p>
//             </div>
//             {/* ============================== */}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOutPage;

// export const loader = async () => {
//   const token = getAuthToken();
//   if (!token || token === "TOKEN EXPIRED") return null;
//   const data = await axiosGetCurrentUser(token);
//   return data || null;
// };

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const cart = JSON.parse(localStorage.getItem("cart"));

//   const dataSend = {
//     fullName: formData.get("fullName"),
//     email: formData.get("email"),
//     phoneNumber: formData.get("phoneNumber"),
//     address: formData.get("address"),
//     cart,
//     totalPrice: formData.get("totalPrice"),
//     // (Bạn có thể thêm 1 trường paymentMethod nếu backend cần)
//     // paymentMethod: "COD" 
//   };

//   if (!dataSend.fullName || dataSend.fullName.trim().length < 5) {
//     return {
//       errors: [
//         { path: "address", msg: "Họ và tên là bắt buộc (tối thiểu 5 ký tự)." },
//       ],
//     };
//   }

//   if (!dataSend.address || dataSend.address.trim().length === 0) {
//     return { errors: [{ path: "address", msg: "Địa chỉ là bắt buộc." }] };
//   }

//   const token = getAuthToken();
//   if (!token || token === "TOKEN EXPIRED") return null;

//   const data = await axiosCreateOrder(token, dataSend);

//   if (data) {
//     if (data.errors) return data;
//     if (data?.message === "Quantity exceeded product quantity in stock!") {
//       alert(`${data?.message} Vui lòng chỉnh lại số lượng trong giỏ hàng`);
//       return null;
//     }
//     if (data?.message) {
//       localStorage.removeItem("cart");
//       alert("Đặt hàng thành công");
//       return redirect("/thank-you");
//     }
//     return data;
//   }
//   return null;
// };
import React, { useMemo, useState, useEffect } from "react";
import classes from "./CheckOutPage.module.css";
import { useSelector } from "react-redux";
import { axiosGetCurrentUser } from "../services/authServices";
import { axiosCreateOrder } from "../services/orderServices";
import {
  useLoaderData,
  useActionData,
  Navigate,
  Form,
  redirect,
} from "react-router-dom";
import { getAuthToken } from "../utils/auth";

// Link icon logo nhỏ của Momo (lấy từ mạng cho đẹp)
const MOMO_ICON = "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"; 

const CheckOutPage = () => {
  const data = useLoaderData();
  const actionData = useActionData();

  const addressErrors = actionData?.errors?.filter(
    (error) => error.path === "address"
  );

  // State phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState("COD"); 

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (data?.user) {
      setUserInfo({
        fullName: data.user.fullName || "",
        email: data.user.email || "",
        phoneNumber: data.user.phoneNumber || "",
        address: data.user.address || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const listCart = useSelector((state) => state.cart.listCart);

  const checkoutTotalPrice = useMemo(() => {
    return listCart.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }, [listCart]);

  if (
    JSON.parse(localStorage.getItem("cart")) &&
    JSON.parse(localStorage.getItem("cart")).length === 0
  ) {
    alert("Vui lòng thêm ít nhất một sản phẩm vào giỏ trước khi truy cập trang này.");
    return <Navigate to="/shop" />;
  }

  return (
    <div className={classes.checkout}>
      <div className={classes["checkout-banner"]}>
        <h2>Thanh toán</h2>
        <div>
          <h3>Trang chủ /</h3>
          <h3> Giỏ hàng /</h3>
          <p> Thanh toán</p>
        </div>
      </div>
      <h3>Chi tiết thanh toán</h3>
      <div className={classes.container}>
        <div className={classes.left}>
          <Form action="/checkout" method="post">
            <div className={classes["form-control"]}>
              <label>Họ và tên:</label>
              <input
                value={userInfo.fullName}
                onChange={handleChange}
                name="fullName"
                type="text"
                placeholder="Nhập họ và tên của bạn!"
                required
              />
            </div>

            <div className={classes["form-control"]}>
              <label>Email:</label>
              <input
                value={userInfo.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Nhập email của bạn!"
                required
              />
            </div>

            <div className={classes["form-control"]}>
              <label>Số điện thoại:</label>
              <input
                type="text"
                value={userInfo.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                placeholder="Nhập số điện thoại của bạn!"
                required
              />
            </div>

            <div className={classes["form-control"]}>
              <label>Địa chỉ:</label>
              {addressErrors && addressErrors.length > 0 && (
                <p className={classes.error}>{addressErrors[0].msg}</p>
              )}
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ của bạn!"
                required
              />
            </div>

            {/* --- GIAO DIỆN CHỌN PHƯƠNG THỨC THANH TOÁN --- */}
            <div className={classes["form-control"]}>
              <label style={{ marginBottom: "10px", display: "block" }}>Phương thức thanh toán:</label>
              
              {/* Lựa chọn COD */}
              <div 
                style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    marginBottom: "10px", 
                    padding: "10px", 
                    border: paymentMethod === "COD" ? "1px solid #000" : "1px solid #ddd",
                    cursor: "pointer",
                    borderRadius: "5px"
                }}
                onClick={() => setPaymentMethod("COD")}
              >
                <input 
                    type="radio" 
                    checked={paymentMethod === "COD"} 
                    onChange={() => setPaymentMethod("COD")}
                    style={{ marginRight: "10px" }}
                />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </div>

              {/* Lựa chọn MOMO */}
              <div 
                style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    padding: "10px", 
                    border: paymentMethod === "Momo" ? "1px solid #a50064" : "1px solid #ddd",
                    cursor: "pointer",
                    borderRadius: "5px"
                }}
                onClick={() => setPaymentMethod("Momo")}
              >
                <input 
                    type="radio" 
                    checked={paymentMethod === "Momo"} 
                    onChange={() => setPaymentMethod("Momo")}
                    style={{ marginRight: "10px" }}
                />
                <img src={MOMO_ICON} alt="Momo" width="30" style={{ marginRight: "10px" }} />
                <span>Thanh toán qua Ví Momo</span>
              </div>
            </div>

            {/* --- HIỂN THỊ MÃ QR MOMO --- */}
            {paymentMethod === "Momo" && (
                <div style={{ marginTop: "15px", textAlign: "center", padding: "15px", backgroundColor: "#fff0f6", borderRadius: "8px", border: "1px dashed #a50064" }}>
                    <p style={{ color: "#a50064", fontWeight: "bold", marginBottom: "10px" }}>QUÉT MÃ ĐỂ THANH TOÁN</p>
                    
                    {/* ẢNH QR CỦA BẠN Ở ĐÂY */}
                    <img 
                        src="/images/MOMO_QR.jpg" 
                        alt="QR Momo" 
                        style={{ maxWidth: "200px", width: "100%", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                    />
                    
                    <div style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
                        <p>Nội dung chuyển khoản:Tên + SĐT </p>
                        
                    </div>
                    <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
                        (Shop sẽ gọi điện xác nhận ngay khi nhận được tiền)
                    </p>
                </div>
            )}
            {/* ------------------------------------------------ */}

            <input type="hidden" name="totalPrice" value={checkoutTotalPrice} />
            <input type="hidden" name="paymentMethod" value={paymentMethod} />

            <div style={{ marginTop: "20px" }}>
              <button 
                type="submit"
                style={{ 
                    backgroundColor: paymentMethod === "Momo" ? "#a50064" : "#333",
                    color: "white",
                    transition: "all 0.3s"
                }}
              >
                {paymentMethod === "Momo" ? "Đã chuyển tiền & Đặt hàng" : "Đặt hàng (COD)"}
              </button>
            </div>
          </Form>
        </div>

        <div className={classes.right}>
          <div className={classes.wrapper}>
            <h2>Đơn hàng của bạn</h2>
            {listCart &&
              listCart.map((cart) => (
                <div key={cart.id} className={classes["item-order"]}>
                  <h3>{cart.name}</h3>
                  <p>
                    {new Intl.NumberFormat("vi-VN").format(
                      Number(cart.price) || 0
                    ) + ` đ x ${cart.quantity}`}
                  </p>
                </div>
              ))}

            <div className={classes.paymentMethod}>
              <h3>Phương thức</h3>
              <p style={{ fontWeight: "bold", color: paymentMethod === "Momo" ? "#a50064" : "inherit" }}>
                {paymentMethod === "Momo" ? "Ví điện tử Momo" : "Thanh toán khi nhận hàng (COD)"}
              </p>
            </div>

            <div className={classes.total}>
              <h3>Tổng cộng</h3>
              <p>
                {new Intl.NumberFormat("vi-VN").format(
                  Number(checkoutTotalPrice) || 0
                ) + " đ"}
              </p>
            </div>

            <div className={classes.shippingNote}>
              <p>Lưu ý: Quý khách vui lòng nhận hàng để tránh phát sinh phí vận chuyển </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;

export const loader = async () => {
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") return null;
  const data = await axiosGetCurrentUser(token);
  return data || null;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const cart = JSON.parse(localStorage.getItem("cart"));

  const dataSend = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    address: formData.get("address"),
    cart,
    totalPrice: formData.get("totalPrice"),
    paymentMethod: formData.get("paymentMethod") || "COD", 
  };

  if (!dataSend.fullName || dataSend.fullName.trim().length < 5) {
    return {
      errors: [
        { path: "address", msg: "Họ và tên là bắt buộc (tối thiểu 5 ký tự)." },
      ],
    };
  }

  if (!dataSend.address || dataSend.address.trim().length === 0) {
    return { errors: [{ path: "address", msg: "Địa chỉ là bắt buộc." }] };
  }

  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") return null;

  const data = await axiosCreateOrder(token, dataSend);

  if (data) {
    if (data.errors) return data;
    if (data?.message === "Quantity exceeded product quantity in stock!") {
      alert(`${data?.message} Vui lòng chỉnh lại số lượng trong giỏ hàng`);
      return null;
    }
    if (data?.message) {
      localStorage.removeItem("cart");
      
      if (dataSend.paymentMethod === "Momo") {
          alert("Cảm ơn bạn! Chúng tôi sẽ kiểm tra thanh toán Momo và liên hệ sớm.");
      } else {
          alert("Đặt hàng thành công!");
      }
      
      return redirect("/thank-you");
    }
    return data;
  }
  return null;
};