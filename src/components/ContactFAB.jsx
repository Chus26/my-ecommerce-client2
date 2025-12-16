import React, { useState, useEffect } from 'react';
import classes from './ContactFAB.module.css';

// --- Icons ---
const ZaloIcon = '/images/zalo.png';
const PhoneIcon = '/images/phone.png';
const MessengerIcon = '/images/messenger.png';
const ChatBubbleIcon = '/images/chat-bubble.png'; // Icon người tư vấn
// ---

// --- Component Icon Trạng Thái ---
const StatusIndicator = ({ isOnline }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={classes.statusIndicator}
  >
    <circle
      cx="6"
      cy="6"
      r="5"
      fill={isOnline ? 'currentColor' : '#6c757d'}
      stroke="rgba(0,0,0,0.1)"
      strokeWidth="1"
    />
  </svg>
);

const ContactFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // --- THÔNG TIN LIÊN HỆ VÀ GIỜ HOẠT ĐỘNG ---
  const zaloNumber = '0979342659';
  const phoneNumber = '0979342659';
  const messengerUsername = '61584419708848'; // Thay thế bằng username hoặc Page ID Facebook
  const startHour = 9;
  const endHour = 22;
  // ------------------------------------------

  const checkOnlineStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const online = currentHour >= startHour && currentHour < endHour;
    setIsOnline(online);
  };

  useEffect(() => {
    checkOnlineStatus();
    const intervalId = setInterval(checkOnlineStatus, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={classes.fabContainer}>
      <div className={`${classes.options} ${isOpen ? classes.optionsOpen : ''}`}>
        
        {/* --- ZALO: THÊM DÒNG "HỖ TRỢ GIẢI QUYẾT ĐƠN HÀNG" --- */}
        <a
          href={`https://zalo.me/${zaloNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.optionItem}
          title="Chat Zalo - Hỗ trợ đơn hàng"
        >
          <span className={`${classes.iconWrapper} ${classes.zaloBg}`}>
            <img src={ZaloIcon} alt="Zalo" className={classes.icon} />
          </span>
          <span className={classes.tooltip}>
            {/* Hiển thị: Chat Zalo: Hỗ trợ giải quyết đơn hàng (Giờ) */}
            Chat Zalo: Hỗ trợ giải quyết đơn hàng
            <span className={classes.hours}> (09:00 – 22:00)</span>
          </span>
        </a>

        {/* --- PHONE: GIỮ NGUYÊN --- */}
        <a
          href={`tel:${phoneNumber}`}
          className={classes.optionItem}
          title={`Gọi ${phoneNumber}`}
        >
          <span className={`${classes.iconWrapper} ${classes.phoneBg}`}>
            <img src={PhoneIcon} alt="Phone" className={classes.icon} />
          </span>
          <span className={classes.tooltip}>
            {phoneNumber} <span className={classes.hours}>(09:00 – 22:00)</span>
          </span>
        </a>

        {/* --- MESSENGER: THÊM DÒNG "TƯ VẤN SẢN PHẨM" --- */}
        <a
          href={`https://m.me/${messengerUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.optionItem}
          title="Messenger - Tư vấn sản phẩm"
        >
          <span className={`${classes.iconWrapper} ${classes.messengerBg}`}>
            <img src={MessengerIcon} alt="Messenger" className={classes.icon} />
          </span>
          <span className={classes.tooltip}>
            {/* Hiển thị: Messenger: Tư vấn sản phẩm (Giờ) */}
            Messenger: Tư vấn sản phẩm
            <span className={classes.hours}> (09:00 – 22:00)</span>
          </span>
        </a>

      </div>

      <button
        className={`${classes.fabButton} ${isOpen ? classes.open : ''} ${
          isOnline ? classes.online : classes.offline
        }`}
        onClick={toggleOpen}
        aria-label={isOpen ? 'Đóng liên hệ' : 'Mở liên hệ'}
        title={isOpen ? 'Đóng' : isOnline ? 'Đang hoạt động' : 'Ngoài giờ làm việc'}
      >
        <span className={`${classes.iconContainer} ${isOpen ? classes.iconClose : classes.iconOpen}`}>
          <img src={ChatBubbleIcon} alt="Chat" className={classes.plusIcon} />
          <svg
            className={classes.closeIconSvg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 
              5 17.59 6.41 19 12 13.41 17.59 19 19 
              17.59 13.41 12z" />
          </svg>
        </span>
        <StatusIndicator isOnline={isOnline} />
      </button>
    </div>
  );
};

export default ContactFAB;