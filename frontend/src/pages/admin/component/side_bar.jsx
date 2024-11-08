import React from "react";
import "../../../css/admin/css/bootstrap.min.css";
import "../../../css/admin/css/main.css";
import "../../../css/admin/css/fullcalendar.css";
import "../../../css/admin/css/lineicons.css";
import "../../../css/admin/css/materialdesignicons.min.css";
import { Link } from "react-router-dom";
import "../../../css/home.css";

function Side_bar() {
  return (
    <div>
      <aside className="sidebar-nav-wrapper" style={{ overflow: "hidden" }}>
        <div className="navbar-logo">
          <a href="/">
            <img
              src="/upload/Black and Grey Illustrated Car Rental Service Logo 1.png"
              width="150px"
              alt="logo"
            />
          </a>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <Link to="/admin/settings">
                <span className="icon">
                  <i className="fa-solid fa-cogs"></i>
                </span>
                <span className="text">Settings</span>
              </Link>
            </li>
            <li className="nav-item">
              <a href="/admin/products">
                <span className="icon">
                  <i className="fa-solid fa-store"></i>
                </span>
                <span className="text">Sản phẩm</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/booking">
                <span className="icon">
                  <i className="fa-solid fa-store"></i>
                </span>
                <span className="text">Booking</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/feedbacks">
                <span className="icon">
                  <i className="fa-solid fa-table-list"></i>
                </span>
                <span className="text">feedbacks</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/order">
                <span className="icon">
                  <i className="fa-solid fa-box-open"></i>
                </span>
                <span className="text">Đơn hàng</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/user">
                <span className="icon">
                  <i className="fa-solid fa-users-gear"></i>
                </span>
                <span className="text">Tài khoản</span>
              </a>
            </li>
            <span className="divider">
              <hr />
            </span>
            <li className="nav-item nav-item-has-children">
              <a
                href="#0"
                className="collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#ddmenu_2"
                aria-controls="ddmenu_2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon">
                  <i className="fa-solid fa-dumpster"></i>
                </span>
                <span className="text">Thùng rác</span>
              </a>
              <ul id="ddmenu_2" className="collapse dropdown-nav">
                <li>
                  <a href="/admin/product/trashed">
                    <i className="fa-solid fa-boxes-packing"></i>
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="/admin/account/trashed">
                    <i className="fa-solid fa-user-xmark"></i>
                    Tài khoản
                  </a>
                </li>
              </ul>
            </li>
            <span className="divider">
              <hr />
            </span>
          </ul>
        </nav>
      </aside>
      <div className="overlay"></div>
    </div>
  );
}

export default Side_bar;
