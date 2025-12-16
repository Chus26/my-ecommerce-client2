// // ===== THAY THẾ TOÀN BỘ FILE: src/components/Banner.jsx =====

// import React, { useState, useEffect } from 'react';
// import classes from './Banner.module.css';

// // 1. Cập nhật danh sách slides: CHỈ CÒN LẠI ẢNH
// const slides = [
//   {
//     type: 'image',
//     image: '/images/banner1.png',
//   },
//   { 
//     type: 'image',
//     image: '/images/banner2.png',
//   },
// ];

// const Banner = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // (useEffect Preload ảnh ... giữ nguyên)
//   useEffect(() => {
//     slides.forEach((slide) => {
//       const img = new Image();
//       img.src = slide.image;
//     });
//   }, []);

//   // (useEffect Timer ... giữ nguyên)
//   useEffect(() => {
//     // Thời gian chuyển slide: 6 giây
//     const slideInterval = 6000;
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) =>
//         prevSlide === slides.length - 1 ? 0 : prevSlide + 1
//       );
//     }, slideInterval);
//     return () => clearInterval(interval);
//   }, []); // Timer chạy độc lập

//   // (handlers ... giữ nguyên)
//   const nextSlideHandler = () => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === slides.length - 1 ? 0 : prevSlide + 1
//     );
//   };

//   const prevSlideHandler = () => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === 0 ? slides.length - 1 : prevSlide - 1
//     );
//   };

//   return (
//     <div className={classes.banner}>
//       <div className={classes.container}>
        
//         {/* 2. Render slide ảnh */}
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={classes.slide}
//             // Dùng opacity để điều khiển hiệu ứng chuyển cảnh cross-fade
//             style={{ opacity: currentSlide === index ? 1 : 0 }}
//           >
//             <img
//               src={slide.image}
//               // Thêm class KenBurns cho hiệu ứng zoom chậm
//               className={`${classes.slideMedia} ${classes.kenBurns}`}
//               alt="Banner"
//             />
//           </div>
//         ))}

//         {/* Lớp phủ (overlay) */}
//         <div className={classes.overlay}></div>

//         {/* Nút bấm điều hướng (Giữ nguyên) */}
//         <button
//           className={`${classes.navButton} ${classes.prev}`}
//           onClick={prevSlideHandler}
//         >
//           &#10094;
//         </button>
//         <button
//           className={`${classes.navButton} ${classes.next}`}
//           onClick={nextSlideHandler}
//         >
//           &#10095;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner;

// ===== THAY THẾ TOÀN BỘ FILE: src/components/Banner.jsx =====

import React, { useState, useEffect } from 'react';
import classes from './Banner.module.css';

// 1. Cập nhật danh sách slides: CHỈ CÒN LẠI ẢNH
const slides = [
  {
    type: 'image',
    image: '/images/banner1.png',
  },
  { 
    type: 'image',
    image: '/images/banner2.png',
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // (useEffect Preload ảnh ... giữ nguyên)
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // (useEffect Timer ... giữ nguyên)
  useEffect(() => {
    // Thời gian chuyển slide: 5 giây (nhanh hơn xíu cho đỡ chán)
    const slideInterval = 5000;
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, slideInterval);
    return () => clearInterval(interval);
  }, []);

  // (handlers ... giữ nguyên)
  const nextSlideHandler = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlideHandler = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className={classes.banner}>
      <div className={classes.container}>
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className={classes.slide}
            // Dùng opacity để điều khiển hiệu ứng chuyển cảnh cross-fade
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <img
              src={slide.image}
              // ⚠️ ĐÃ SỬA: Bỏ class kenBurns, chỉ giữ slideMedia
              className={classes.slideMedia}
              alt="Banner"
            />
          </div>
        ))}

        {/* Lớp phủ (overlay) */}
        <div className={classes.overlay}></div>

        {/* Nút bấm điều hướng */}
        <button
          className={`${classes.navButton} ${classes.prev}`}
          onClick={prevSlideHandler}
        >
          &#10094;
        </button>
        <button
          className={`${classes.navButton} ${classes.next}`}
          onClick={nextSlideHandler}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Banner;