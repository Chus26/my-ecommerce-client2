// ===== FILE: DetailPage.jsx =====
import React, { useState, useEffect } from "react";
import classes from "./DetailPage.module.css";
import { v4 as uuidv4 } from "uuid";
import {
  useLoaderData,
  useNavigate,
  useLocation,
  useSearchParams,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { cartActions } from "../store/cart";
import { useDispatch } from "react-redux";
import { axiosGetProductDetail } from "../services/productServices";
import socket from "../utils/socket-io";
import { getAuthToken } from "../utils/auth";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_API ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

const DetailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const { product: productLoader, relatedProducts: relatedFromLoader } = useLoaderData();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState(relatedFromLoader || []);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const imgs = [product?.img1, product?.img2, product?.img3, product?.img4].filter(Boolean);
  const [activeIdx, setActiveIdx] = useState(0);
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  const [rating, setRating] = useState(0);
  const showReviewForm = searchParams.get("review") === "true";
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    setQuantity(1);
    setProduct(productLoader);
    setActiveIdx(0);
    setRelated(relatedFromLoader || []);
    setPreviewImages([]);
    setRating(0);
  }, [location.pathname, productLoader, relatedFromLoader]);

  useEffect(() => {
    const handleData = (data) => {
      if (data.action === "PRODUCT") {
        setProduct(data.product);
        setActiveIdx(0);
      }
    };
    socket.on("product", handleData);
    return () => {
      socket.off("product", handleData);
    };
  }, []);

  useEffect(() => {
    const BASE = BACKEND_URL;
    if (!product?._id || !BASE) return;

    const fetchRelated = async () => {
      try {
        setLoadingRelated(true);
        const res = await fetch(`${BASE}/api/products/${product._id}/related?limit=8`);
        if (!res.ok) throw new Error("fetch related failed");
        const data = await res.json();
        if (Array.isArray(data?.relatedProducts)) {
          setRelated(data.relatedProducts);
        }
      } catch {
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchRelated();
  }, [product?._id]);

  const clickProductImgHandler = (p) => navigate(`/detail/${p._id}`);
  const incrementHandler = () => setQuantity((q) => q + 1);
  const decrementHandler = () => setQuantity((q) => (q > 1 ? q - 1 : q));

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      setPreviewImages([]);
      return;
    }
    if (files.length > 5) {
      alert("Bạn chỉ có thể upload tối đa 5 ảnh.");
      e.target.value = null;
      setPreviewImages([]);
      return;
    }

    const previewUrls = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previewUrls.push(reader.result);
        if (previewUrls.length === files.length) {
          setPreviewImages(previewUrls);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // ===== FILE: DetailPage.jsx (Hàm addCartClickHandler - sạch) =====

const addCartClickHandler = (cartItem) => {
  if (product?.stock === undefined || product?.stock < 1) {
    alert("Xin lỗi, sản phẩm này đã hết hàng! Vui lòng chọn sản phẩm khác.");
    return;
  }

  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const productInCart =
    cart?.length > 0 &&
    cart.find((cartProduct) => cartProduct?.id === cartItem?.id);

  const productInCartQuantity = +productInCart?.quantity || 0;

  if (product?.stock < cartItem?.quantity + productInCartQuantity) {
    alert(
      `Vượt quá số lượng tồn hoặc số lượng trong giỏ đã tối đa! ${product?.stock}`
    );
    return;
  }

  dispatch(cartActions.addCart(cartItem));

  const img = document.createElement("img");
  img.src = product.img1;
  img.className = classes.flyImg;
  document.body.appendChild(img);

  const startX = window.innerWidth / 2 - 60;
  const startY = window.scrollY + 300;
  const cartX = window.innerWidth - 50;
  const cartY = 20;

  img.style.left = `${startX}px`;
  img.style.top = `${startY}px`;

  requestAnimationFrame(() => {
    img.style.transform = `translate(${cartX - startX}px, ${cartY - startY}px) scale(0.2)`;
    img.style.opacity = "0";
  });

  setTimeout(() => {
    img.remove();
  }, 800);

  setShowToast(true);
  setTimeout(() => setShowToast(false), 2000);
};

// === Thêm mới hàm này (Bước 1) ===
const handleBuyNowClick = (cartItem) => {
  // 1. Kiểm tra tồn kho (copy logic từ addCartClickHandler)
  if (product?.stock === undefined || product?.stock < 1) {
    alert("Xin lỗi, sản phẩm này đã hết hàng! Vui lòng chọn sản phẩm khác.");
    return;
  }

  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const productInCart =
    cart?.length > 0 &&
    cart.find((cartProduct) => cartProduct?.id === cartItem?.id);

  const productInCartQuantity = +productInCart?.quantity || 0;

  if (product?.stock < cartItem?.quantity + productInCartQuantity) {
    alert(
      `Vượt quá số lượng tồn hoặc số lượng trong giỏ đã tối đa! ${product?.stock}`
    );
    return;
  }

  // 2. Thêm sản phẩm vào giỏ
  dispatch(cartActions.addCart(cartItem));

  // 3. Chuyển đến trang thanh toán
  navigate("/checkout");
};
// ===================================



  return (
    <div className={classes.detail}>
      {product && (
        <>
          <div className={classes.main}>
            <div className={classes.left}>
              <div className={classes.one}>
                {imgs.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    onClick={() => setActiveIdx(i)}
                    title={`Xem ảnh #${i + 1}`}
                    className={activeIdx === i ? classes.activeThumbnail : ""}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <div className={classes.four}>
                {imgs[activeIdx] && (
                  <div className={classes.zoomContainer}>
                    <img
                      src={imgs[activeIdx]}
                      alt={product.name}
                      className={classes.zoomImage}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={classes.right}>
              <h2>{product.name}</h2>
              <h3>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(Number(product.price) || 0)}
              </h3>
              <p>{product.short_desc}</p>
              <h4>
                Danh mục: <span>{product.category}</span>
              </h4>
              <div className={classes.stock}>
                <span>Tồn kho</span>
                <span> : </span>
                <span
                  className={
                    product?.stock > 0
                      ? `${classes.normal}`
                      : `${classes["out-of-stock"]}`
                  }
                >
                  {product?.stock > 0 ? product?.stock : "Hết hàng!"}
                </span>
              </div>
              <div className={classes.quantity}>
                <span>Số lượng</span>
                <span style={{ cursor: "pointer" }} onClick={decrementHandler}>
                  <i className="fa-sharp fa-solid fa-caret-left"></i>
                </span>
                <span className={classes.number}>{quantity}</span>
                <span style={{ cursor: "pointer" }} onClick={incrementHandler}>
                  <i className="fa-sharp fa-solid fa-caret-right"></i>
                </span>
                <button
                  onClick={() =>
                    addCartClickHandler({
                      quantity,
                      id: product._id,
                      name: product.name,
                      img: product.img1,
                      price: product.price,
                    })
                  }
                >
                  Thêm vào giỏ
                </button>

                {/* === Thêm nút này vào === */}
                <button
                  className={classes.buyNowBtn}
                  onClick={() =>
                    handleBuyNowClick({
                      quantity,
                      id: product._id,
                      name: product.name,
                      img: product.img1,
                      price: product.price,
                    })
                  }
                >
                  Mua ngay
                </button>
{/* ======================= */}

              </div>
            </div>
          </div>
        </>
      )}

      <div className={classes.description}>
        <button>Mô tả</button>
        <h3>Mô tả sản phẩm</h3>
        {product &&
          product.long_desc
            .split("\n")
            .map((text) => <p key={uuidv4()}>{text}</p>)}
      </div>

      <div className={classes.reviewsSection}>
        <h2>Đánh giá ({product?.numReviews || 0})</h2>
        <div>
          Điểm trung bình: {"⭐".repeat(Math.round(product?.rating || 0))} (
          {product?.rating?.toFixed(1) || 0})
        </div>

        {product?.reviews && product.reviews.length > 0 ? (
          <ul className={classes.reviewList}>
            {product.reviews.map((review) => (
              <li key={review._id} className={classes.reviewItem}>
                <strong>{review.fullName}</strong>
                <div className={classes.ratingStars}>
                  {"⭐".repeat(review.rating)}
                </div>
                <p>{review.comment}</p>
                {review.images && review.images.length > 0 && (
                  <div className={classes.reviewImagesContainer}>
                    {review.images.map((img) => (
                      <img
                        key={img.public_id || img.url}
                        src={img.url}
                        alt="Ảnh đánh giá"
                        className={classes.reviewImage}
                      />
                    ))}
                  </div>
                )}
                <small>
                  {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>

      {showReviewForm && (
        <div className={classes.reviewForm}>
          <h3>Viết đánh giá của bạn</h3>

          {actionData?.message && (
            <p style={{ color: actionData.error ? "red" : "green" }}>
              {actionData.message}
            </p>
          )}

          <Form method="post" encType="multipart/form-data">
            <div className={classes.formControl}>
              <label>Xếp hạng:</label>
              <select
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Chọn...</option>
                <option value="1">1 Sao - Rất tệ</option>
                <option value="2">2 Sao - Tệ</option>
                <option value="3">3 Sao - Bình thường</option>
                <option value="4">4 Sao - Tốt</option>
                <option value="5">5 Sao - Rất tốt</option>
              </select>
            </div>
            <div className={classes.formControl}>
              <label htmlFor="comment">Bình luận:</label>
              <textarea id="comment" name="comment" rows="4" required></textarea>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="reviewImages">Thêm ảnh (tối đa 5):</label>
              <input
                type="file"
                id="reviewImages"
                name="reviewImages"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className={classes.fileInput}
              />
            </div>

            {previewImages.length > 0 && (
              <div className={classes.imagePreviewContainer}>
                {previewImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className={classes.previewImage}
                  />
                ))}
              </div>
            )}

            <button type="submit">Gửi đánh giá</button>
          </Form>
        </div>
      )}

      <div className={classes["related-products"]}>
        <h3>Sản phẩm liên quan</h3>

        {loadingRelated && <p>Đang tải sản phẩm liên quan...</p>}

        {!loadingRelated && related && related.length > 0 && (
          <div>
            {related.map((p) => (
              <div key={p._id}>
                <img
                  onClick={() => clickProductImgHandler(p)}
                  src={p.img1}
                  alt={p.name}
                  title={p.name}
                  style={{ cursor: "pointer" }}
                />
                <h3>{p.name}</h3>
                <p>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(p.price) || 0)}
                </p>
              </div>
            ))}
          </div>
        )}

        {!loadingRelated && related && related.length === 0 && (
          <p>Không tìm thấy sản phẩm liên quan!</p>
        )}

        {showToast && <div className={classes.toast}>🛒 Đã thêm vào giỏ hàng</div>}
      </div>
    </div>
  );
};

export default DetailPage;

export const loader = async ({ params }) => {
  const { productId } = params;
  const response = await axiosGetProductDetail(productId);
  return response || null;
};

export const action = async ({ request, params }) => {
  const { productId } = params;
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") {
    alert("Vui lòng đăng nhập để đánh giá.");
    return redirect("/login");
  }

  const formData = await request.formData();

  try {
    const response = await fetch(`${BACKEND_URL}/api/products/${productId}/reviews`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message || "Không thể gửi đánh giá.", error: true };
    }

    return { message: data.message, error: false };
  } catch (err) {
    return { message: err.message || "Lỗi kết nối.", error: true };
  }
};


