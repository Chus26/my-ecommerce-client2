// // ===== FILE: src/components/Footer.jsx (ĐÃ CẬP NHẬT LOGO) =====

// import React from 'react';
// import classes from './Footer.module.css';

// // ✅ ĐÃ SỬA: Dùng đúng tên file "LOGO.png" trong thư mục public/images
// const logoUrl = process.env.PUBLIC_URL + "/images/LOGO.png"; 

// const Footer = () => {
//   // URL Google Maps (Giữ nguyên)
//   const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.127893715298!2d106.66422177408772!3d10.796437258826248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292ddf9d7885%3A0x4882168c27963295!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBUw6BpIE5ndXnDqm4gdsOgIE3DtGkgVHLGsOG7nW5nIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1709280000000!5m2!1svi!2s";

//   return (
//     <div className={classes.footer}>
//       <footer>
//         {/* === Cột 1: Thông tin cửa hàng === */}
//         <div className={classes.storeInfo}>
//           {/* Hiển thị Logo */}
//           <img 
//             src={logoUrl} 
//             alt="Boutique Logo" 
//             className={classes.logo} 
//             // Fallback: Nếu ảnh lỗi thì hiện chữ BOUTIQUE
//             onError={(e) => {
//                 e.target.style.display='none';
//                 e.target.parentNode.insertAdjacentHTML('afterbegin', '<h2 style="color:white; margin-bottom:1rem">BOUTIQUE</h2>');
//             }}
//           />
          
//           <p><strong>Hotline:</strong> <a href="tel:0938707070">0979.342.659</a></p>
//           <p><strong>Phản Ánh & Khiếu Nại:</strong> <a href="tel:0852222222">0979.343.659</a></p>
//           <p><strong>CN1:</strong> Trường Đại học Tài nguyên và Môi trường TP.HCM</p>
//           <p><strong>Email:</strong> <a href="mailto:trucnguyenthanh2611@gmail.com">trucnguyenthanh2611@gmail.com</a></p>
//           <p><strong>Website:</strong> <a href="/" target="_blank" rel="noopener noreferrer">boutique.com.vn</a></p>
//         </div>

//         {/* === Cột 2: Hỗ trợ khách hàng === */}
//         <div className={classes.customerSupport}>
//           <h2>Hỗ trợ khách hàng</h2>
//           <nav>
//             <p><a href='/#'>Mua hàng trả góp</a></p>
//             <p><a href='/#'>Chính sách bảo hành</a></p>
//             <p><a href='/#'>Chính sách giao hàng</a></p>
//             <p><a href='/#'>Chính sách đổi trả hàng</a></p>
//             <p><a href='/#'>Chính sách mua và bán ra</a></p>
//             <p><a href='/#'>Liên hệ</a></p>
//           </nav>
//         </div>

//         {/* === Cột 3: Bản đồ === */}
//         <div className={classes.mapContainer}>
//           <h2>Địa chỉ cửa hàng</h2>
//           <div className={classes.mapEmbed}>
//             <iframe
//               src={mapEmbedUrl}
//               width="100%"
//               height="250"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Địa chỉ cửa hàng"
//             ></iframe>
//           </div>
//         </div>

//       </footer>
      
//       <div className={classes.copyright}>
//         Thiết Kế Website Bởi Thanh Trúc - 0979.342.659
//       </div>
//     </div>
//   );
// };

// export default Footer;

// ===== FILE: src/components/Footer.jsx (ĐÃ CẬP NHẬT LINK MAP) =====

import React from 'react';
import classes from './Footer.module.css';

// ✅ ĐÃ SỬA: Dùng đúng tên file "LOGO.png" trong thư mục public/images
const logoUrl = process.env.PUBLIC_URL + "/images/LOGO.png"; 

const Footer = () => {
  // ✅ ĐÃ CẬP NHẬT: URL Google Maps mới theo yêu cầu
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.0982417478554!2d106.66422177408772!3d10.796437258826248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292e79f1e72f%3A0xae118f87eef3dca1!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUw6BpIG5ndXnDqm4gdsOgIE3DtGkgdHLGsOG7nW5nIFRQLkhDTQ!5e1!3m2!1svi!2sus!4v1764600198458!5m2!1svi!2sus";

  return (
    <div className={classes.footer}>
      <footer>
        {/* === Cột 1: Thông tin cửa hàng === */}
        <div className={classes.storeInfo}>
          {/* Hiển thị Logo */}
          <img 
            src={logoUrl} 
            alt="Boutique Logo" 
            className={classes.logo} 
            // Fallback: Nếu ảnh lỗi thì hiện chữ BOUTIQUE
            onError={(e) => {
                e.target.style.display='none';
                e.target.parentNode.insertAdjacentHTML('afterbegin', '<h2 style="color:white; margin-bottom:1rem">BOUTIQUE</h2>');
            }}
          />
          
          <p><strong>Hotline:</strong> <a href="tel:0938707070">0979.342.659</a></p>
          <p><strong>Phản Ánh & Khiếu Nại:</strong> <a href="tel:0852222222">0979.343.659</a></p>
          <p><strong>CN1:</strong> Trường Đại học Tài nguyên và Môi trường TP.HCM</p>
          <p><strong>Email:</strong> <a href="mailto:trucnguyenthanh2611@gmail.com">trucnguyenthanh2611@gmail.com</a></p>
          <p><strong>Website:</strong> <a href="/" target="_blank" rel="noopener noreferrer">boutique.com.vn</a></p>
        </div>

        {/* === Cột 2: Hỗ trợ khách hàng === */}
        <div className={classes.customerSupport}>
          <h2>Hỗ trợ khách hàng</h2>
          <nav>
            <p><a href='/#'>Mua hàng trả góp</a></p>
            <p><a href='/#'>Chính sách bảo hành</a></p>
            <p><a href='/#'>Chính sách giao hàng</a></p>
            <p><a href='/#'>Chính sách đổi trả hàng</a></p>
            <p><a href='/#'>Chính sách mua và bán ra</a></p>
            <p><a href='/#'>Liên hệ</a></p>
          </nav>
        </div>

        {/* === Cột 3: Bản đồ === */}
        <div className={classes.mapContainer}>
          <h2>Địa chỉ cửa hàng</h2>
          <div className={classes.mapEmbed}>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Địa chỉ cửa hàng"
            ></iframe>
          </div>
        </div>

      </footer>
      
      <div className={classes.copyright}>
        Thiết Kế Website Bởi Thanh Trúc - 0979.342.659
      </div>
    </div>
  );
};

export default Footer;