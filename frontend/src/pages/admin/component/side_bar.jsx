import React from "react";
import "../../../css/admin/css/bootstrap.min.css";
import "../../../css/admin/css/main.css";
import "../../../css/admin/css/fullcalendar.css";
import "../../../css/admin/css/lineicons.css";
import "../../../css/admin/css/materialdesignicons.min.css";
import { Link } from "react-router-dom";
import "../../../css/admin/css/admin.css";

function Side_bar() {
  return (
    <div>
      <aside className="sidebar-nav-wrapper" style={{ overflow: "hidden" }}>
        <div className="navbar-logo">
          <a href="/">
            <img src="/upload/logo.png" width="150px" alt="logo" />
          </a>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <a href="/admin/products">
                <span className="icon">
                  <i className="fa-solid fa-car"></i>{" "}
                </span>
                <span className="text">Xe</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/booking">
                <span className="icon">
                  <i className="fa-solid fa-store"></i>
                </span>
                <span className="text">Đặt xe</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/feedbacks">
                <span className="icon">
                  <i className="fa-regular fa-comment"></i>
                </span>
                <span className="text">Phản hồi</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/favorite">
                <span className="icon">
                  <i className="fa-regular fa-star"></i>{" "}
                </span>
                <span className="text">Yêu thích</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/license">
                <span className="icon">
                  <i className="fa-solid fa-table-list"></i>
                </span>
                <span className="text">GPLX</span>
              </a>
            </li>{" "}
            <li className="nav-item">
              <a href="/admin/voucher">
                <span className="icon">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <span className="text">Mã giảm giá</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/user">
                <span className="icon">
                  <i className="fa-solid fa-users-gear"></i>
                </span>
                <span className="text">Người dùng</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="overlay"></div>
    </div>
  );
}

export default Side_bar;
