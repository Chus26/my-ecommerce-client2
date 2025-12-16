import React from "react";
import classes from "./ProductList.module.css";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMG =
  "https://via.placeholder.com/600x600?text=No+Image";

const ProductList = ({ data = [] }) => {
  const navigate = useNavigate();
  const goDetail = (id) => navigate(`/detail/${id}`);

  const formatVND = (value) =>
  new Intl.NumberFormat("vi-VN").format(Number(value || 0)) + " đ";


  return (
    <div className={classes["product-list"]}>
      <div className={classes.container}>
        {data.length === 0 ? (
          <p>Không có sản phẩm.</p>
        ) : (
          data.map((product) => (
            <div key={product._id} className={classes.card}>
              {product.stock <= 0 && (
                <div className={classes.soldOutBanner}>HẾT HÀNG</div>
              )}

              <img
                onClick={() => goDetail(product._id)}
                src={product.img1 || FALLBACK_IMG}
                alt={product.name || "sản phẩm"}
                loading="lazy"
                className={product.stock <= 0 ? classes.soldOutImg : ""}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />

              <h3
                title={product.name}
                className={`${classes.name} ${classes.clampBase} ${classes.clamp2}`}
              >
                {product.name}
              </h3>

              {/* mô tả ngắn dưới tên, clamp 2 dòng */}
              <p className={`${classes.shortDesc} ${classes.clampBase} ${classes.clamp2}`}>
                {product.short_desc || ""}
              </p>

              <p className={classes.price}>{formatVND(product.price)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
