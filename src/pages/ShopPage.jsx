import React, { useState, useEffect, useMemo } from "react";
import classes from "./ShopPage.module.css";
import { Link, useSearchParams, useRouteLoaderData } from "react-router-dom";
import ProductList from "../components/ProductList";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useRouteLoaderData("products");
  const products = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const [category, setCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState(searchParams.get("sort") || "default");
  const ITEMS_PER_PAGE = 8;

  const normalize = (s = "") => s.toString().toLowerCase().replace(/\s+/g, "");
  const pageFromURL = Math.max(1, Number(searchParams.get("page") || 1));
  const [currentPage, setCurrentPage] = useState(pageFromURL);

  useEffect(() => {
    const p = Math.max(1, Number(searchParams.get("page") || 1));
    setCurrentPage(p);
  }, [searchParams]);

  useEffect(() => {
    const modeFromURL = searchParams.get("mode") || "all";
    const sortFromURL = searchParams.get("sort") || "default";
    setSearchValue(modeFromURL);
    setSortValue(sortFromURL);
    let list = [...products];

    if (modeFromURL !== "all") {
      list = list.filter((p) => p.category === modeFromURL);
    }

    if (searchText.trim()) {
      const q = normalize(searchText);
      list = list.filter((p) => normalize(p.name).includes(q));
    }

    if (sortFromURL === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortFromURL === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    setCategory(list);
  }, [products, searchParams, searchText]);

  const handleSortChange = (e) => {
    const newSortValue = e.target.value;
    setSortValue(newSortValue);
    const next = new URLSearchParams(searchParams);
    next.set("sort", newSortValue);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const totalPagesAll = Math.max(1, Math.ceil(category.length / ITEMS_PER_PAGE));
  const startIdxAll = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItemsAll = category.slice(startIdxAll, startIdxAll + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    const safe = Math.min(Math.max(1, page), totalPagesAll);
    setCurrentPage(safe);
    const next = new URLSearchParams(searchParams);
    next.set("page", String(safe));
    next.set("mode", searchValue || "all");
    next.set("sort", sortValue || "default");
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const rightClassName =
    searchValue !== "all" && category.length !== 0
      ? `${classes.right} ${classes.column}`
      : classes.right;

  const showingFrom = category.length === 0 ? 0 : startIdxAll + 1;
  const showingTo = Math.min(category.length, startIdxAll + ITEMS_PER_PAGE);

  return (
    <div className={classes.shop}>
      <div className={classes["shop-banner"]}>
        <h2>Cửa hàng</h2>
        <p>Cửa hàng</p>
      </div>

      <div className={classes.categories}>
        <div className={classes.top}>
          <div>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm tìm kiếm!"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className={classes.select}>
            <select value={sortValue} onChange={handleSortChange}>
              <option value="default">Sắp xếp mặc định</option>
              <option value="price-asc">Giá: Tăng dần</option>
              <option value="price-desc">Giá: Giảm dần</option>
            </select>
          </div>
        </div>

        <div className={classes.bottom}>
          <div className={classes.left}>
            <h3>Danh mục</h3>
            <h4>Apple</h4>
            <ul>
              <li>
                <Link
                  to="/shop?mode=all&page=1"
                  className={searchValue === "all" ? classes.active : undefined}
                >
                  Tất cả
                </Link>
              </li>
            </ul>

            <h5>Sản phẩm chính</h5>
            <ul>
              <li>
                <Link
                  to="/shop?mode=iphone"
                  className={searchValue === "iphone" ? classes.active : undefined}
                >
                  iPhone
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?mode=ipad"
                  className={searchValue === "ipad" ? classes.active : undefined}
                >
                  iPad
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?mode=macbook"
                  className={searchValue === "macbook" ? classes.active : undefined}
                >
                  MacBook
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?mode=watch"
                  className={searchValue === "watch" ? classes.active : undefined}
                >
                  Watch
                </Link>
              </li>
            </ul>

          
            

            {/* === KHỐI CODE ĐÃ ĐƯỢC CẬP NHẬT === */}
            <h5>Phụ Kiện</h5>
            <ul>
              <li>
                <Link
                  to="/shop?mode=applepencil"
                  className={searchValue === "applepencil" ? classes.active : undefined}
                >
                  Apple Pencil
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?mode=charger"
                  className={searchValue === "charger" ? classes.active : undefined}
                >
                  Củ sạc
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?mode=cable"
                  className={searchValue === "cable" ? classes.active : undefined}
                >
                  Dây sạc
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?mode=case"
                  className={searchValue === "case" ? classes.active : undefined}
                >
                  Ốp lưng
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?mode=airpod"
                  className={searchValue === "airpod" ? classes.active : undefined}
                >
                  AirPods
                </Link>
              </li>
            </ul>
            {/* === KẾT THÚC CẬP NHẬT === */}

          </div>

          <div className={rightClassName}>
            {category.length === 0 && (
              <>
                <div></div>
                <div className={classes.pagination}>
                  <span>&lt;&lt;</span>
                  <span>&gt;&gt;</span>
                  <p>Hiển thị 0 kết quả</p>
                </div>
              </>
            )}

            {/* ===== DÁN KHỐI NÀY VÀO THAY THẾ 2 KHỐI TRÊN ===== */}
    {category && category.length > 0 && (
      <>
        {/* 1. Luôn dùng 'pageItemsAll' (đã được slice chính xác ở Bước 1) */}
        <ProductList data={pageItemsAll} />
        
        {/* 2. Luôn dùng logic phân trang đầy đủ */}
        <div className={classes.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(1)}
            aria-label="Trang đầu"
          >
            &laquo;
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            aria-label="Trang trước"
          >
            &lt;
          </button>

          {Array.from({ length: totalPagesAll }, (_, i) => i + 1)
            .filter(
              (p) =>
                Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPagesAll
            )
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis-" + p);
              acc.push(p);
              return acc;
            }, [])
            .map((item) =>
              String(item).startsWith("ellipsis-") ? (
                <span key={item} className={classes["page-ellipsis"]}>
                  …
                </span>
              ) : (
                <button
                  key={item}
                  className={
                    currentPage === item ? classes["page-number"] : undefined
                  }
                  onClick={() => goToPage(item)}
                  aria-current={currentPage === item ? "page" : undefined}
                >
                  {item}
                </button>
              )
            )}

          <button
            disabled={currentPage === totalPagesAll}
            onClick={() => goToPage(currentPage + 1)}
            aria-label="Trang sau"
          >
            &gt;
          </button>
          <button
            disabled={currentPage === totalPagesAll}
            onClick={() => goToPage(totalPagesAll)}
            aria-label="Trang cuối"
          >
            &raquo;
          </button>

          <p>
            Hiển thị {showingFrom}-{showingTo} / {category.length} kết quả
          </p>
        </div>
      </>
    )}
{/* ===== KẾT THÚC THAY THẾ ===== */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
