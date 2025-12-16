// import React, { useEffect, useState } from "react";
// import classes from "./AccessoryRecommendations.module.css";
// import { getAiAccessories } from "../services/recommendationServices";
// import { Link } from "react-router-dom";
// import useTypewriter from "../hooks/useTypewriter"; 

// const botGif = process.env.PUBLIC_URL + "/images/bot-thinking.gif";

// // Text "loading"
// const LOADING_MESSAGE = "TỚ LÀ BOT AI ĐÂY!! ĐỢI TỚ VÀI GIÂY TÌM KIẾM SẢN PHẨM TỐT CHO CẬU NHA...";
// // Text mặc định nếu API không trả về câu chào riêng
// const DEFAULT_SUBTITLE = "BÉ AI 🤖 đã tìm vài món phụ kiện hay ho, có thể bạn sẽ thích đó:";
// const TYPING_SPEED = 40; 

// export default function AccessoryRecommendations({
//   title = "BÉ BOT AI",
// }) {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // State lưu câu chào động nhận từ Backend
//   const [dynamicSubtitle, setDynamicSubtitle] = useState("");

//   // Hook cho text loading
//   const [loadingText, isLoadingDone] = useTypewriter(
//     LOADING_MESSAGE,
//     TYPING_SPEED
//   );
  
//   // Hook cho text subtitle (Chỉ chạy khi đã load xong và có text)
//   const [subtitleText, isSubtitleDone] = useTypewriter(
//     !loading && dynamicSubtitle ? dynamicSubtitle : "",
//     TYPING_SPEED
//   );

//   useEffect(() => {
//     let isMounted = true;
//     const fetchAccessories = async () => {
//       try {
//         const data = await getAiAccessories(); 
        
//         if (isMounted) {
//             // Kiểm tra và set dữ liệu
//             if (data?.recommendations && data.recommendations.length > 0) {
//                 setItems(data.recommendations);
//                 // CẬP NHẬT: Lấy contextTitle từ API, nếu không có thì dùng câu mặc định
//                 setDynamicSubtitle(data.contextTitle || DEFAULT_SUBTITLE);
//             } else {
//                 setItems([]);
//             }
//         }
//       } catch (error) {
//         console.error("Error fetching accessories:", error);
//         if (isMounted) setItems([]);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };
//     fetchAccessories();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const formatPrice = (price) =>
//     new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(price || 0);

//   // --- TRẠNG THÁI LOADING ---
//   if (loading) {
//     return (
//       <div className={classes.recContainer}>
//         <div className={classes.botWrapper}>
//           <img
//             src={botGif}
//             alt="Bot Gợi Ý"
//             className={`${classes.botImage} ${classes.botThinking}`}
//           />
//         </div>
//         <div className={classes.bubbleWrapper}>
//           <div className={`${classes.bubble} ${classes.loadingBubble}`}>
//             <div
//               className={`${classes.skeleton} ${
//                 !isLoadingDone ? classes.typingEffect : "" 
//               }`}
//             >
//               {loadingText}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!items || items.length === 0) return null;

//   // --- TRẠNG THÁI LOADED ---
//   return (
//     <div className={classes.recContainer}>
//       <div className={classes.botWrapper}>
//         <img src={botGif} alt="Bot Gợi Ý" className={classes.botImage} />
//       </div>

//       <div className={classes.bubbleWrapper}>
//         <div className={classes.bubble}>
//           <h3 className={classes.bubbleTitle}>{title}</h3>
          
//           {/* Hiển thị câu chào động (Dynamic Subtitle) */}
//           <p
//             className={`${classes.bubbleSub} ${
//               !isSubtitleDone ? classes.typingEffect : "" 
//             }`}
//           >
//             {subtitleText} 
//           </p>
          
