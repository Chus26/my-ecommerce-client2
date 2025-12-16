// ===== TẠO FILE MỚI: src/hooks/useTypewriter.js =====

import { useState, useEffect } from 'react';

/**
 * Custom Hook cho hiệu ứng gõ chữ (Typewriter Effect).
 * @param {string} fullText - Văn bản đầy đủ cần gõ ra.
 * @param {number} speed - Tốc độ gõ (ms) cho mỗi ký tự. (vd: 40)
 * @returns {[string, boolean]} - Trả về mảng: [textĐangGõ, đãGõXong]
 */
const useTypewriter = (fullText, speed = 50) => {
  // State chứa đoạn text đang được hiển thị (tăng dần)
  const [displayedText, setDisplayedText] = useState('');
  
  // State để biết khi nào đã gõ xong
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Reset lại mọi thứ khi 'fullText' thay đổi
    setDisplayedText('');
    setIsDone(false);

    if (!fullText) {
      setIsDone(true);
      return;
    }

    let currentIndex = 0;

    // Sử dụng setInterval để thêm 1 ký tự sau mỗi 'speed' ms
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        // Cập nhật state, lấy từ 0 đến vị trí hiện tại
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        // Khi gõ xong
        clearInterval(interval); // Dừng bộ đếm
        setIsDone(true); // Đánh dấu là đã xong
      }
    }, speed);

    // Hàm dọn dẹp (cleanup function) của useEffect
    // Rất quan trọng: Dừng interval nếu component bị unmount
    return () => clearInterval(interval);
    
  }, [fullText, speed]); // Chạy lại hiệu ứng nếu 'fullText' hoặc 'speed' thay đổi

  // Trả về đoạn text đang gõ và trạng thái đã gõ xong
  return [displayedText, isDone];
};

export default useTypewriter;