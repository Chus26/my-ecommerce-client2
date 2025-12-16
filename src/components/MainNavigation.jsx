// // ===== THAY THẾ TOÀN BỘ FILE: src/components/MainNavigation.jsx =====

// import React, { useState } from "react"; // ✅ BƯỚC 1: Import thêm useState
// import classes from "./MainNavigation.module.css";
// import { NavLink, Link, useFetcher, useRouteLoaderData } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "../store/auth";

// const botImage = process.env.PUBLIC_URL + "/images/bot.png";

// const MainNavigation = () => {
//   const fetcher = useFetcher();
//   const dispatch = useDispatch();
//   const { isAuthenticated, userName } = useSelector((state) => state.auth);
//   const loaderData = useRouteLoaderData("products");
//   const categories = loaderData?.categories || [];

//   // ✅ BƯỚC 2: Thêm state để quản lý menu mobile
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenuHandler = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const closeMenuHandler = () => {
//     setMenuOpen(false);
//   };

//   const logoutHandler = () => {
//     fetcher.submit(null, { action: "/logout", method: "post" });
//     dispatch(authActions.onLogout());
//     closeMenuHandler(); // Đóng menu sau khi logout
//   };

//   const navLinkClasses = ({ isActive }) =>
//     isActive ? `${classes.navLink} ${classes.active}` : classes.navLink;

//   const shopLinkClasses = ({ isActive }) =>
//     isActive ? `${classes.navLink} ${classes.active}` : classes.navLink;

//   return (
//     <header className={classes.header}>
//       <nav className={classes.mainNav}>
//         <Link to="/" className={classes.logo} onClick={closeMenuHandler}>
//           BOUTIQUE
//         </Link>

//         {/* ============================================= */}
//         {/* ===== PHẦN 1: NAV CHO DESKTOP (Bị ẩn trên mobile) ===== */}
//         {/* ============================================= */}
//         <div className={classes.desktopNav}>
//           <ul className={classes.navList}>
//             <li>
//               <NavLink to="/" className={navLinkClasses} end>
//                 Trang chủ
//               </NavLink>
//             </li>
//             <li className={classes.dropdown}>
//               <NavLink to="/shop?mode=all&page=1" className={shopLinkClasses}>
//                 Cửa hàng{" "}
//                 <i className={`fa-solid fa-caret-down ${classes.caret}`}></i>
//               </NavLink>
//               <ul className={classes.dropdownMenu}>
//                 <li>
//                   <NavLink to="/shop?mode=all&page=1">Tất cả sản phẩm</NavLink>
//                 </li>
//                 {categories.map((cat) => (
//                   <li key={cat}>
//                     <NavLink to={`/shop?mode=${cat.toLowerCase()}`}>
//                       {cat}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           </ul>

//           <div className={classes.botWelcome}>
//             <img src={botImage} alt="Trợ lý ảo" className={classes.botImage} />
//             <span className={classes.botText}>CHÀO MỪNG BẠN ĐẾN BOUTIQUE!</span>
//           </div>

//           <div className={classes.rightNav}>
//             <NavLink
//               to="/cart"
//               className={`${navLinkClasses} ${classes.iconLink}`}
//             >
//               <i className="fa-solid fa-cart-shopping"></i>
//               <span>Giỏ hàng</span>
//             </NavLink>

//             {!isAuthenticated && (
//               <NavLink to="/login" className={navLinkClasses}>
//                 <i className="fa-solid fa-user"></i>
//                 <span>Đăng nhập</span>
//               </NavLink>
//             )}

//             {isAuthenticated && (
//               <div className={`${classes.dropdown} ${classes.userMenu}`}>
//                 <a
//                   href="#user"
//                   className={classes.navLink}
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   <i className="fa-solid fa-user"></i>
//                   <span>{userName}</span>
//                   <i className={`fa-solid fa-caret-down ${classes.caret}`}></i>
//                 </a>
//                 <ul className={classes.dropdownMenu}>
//                   <li>
//                     <NavLink to="/orders">Lịch sử đơn hàng</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/profile">Chỉnh sửa thông tin</NavLink>
//                   </li>
//                   <li>
//                     <hr className={classes.divider} />
//                   </li>
//                   <li>
//                     <button
//                       onClick={logoutHandler}
//                       className={classes.logoutButton}
//                     >
//                       <i className="fa-solid fa-right-from-bracket"></i> Đăng
//                       xuất
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ================================================== */}
//         {/* ===== PHẦN 2: NAV CHO MOBILE (Hiện khi co nhỏ) ===== */}
//         {/* ================================================== */}
//         <div className={classes.mobileNav}>
//           {/* Nút 3 gạch (Hamburger) */}
//           <button
//             className={classes.mobileNavToggle}
//             onClick={toggleMenuHandler}
//             aria-label="Toggle navigation"
//           >
//             {/* Chuyển icon X và 3 gạch */}
//             {menuOpen ? (
//               <i className="fa-solid fa-xmark"></i>
//             ) : (
//               <i className="fa-solid fa-bars"></i>
//             )}
//           </button>