//           {/* Chỉ hiện sản phẩm KHI bot đã gõ xong */}
//           {isSubtitleDone && (
//             <div className={classes.grid}>
//               {items.map((it) => (
//                 <Link key={it.id} className={classes.card} to={`/detail/${it.id}`}>
//                   {it.img && (
//                     <img
//                       src={it.img}
//                       alt={it.name}
//                       className={classes.cardImage}
//                     />
//                   )}
//                   <div className={classes.body}>
//                     <div className={classes.name} title={it.name}>
//                       {it.name}
//                     </div>
//                     {it.reason && <p className={classes.reason}>{it.reason}</p>}
//                     {it.advice && <p className={classes.advice}>{it.advice}</p>}
//                     <div className={classes.meta}>
//                       <span className={classes.price}>
//                         {formatPrice(it.price)}
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import classes from "./AccessoryRecommendations.module.css";
import { getAiAccessories } from "../services/recommendationServices";
import { Link } from "react-router-dom";
import useTypewriter from "../hooks/useTypewriter"; 

const botGif = process.env.PUBLIC_URL + "/images/bot-thinking.gif";

const LOADING_MESSAGE = "TỚ LÀ BOT AI ĐÂY!! ĐỢI TỚ VÀI GIÂY TÌM KIẾM SẢN PHẨM TỐT CHO CẬU NHA...";
const DEFAULT_SUBTITLE = "BÉ AI 🤖 đang đợi cậu mua hàng để trổ tài gợi ý đó!";
const TYPING_SPEED = 40; 

export default function AccessoryRecommendations({ title = "BÉ BOT AI" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dynamicSubtitle, setDynamicSubtitle] = useState("");

  const [loadingText, isLoadingDone] = useTypewriter(LOADING_MESSAGE, TYPING_SPEED);
  const [subtitleText, isSubtitleDone] = useTypewriter(
    !loading && dynamicSubtitle ? dynamicSubtitle : "", 
    TYPING_SPEED
  );

  useEffect(() => {
    let isMounted = true;
    const fetchAccessories = async () => {
      try {
        const data = await getAiAccessories(); 
        if (isMounted) {
             setItems(data.recommendations || []); 
             setDynamicSubtitle(data.contextTitle || DEFAULT_SUBTITLE);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) setItems([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAccessories();
    return () => { isMounted = false; };
  }, []);

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price || 0);

  if (loading) {
    return (
      <div className={classes.recContainer}>
        <div className={classes.botWrapper}>
          <img src={botGif} alt="Bot Gợi Ý" className={`${classes.botImage} ${classes.botThinking}`} />
        </div>
        <div className={classes.bubbleWrapper}>
          <div className={`${classes.bubble} ${classes.loadingBubble}`}>
            <div className={`${classes.skeleton} ${!isLoadingDone ? classes.typingEffect : ""}`}>
              {loadingText}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.recContainer}>
      <div className={classes.botWrapper}>
        <img src={botGif} alt="Bot Gợi Ý" className={classes.botImage} />
      </div>
      <div className={classes.bubbleWrapper}>
        <div className={classes.bubble}>
          <h3 className={classes.bubbleTitle}>{title}</h3>
          
          <p className={`${classes.bubbleSub} ${!isSubtitleDone ? classes.typingEffect : ""}`}>
            {subtitleText} 
          </p>
          
          {isSubtitleDone && items.length > 0 && (
            <div className={classes.grid}>
              {items.map((it) => (
                <Link key={it.id} className={classes.card} to={`/detail/${it.id}`}>
                  {it.img && <img src={it.img} alt={it.name} className={classes.cardImage} />}
                  <div className={classes.body}>
                    <div className={classes.name} title={it.name}>{it.name}</div>
                    {it.reason && <p className={classes.reason}>{it.reason}</p>}
                    {it.advice && <p className={classes.advice}>{it.advice}</p>}
                    <div className={classes.meta}>
                      <span className={classes.price}>{formatPrice(it.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {isSubtitleDone && items.length === 0 && (
             <div style={{textAlign: 'center', marginTop: '1rem'}}>
                <Link to="/shop" style={{
                    display: 'inline-block', 
                    padding: '0.8rem 1.5rem', 
                    background: '#0d6efd', 
                    color: 'white', 
                    borderRadius: '20px', 
                    textDecoration: 'none', 
                    fontWeight: '600'
                }}>
                    Đi dạo cửa hàng ngay 🛍️
                </Link>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}