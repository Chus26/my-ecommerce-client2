// // export default OthersInfo;

// import React, { useState, useEffect, useRef } from 'react'; //Sử dụng thêm useRef

// //Import css module
// import classes from './OthersInfo.module.css';

// // (Bạn có thể dùng component Spinner/Loading nếu có)
// // import LoadingSpinner from '../UI/LoadingSpinner';
// const BACKEND_URL =
//   process.env.REACT_APP_BACKEND_API ||
//   process.env.REACT_APP_API_URL ||
//   "http://localhost:5000";

// // === TẠO MẢNG ẢNH KHÁCH HÀNG ===
// // ❗ Quan trọng: Hãy thay thế các đường dẫn (src) này bằng ảnh thật của shop bạn
// const customerImages = [
//   { src: "/images/1.png", alt: "Khách hàng tại shop 1" },
//   { src: "/images/2.png", alt: "Khách hàng tại shop 2" },
//   { src: "/images/3.png", alt: "Khách hàng tại shop 3" },
//   { src: "/images/4.png", alt: "Khách hàng tại shop 4" },
//   { src: "/images/5.png", alt: "Khách hàng tại shop 5" },
//   { src: "/images/6.png", alt: "Khách hàng tại shop 6" },
//   { src: "/images/7.png", alt: "Khách hàng tại shop 7" },
//   { src: "/images/8.png", alt: "Khách hàng tại shop 8" },
// ];
// // ================================


// const OthersInfo = () => {
//   const [reviews, setReviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // === THÊM REF ĐỂ QUẢN LÝ VI TRÍ CUỘN ===
//   const galleryRef = useRef(null);
//   // =====================================

//   useEffect(() => {
//     const fetchFeaturedReviews = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${BACKEND_URL}/api/products/reviews/featured?limit=3`);

//         if (!response.ok) {
//           throw new Error('Không thể tải đánh giá nổi bật');
//         }
//         const data = await response.json();
//         setReviews(data.reviews);
//       } catch (error) {
//         console.error(error.message);
//       }
//       setIsLoading(false);
//     };

//     fetchFeaturedReviews();
//   }, []);

//   // === useEffect MỚI CHO TỰ ĐỘNG CUỘN ẢNH ===
//   useEffect(() => {
//     const gallery = galleryRef.current;
//     if (!gallery) return;

//     let scrollAmount = 0;
//     const scrollSpeed = 1; // Tốc độ cuộn (pixels per interval)
//     const intervalTime = 20; // Khoảng thời gian (ms) giữa mỗi lần cuộn nhỏ

//     const autoScroll = setInterval(() => {
//       // Kiểm tra xem người dùng có đang di chuột vào không
//       // Nếu có, tạm dừng cuộn
//       if (gallery.matches(':hover')) {
//           return;
//       }
        
//       if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
//         // Nếu đã cuộn đến cuối, quay lại đầu
//         gallery.scrollLeft = 0;
//         scrollAmount = 0;
//       } else {
//         // Cuộn tiếp
//         scrollAmount += scrollSpeed;
//         gallery.scrollLeft = scrollAmount;
//       }
//     }, intervalTime);

//     // Dọn dẹp interval khi component unmount
//     return () => clearInterval(autoScroll);
    
//   // === 💡 ĐÃ SỬA LỖI: Bỏ 'customerImages', dùng mảng rỗng [] ===
//   }, []); 
//   // ============================================

//   let reviewContent = (
//     <p className={classes.noReviews}>Chưa có đánh giá nào.</p>
//   );

//   if (reviews.length > 0) {
//     reviewContent = (
//       <div className={classes.reviewList}>
//         {reviews.map((review) => (
//           <div key={review._id} className={classes.reviewCard}>
//             <p className={classes.reviewComment}>"{review.comment}"</p>
//             <div className={classes.reviewRating}>
//               {'⭐'.repeat(review.rating)}
//             </div>
//             <p className={classes.reviewAuthor}>- {review.fullName}</p>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (isLoading) {
//     reviewContent = <p>Đang tải đánh giá...</p>;
//   }

//   return (
//     <div className={classes['others-info']}>
      

//       <div className={classes.reviews}>
//         <h3>Đánh giá nổi bật</h3>
//         {reviewContent}
//       </div>
      