//           {/* Lớp nền mờ (Backdrop) */}
//           {menuOpen && (
//             <div className={classes.backdrop} onClick={closeMenuHandler}></div>
//           )}

//           {/* Menu trượt ra */}
//           <div
//             className={`${classes.mobileNavMenu} ${
//               menuOpen ? classes.open : ""
//             }`}
//           >
//             {/* Thông tin user (nếu đã đăng nhập) */}
//             {isAuthenticated && (
//               <div className={classes.mobileUserInfo}>
//                 <i className="fa-solid fa-circle-user"></i>
//                 <span>Xin chào, {userName}</span>
//               </div>
//             )}
            
//             {/* Sao chép các link vào đây */}
//             <ul>
//               <li>
//                 <NavLink to="/" onClick={closeMenuHandler} end>
//                   <i className="fa-solid fa-house"></i> Trang chủ
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/shop?mode=all&page=1" onClick={closeMenuHandler}>
//                   <i className="fa-solid fa-shop"></i> Cửa hàng
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/cart" onClick={closeMenuHandler}>
//                   <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
//                 </NavLink>
//               </li>

//               <hr className={classes.divider} />

//               {/* Logic User */}
//               {!isAuthenticated && (
//                 <li>
//                   <NavLink to="/login" onClick={closeMenuHandler}>
//                     <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
//                   </NavLink>
//                 </li>
//               )}

//               {isAuthenticated && (
//                 <>
//                   <li>
//                     <NavLink to="/orders" onClick={closeMenuHandler}>
//                       <i className="fa-solid fa-receipt"></i> Lịch sử đơn hàng
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/profile" onClick={closeMenuHandler}>
//                        <i className="fa-solid fa-user-pen"></i> Chỉnh sửa thông tin
//                     </NavLink>
//                   </li>
//                   <li>
//                     <button
//                       onClick={logoutHandler}
//                       className={classes.logoutButtonMobile}
//                     >
//                       <i className="fa-solid fa-right-from-bracket"></i> Đăng
//                       xuất
//                     </button>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default MainNavigation;

// ===== THAY THẾ TOÀN BỘ FILE: src/components/MainNavigation.jsx =====

