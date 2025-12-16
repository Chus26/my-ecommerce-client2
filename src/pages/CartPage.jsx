// export default CartPage;

import React, { useState, useMemo, useEffect } from "react";

//React-router-dom
import { Link, useNavigate } from "react-router-dom";

//Css module
import classes from "./CartPage.module.css";

//React-redux
import { useSelector, useDispatch } from "react-redux";

//Products
import { axiosGetProductsInCart } from "../services/productServices";

//Import cart actions
import { cartActions } from "../store/cart";

const CartPage = () => {
  //Điều hướng
  const navigate = useNavigate();

  //State mã giảm giá
  const [coupon, setCoupon] = useState("");

  //Sản phẩm
  const [products, setProducts] = useState([]);

  //Xử lý thay đổi input mã giảm giá
  const couponInputChange = (e) => {
    //set state coupon
    setCoupon(e.target.value);
  };

  //Xử lý submit mã giảm giá
  const couponSubmit = (e) => {
    //Ngăn hành vi submit mặc định
    e.preventDefault();

    //Reset coupon
    setCoupon("");
  };

  //Dispatch
  const dispatch = useDispatch();

  //Lấy state listCart
  const listCart = useSelector((state) => state.cart.listCart);

  //Lấy state isAuthenticated
  const { isAuthenticated } = useSelector((state) => state.auth);

  //Tăng số lượng
  const incrementQuantityHandler = (cartItem) => {
    const currentProduct =
      products?.length > 0 &&
      products.find((product) => product?._id === cartItem?.id);

    //Khi vượt quá số lượng tồn
    if (currentProduct?.stock <= cartItem?.quantity) {
      alert(
        `Vượt quá số lượng tồn kho hoặc số lượng trong giỏ đã đủ! ${currentProduct?.stock}`
      );
      return;
    }
    //Dispatch tăng số lượng
    dispatch(cartActions.incrementCartQuantity(cartItem));
  };

  //Giảm số lượng
  const decrementQuantityHandler = (cartItem) => {
    //Dispatch giảm số lượng
    dispatch(cartActions.decrementCartQuantity(cartItem));
  };

  //Xoá sản phẩm khỏi giỏ
  const deleteCartHandler = (cartId) => {
    //Dispatch xoá
    dispatch(cartActions.deleteCart(cartId));
  };

  //Tổng tiền giỏ hàng
  const cartTotalPrice = useMemo(() => {
    return listCart.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }, [listCart]);

  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const productInCartIds =
      cart.length > 0 &&
      cart
        .map((cart) => cart.id)
        .filter((item, index, value) => value.indexOf(item) === index);
    const getProducts = async (dataIds) => {
      const data = await axiosGetProductsInCart({
        productIds: dataIds.length > 0 && dataIds.join("\n"),
      });
      setProducts(data.products);
    };
    if (productInCartIds.length > 0) {
      getProducts(productInCartIds);
    }
  }, []);
  return (
    <div className={classes.cart}>
      <div className={classes["cart-banner"]}>
        <h2>Giỏ hàng</h2>
        <p>cart</p>
      </div>
      <h3>Giỏ hàng mua sắm</h3>
      <div className={classes.container}>
        <div className={classes.left}>
          <table>
            <thead>
              <tr className={classes.heading}>
                <th>Hình ảnh</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th>Xoá</th>
              </tr>
            </thead>

            <tbody>
              {listCart &&
                listCart.length > 0 &&
                listCart?.map((cart) => (
                  <tr key={cart.id}>
                    <td>
                      <img
                        src={cart.img}  /* ✅ dùng trực tiếp URL Cloudinary */
                        alt="product"
                      />
                    </td>
                    <td className={classes["product-name"]}>{cart.name}</td>
                    <td className={classes.price}>
                      {/*Định dạng tiền tệ */}
                      {new Intl.NumberFormat("vi-VN")
  .format(Number(cart.price) || 0) + " đ"}

                    </td>
                    <td>
                      <span
                        onClick={() => decrementQuantityHandler(cart)}
                        style={{ padding: "0 0.25rem", cursor: "pointer" }}
                      >
                        <i className="fa-sharp fa-solid fa-caret-left"></i>
                      </span>
                      <span className={classes.number}>{cart.quantity}</span>
                      <span
                        onClick={() => incrementQuantityHandler(cart)}
                        style={{ padding: "0 0.25rem", cursor: "pointer" }}
                      >
                        <i className="fa-sharp fa-solid fa-caret-right"></i>
                      </span>
                    </td>
                    <td className={classes.price}>
                      {/*Định dạng tiền tệ */}
                      {new Intl.NumberFormat("vi-VN")
  .format(Number(cart.price * cart.quantity) || 0) + " đ"}

                    </td>

                    <td>
                      <i
                        onClick={() => deleteCartHandler(cart.id)}
                        className={`fa-regular fa-trash-can ${classes.trash}`}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {listCart.length === 0 && (
            <h2 className={classes["no-cart"]}>
              Chưa có sản phẩm nào trong giỏ
            </h2>
          )}

          <div className={classes.actions}>
            <div>
              <Link to="/shop">
                <i className="fa-solid fa-arrow-left"></i> Tiếp tục mua sắm
              </Link>
            </div>
            <div>
              <button
                onClick={() => {
                  if (cartTotalPrice === 0) {
                    alert(
                      "Chưa có sản phẩm trong giỏ, vui lòng thêm sản phẩm trước."
                    );
                    return;
                  }

                  if (!isAuthenticated) {
                    alert("Bạn cần đăng nhập...");
                    localStorage.setItem("redirect", "checkout");
                    return navigate("/login");
                  } else {
                    return navigate("/checkout");
                  }
                }}
                className={classes.border}
              >
                Tiến hành thanh toán{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.wrapper}>
            <h2>Tổng giỏ hàng</h2>
            <div>
              <h3>Tạm tính</h3>
              <p className={classes["main-total"]}>
                {/* Xử lý tổng tiền */}
                {new Intl.NumberFormat("vi-VN")
  .format(Number(cartTotalPrice) || 0) + " đ"}

              </p>
            </div>
            <div>
              <h3>Tổng cộng</h3>
              <p>
                {/* Xử lý tổng tiền */}
                {new Intl.NumberFormat("vi-VN")
                  .format(
                    (listCart || []).reduce((acc, curr) => {
                      return acc + curr.price * curr.quantity;
                    }, 0)
                  ) + " đ"}

              </p>
            </div>
          </div>
          <div className={classes.coupon}>
            <form onSubmit={couponSubmit}>
              <div>
                <input
                  value={coupon}
                  onChange={couponInputChange}
                  type="text"
                  placeholder="Nhập mã giảm giá"
                />
              </div>
              <div>
                <button type="submit">
                  <i className="fa-solid fa-gift"></i>Áp dụng mã
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
