import React from "react";

//CSS module
import classes from "./OrderDetailPage.module.css";

//Dịch vụ đơn hàng
import { axiosGetUserDetailOrder } from "../services/orderServices";

//Lấy token xác thực
import { getAuthToken } from "../utils/auth";

//React router dom
import { useLoaderData, Link } from "react-router-dom";

const OrderDetailPage = () => {
  //Dữ liệu
  const { order } = useLoaderData();

  const formatDateTime = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={classes["order-detail"]}>
      {order && (
        <div className={classes["order-container"]}>
          <div className={classes["order-info"]}>
            <h1>Thông tin đơn hàng</h1>
            <p>ID Người dùng: {order.userId._id}</p>
            <p>Họ và tên: {order.userId.fullName}</p>
            <p>Số điện thoại: {order.userId.phoneNumber}</p>
            <p>Địa chỉ: {order.userId.address}</p>
            <p>Ngày đặt: {formatDateTime(order.createdAt)}</p> {/* ✅ mới */}
            <p>
              Tổng cộng:{" "}
              {new Intl.NumberFormat("vi-VN")
  .format(Number(order.totalPrice) || 0) + " đ"}

            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID Sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.product.code || item.product.id}</td>
                  <td>
                    <img
                      src={item.product.img}
                      alt={item.product.name}
                    />
                  </td>
                  <td>{item.product.name}
                    {/* === THÊM MỚI (TỪ BƯỚC 3.2) === */}
                    {/* Thêm link đánh giá dưới tên sản phẩm nếu đã giao */}
                    {order.deliveryStatus === "Delivered" && (
                      <div style={{ marginTop: '5px' }}>
                        <Link
                          to={`/detail/${item.product.id}?review=true`}
                          style={{ color: 'blue', textDecoration: 'underline', fontSize: '0.9em' }}
                        >
                          Viết đánh giá
                        </Link>
                      </div>
                    )}
                    {/* ============================= */}
                  </td>
                  <td>
                    {new Intl.NumberFormat("vi-VN")
  .format(Number(item.product.price) || 0) + " đ"}

                  </td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;

export const loader = async ({ request, params }) => {
  const { orderId } = params;
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") {
    return null;
  }
  const data = await axiosGetUserDetailOrder(token, orderId);
  if (data) return data;
  return null;
};
