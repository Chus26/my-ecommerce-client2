import React from "react";

//Import css module
import classes from "./ProductPopup.module.css";

//Import từ react-redux
import { useSelector, useDispatch } from "react-redux";

//Import Product actions
import { productActions } from "../store/product";

//Import từ react-router-dom
import { useNavigate } from "react-router-dom";

const ProductPopUp = () => {
  //navigate
  const navigate = useNavigate();

  //lấy productItem từ store
  const productItem = useSelector((state) => state.product.product);
  //dispatch
  const dispatch = useDispatch();

  //Xử lý click x để ẩn popup
  const hideClickHandler = () => {
    //dispatch để set ẩn popup
    dispatch(productActions.hidePopup());
  };

  //Xử lý click xem chi tiết sản phẩm
  const viewDetailHandler = () => {
    navigate(`/detail/${productItem._id}`);
  };

  return (
    <div className={classes.popup}>
      <div className={classes.container}>
        <div onClick={hideClickHandler} className={classes.hide}>
          &times;
        </div>

        <div>
          <img src={productItem.img1} alt="sản-phẩm" />  {/* ✅ Cloudinary URL */}
        </div>

        <div>
          <h3>{productItem.name}</h3>
          <h4>
            {/*Định dạng tiền tệ */}
            {new Intl.NumberFormat("vi-VN")
  .format(Number(productItem.price) || 0) + " đ"}

          </h4>
          <p>{productItem.short_desc}</p>
          <button onClick={viewDetailHandler}>
            <i className="fa-solid fa-cart-shopping"></i>Xem Chi Tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopUp;