import React, { useState } from "react";
import classes from "./MainNavigation.module.css";
import { NavLink, Link, useFetcher, useRouteLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";

// Đường dẫn ảnh (React sẽ tự tìm trong public folder)
const botImage = process.env.PUBLIC_URL + "/images/bot.png";
const logoImage = process.env.PUBLIC_URL + "/images/LOGO.png"; // 👈 THÊM LOGO

const MainNavigation = () => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const { isAuthenticated, userName } = useSelector((state) => state.auth);
  const loaderData = useRouteLoaderData("products");
  const categories = loaderData?.categories || [];

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenuHandler = () => {
    setMenuOpen(false);
  };

  const logoutHandler = () => {
    fetcher.submit(null, { action: "/logout", method: "post" });
    dispatch(authActions.onLogout());
    closeMenuHandler();
  };

  const navLinkClasses = ({ isActive }) =>
    isActive ? `${classes.navLink} ${classes.active}` : classes.navLink;

  const shopLinkClasses = ({ isActive }) =>
    isActive ? `${classes.navLink} ${classes.active}` : classes.navLink;

  return (
    <header className={classes.header}>
      <nav className={classes.mainNav}>
        
        {/* LOGO CHÍNH (Đã thêm ảnh) */}
        <Link to="/" className={classes.logoLink} onClick={closeMenuHandler}>
           <img src={logoImage} alt="Logo" className={classes.logoImg} /> {/* 👈 ẢNH LOGO */}
           <span className={classes.logoText}>BOUTIQUE</span>
        </Link>

        {/* ... (Các phần còn lại giữ nguyên) ... */}
        {/* ============================================= */}
        {/* ===== PHẦN 1: NAV CHO DESKTOP (Bị ẩn trên mobile) ===== */}
        {/* ============================================= */}
        <div className={classes.desktopNav}>
          <ul className={classes.navList}>
            <li>
              <NavLink to="/" className={navLinkClasses} end>
                Trang chủ
              </NavLink>
            </li>
            <li className={classes.dropdown}>
              <NavLink to="/shop?mode=all&page=1" className={shopLinkClasses}>
                Cửa hàng{" "}
                <i className={`fa-solid fa-caret-down ${classes.caret}`}></i>
              </NavLink>
              <ul className={classes.dropdownMenu}>
                <li>
                  <NavLink to="/shop?mode=all&page=1">Tất cả sản phẩm</NavLink>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <NavLink to={`/shop?mode=${cat.toLowerCase()}`}>
                      {cat}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className={classes.botWelcome}>
            <img src={botImage} alt="Trợ lý ảo" className={classes.botImage} />
            <span className={classes.botText}>CHÀO MỪNG BẠN ĐẾN BOUTIQUE!</span>
          </div>

          <div className={classes.rightNav}>
            <NavLink
              to="/cart"
              className={`${navLinkClasses} ${classes.iconLink}`}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Giỏ hàng</span>
            </NavLink>

            {!isAuthenticated && (
              <NavLink to="/login" className={navLinkClasses}>
                <i className="fa-solid fa-user"></i>
                <span>Đăng nhập</span>
              </NavLink>
            )}

            {isAuthenticated && (
              <div className={`${classes.dropdown} ${classes.userMenu}`}>
                <a
                  href="#user"
                  className={classes.navLink}
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa-solid fa-user"></i>
                  <span>{userName}</span>
                  <i className={`fa-solid fa-caret-down ${classes.caret}`}></i>
                </a>
                <ul className={classes.dropdownMenu}>
                  <li>
                    <NavLink to="/orders">Lịch sử đơn hàng</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">Chỉnh sửa thông tin</NavLink>
                  </li>
                  <li>
                    <hr className={classes.divider} />
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className={classes.logoutButton}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i> Đăng
                      xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ================================================== */}
        {/* ===== PHẦN 2: NAV CHO MOBILE (Hiện khi co nhỏ) ===== */}
        {/* ================================================== */}
        <div className={classes.mobileNav}>
          {/* Nút 3 gạch (Hamburger) */}
          <button
            className={classes.mobileNavToggle}
            onClick={toggleMenuHandler}
            aria-label="Toggle navigation"
          >
            {/* Chuyển icon X và 3 gạch */}
            {menuOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>

          {/* Lớp nền mờ (Backdrop) */}
          {menuOpen && (
            <div className={classes.backdrop} onClick={closeMenuHandler}></div>
          )}

          {/* Menu trượt ra */}
          <div
            className={`${classes.mobileNavMenu} ${
              menuOpen ? classes.open : ""
            }`}
          >
            {/* Thông tin user (nếu đã đăng nhập) */}
            {isAuthenticated && (
              <div className={classes.mobileUserInfo}>
                <i className="fa-solid fa-circle-user"></i>
                <span>Xin chào, {userName}</span>
              </div>
            )}
            
            <ul>
              <li>
                <NavLink to="/" onClick={closeMenuHandler} end>
                  <i className="fa-solid fa-house"></i> Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop?mode=all&page=1" onClick={closeMenuHandler}>
                  <i className="fa-solid fa-shop"></i> Cửa hàng
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" onClick={closeMenuHandler}>
                  <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
                </NavLink>
              </li>

              <hr className={classes.divider} />

              {/* Logic User */}
              {!isAuthenticated && (
                <li>
                  <NavLink to="/login" onClick={closeMenuHandler}>
                    <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
                  </NavLink>
                </li>
              )}

              {isAuthenticated && (
                <>
                  <li>
                    <NavLink to="/orders" onClick={closeMenuHandler}>
                      <i className="fa-solid fa-receipt"></i> Lịch sử đơn hàng
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile" onClick={closeMenuHandler}>
                        <i className="fa-solid fa-user-pen"></i> Chỉnh sửa thông tin
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className={classes.logoutButtonMobile}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i> Đăng
                      xuất
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;