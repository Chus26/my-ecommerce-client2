import React from 'react';

//Import css module
import classes from './Category.module.css';

//Import từ react-router-dom
import { Link } from 'react-router-dom';

const Category = () => {
  return (
    <div className={classes.category}>
      <p>Bộ sưu tập được chọn lọc kỹ lưỡng</p>
      <h3>Khám phá các danh mục của chúng tôi</h3>
      <div className={classes.container}>
        <Link to='/shop'>
          <img src='/images/product_1.png' alt='điện-thoại-thông-minh' />
        </Link>
        <Link to='/shop'>
          <img src='/images/product_2.png' alt='điện-thoại-thông-minh' />
        </Link>
      </div>
      <div className={classes.container}>
        <Link to='/shop'>
          <img src='/images/product_3.png' alt='điện-thoại-thông-minh' />
        </Link>
        <Link to='/shop'>
          <img src='/images/product_4.png' alt='điện-thoại-thông-minh' />
        </Link>
        <Link to='/shop'>
          <img src='/images/product_5.png' alt='điện-thoại-thông-minh' />
        </Link>
      </div>
    </div>
  );
};

export default Category;

