import React from "react";
import { Link } from "react-router-dom";
import classes from "./ThankYouPage.module.css";

const botImage = process.env.PUBLIC_URL + "/images/bot.png";

const ThankYouPage = () => {
  return (
    <div className={classes.thankYouContainer}>
      <div className={classes.botContainer}>
        <img
          src={botImage}
          alt="Cảm ơn!"
          className={classes.botImage}
        />
        <span className={classes.botThought}>Yeah!</span>
      </div>

      <h1>Đặt hàng thành công!</h1>
      <p>
        Cảm ơn bạn đã mua sắm tại Boutique. Chúng tôi đã nhận được đơn hàng của
        bạn và sẽ xử lý sớm nhất có thể.
      </p>
      <p>Bạn có thể theo dõi trạng thái đơn hàng trong mục "Lịch sử đơn hàng".</p>
      <div className={classes.actions}>
        <Link to="/orders" className={classes.button}>
          Xem Lịch Sử Đơn Hàng
        </Link>
        <Link
          to="/shop"
          className={`${classes.button} ${classes.secondary}`}
        >
          Tiếp Tục Mua Sắm
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