//       {/* === PHẦN KHÁCH HÀNG CỦA SHOP (ĐÃ THAY ĐỔI) === */}
//       <div className={classes.customers}>
//         <h3>Khách Hàng Của Shop</h3>
//         {/* === THÊM ref={galleryRef} VÀO ĐÂY === */}
//         <div ref={galleryRef} className={classes.customerGallery}> 
//           {customerImages.map((img, index) => (
//             <img
//               key={index}
//               src={img.src}
//               alt={img.alt}
//               className={classes.customerImage}
//             />
//           ))}
//           {/* Nhân đôi ảnh để tạo hiệu ứng cuộn mượt mà vô hạn (tùy chọn) */}
//           {customerImages.map((img, index) => (
//             <img
//               key={`clone-${index}`}
//               src={img.src}
//               alt={img.alt}
//               className={classes.customerImage}
//               aria-hidden="true" // Ẩn khỏi trình đọc màn hình
//             />
//           ))}
//         </div>
//       </div>
//       {/* === KẾT THÚC PHẦN KHÁCH HÀNG CỦA SHOP === */}
//       <div className={classes.freeship}>
//         <div>
//           <h3>Miễn phí vận chuyển</h3>
//           <p>Giao hàng miễn phí toàn cầu</p>
//         </div>
//         <div>
//           <h3>Dịch vụ 24/7</h3>
//           <p>Hỗ trợ khách hàng mọi lúc</p>
//         </div>
//         <div>
//           <h3>Ưu đãi lễ hội</h3>
//           <p>Khuyến mãi hấp dẫn mùa lễ hội</p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default OthersInfo;

// ===== THAY THẾ TOÀN BỘ FILE: src/components/OthersInfo.jsx =====

import React, { useState, useEffect, useRef } from "react";
import classes from "./OthersInfo.module.css"; // Chúng ta sẽ dùng file CSS mới

// (Giả sử BACKEND_URL được định nghĩa ở đây hoặc import từ file config)
const BACKEND_URL = process.env.REACT_APP_BACKEND_API || "http://localhost:5000";

// ===================================================================
// === LOGIC TÁCH BIỆT (Custom Hooks) ===
// ===================================================================

/**
 * Hook Chuyên nghiệp 1: Tự động gọi API lấy đánh giá nổi bật.
 */
