import React from "react";
import "../../../css/header.css";
import "../../../css/index.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container header">
        <div className="logo">
          {" "}
          <a className="navbar-brand" href="/">
            <img src="/upload/Black and Grey Illustrated Car Rental Service Logo 1.png" />
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Trang chủ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Giới Thiệu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Thuê Xe
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dịch Vụ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Liên Hệ
              </a>
            </li>
          </ul>

          <div className="login ms-auto">
            <ul className="signup-icon mb-2 mb-lg-0">
              <a className="nav-link active" href="/dangnhap">
                Đăng Ký
              </a>
            </ul>
            <ul className="signin-icon mb-2 mb-lg-0">
              <a className="nav-link active" href="/dangnhap">
                Đăng Nhập
              </a>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