const useFeaturedReviews = (limit = 3) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/products/reviews/featured?limit=${limit}`
        );
        if (!response.ok) throw new Error("Không thể tải đánh giá.");
        
        const data = await response.json();
        if (isMounted) setReviews(data.reviews || []);
        
      } catch (error) {
        console.error(error.message);
        if (isMounted) setReviews([]);
      }
      if (isMounted) setIsLoading(false);
    };

    fetchReviews();
    return () => { isMounted = false; };
  }, [limit]); // Chỉ chạy lại nếu 'limit' thay đổi

  return { reviews, isLoading };
};

/**
 * Hook Chuyên nghiệp 2: Tự động cuộn ngang một element.
 * Tự động dừng khi hover.
 */
const useAutoScroll = (options = {}) => {
  const { speed = 1, intervalTime = 20 } = options;
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let scrollAmount = 0;
    
    const autoScroll = setInterval(() => {
      // Dừng cuộn khi user hover vào
      if (gallery.matches(":hover")) {
        return;
      }

      // Kiểm tra nếu cuộn đến 1/2 (điểm bắt đầu của ảnh clone)
      if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth / 2) {
         // Quay lại đầu một cách mượt mà
        gallery.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        // Cuộn tiếp
        scrollAmount += speed;
        gallery.scrollLeft = scrollAmount;
      }
    }, intervalTime);

    // Dọn dẹp
    return () => clearInterval(autoScroll);
  }, [speed, intervalTime]); // Chỉ chạy lại nếu options thay đổi

  return galleryRef; // Trả về ref để component gắn vào
};

// ===================================================================
// === COMPONENT CON (Tách biệt giao diện) ===
// ===================================================================

/**
 * Component Con 1: Thanh Dịch vụ (Theme tối MỚI, 4 cột, có icon)
 * (Dựa trên ảnh bạn gửi)
 */
const FeatureBanner = () => {
  const features = [
    {
      icon: "fa-solid fa-check-circle", // Icon Font Awesome
      title: "GIÁ LUÔN CẠNH TRANH",
      description: null // Không có mô tả
    },
    {
      icon: "fa-solid fa-truck",
      title: "GIAO HÀNG MIỄN PHÍ",
      description: "Toàn quốc" // Mô tả ngắn
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "BẢO HÀNH 24 THÁNG",
      description: "01 đổi 01"
    },
    {
      icon: "fa-solid fa-rotate-left",
      title: "ĐỔI TRẢ MIỄN PHÍ",
      description: "Không Cần Lý Do"
    },
  ];

  return (
    <section className={classes.featureBanner}>
      {features.map((feature) => (
        <div key={feature.title} className={classes.featureItem}>
          {/* Dùng <i> cho Font Awesome */}
          <i className={`${feature.icon} ${classes.featureIcon}`}></i>
          <h3>{feature.title}</h3>
          {/* Chỉ render <p> nếu có description */}
          {feature.description && <p>{feature.description}</p>}
        </div>
      ))}
    </section>
  );
};

/**
 * Component Con 2: Thư viện ảnh Khách hàng (Tự cuộn)
 */
const customerImages = [
  { src: "/images/1.png", alt: "Khách hàng 1" },
  { src: "/images/2.png", alt: "Khách hàng 2" },
  { src: "/images/3.png", alt: "Khách hàng 3" },
  { src: "/images/4.png", alt: "Khách hàng 4" },
  { src: "/images/5.png", alt: "Khách hàng 5" },
  { src: "/images/6.png", alt: "Khách hàng 6" },
  { src: "/images/7.png", alt: "Khách hàng 7" },
  { src: "/images/8.png", alt: "Khách hàng 8" },
];

const CustomerGallery = () => {
  // Gọi hook tự cuộn
  const galleryRef = useAutoScroll({ speed: 1, intervalTime: 25 });

  return (
    <section className={classes.customers}>
      <h3>KHÁCH HÀNG CỦA SHOP</h3>
      <div ref={galleryRef} className={classes.customerGallery}>
        {/* Render ảnh gốc */}
        {customerImages.map((img, index) => (
          <img key={index} src={img.src} alt={img.alt} className={classes.customerImage} />
        ))}
        {/* Render ảnh clone (để tạo hiệu ứng cuộn vô hạn) */}
        {customerImages.map((img, index) => (
          <img key={`clone-${index}`} src={img.src} alt="" className={classes.customerImage} aria-hidden="true" />
        ))}
      </div>
    </section>
  );
};

/**
 * Component Con 3: Đánh giá Nổi bật (Gọi API)
 */
const FeaturedReviews = () => {
  // Gọi hook lấy data
  const { reviews, isLoading } = useFeaturedReviews(3);

  let content;

  if (isLoading) {
    content = <p className={classes.statusText}>Đang tải đánh giá...</p>;
  } else if (reviews.length === 0) {
    content = <p className={classes.statusText}>Chưa có đánh giá nào.</p>;
  } else {
    content = (
      <div className={classes.reviewList}>
        {reviews.map((review) => (
          <div key={review._id} className={classes.reviewCard}>
            <p className={classes.reviewComment}>"{review.comment}"</p>
            <div className={classes.reviewRating}>
              {"⭐".repeat(review.rating)}
            </div>
            <p className={classes.reviewAuthor}>- {review.fullName}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className={classes.reviews}>
      <h3>ĐÁNH GIÁ NỔI BẬT</h3>
      {content}
    </section>
  );
};

// ===================================================================
// === COMPONENT CHÍNH (Sạch sẽ, chỉ để sắp xếp) ===
// ===================================================================

/**
 * Component "OthersInfo" chính,
 * bây giờ chỉ còn nhiệm vụ sắp xếp các component con.
 */
const OthersInfo = () => {
  return (
    // Thêm container chính để giữ độ rộng
    <div className={classes.othersInfoContainer}>
      
      {/* 3. Đánh giá nổi bật (Lấy từ API) */}
      <FeaturedReviews />

      {/* 2. Thư viện ảnh khách hàng (Tự cuộn) */}
      <CustomerGallery />


      {/* 1. Thanh Dịch Vụ (Theme tối 4 cột MỚI) */}
      <FeatureBanner />

    </div>
  );
};

export default OthersInfo;