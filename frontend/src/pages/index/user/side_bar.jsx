import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../css/user/user.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Private/Auth";
function Side_bar() {
  const [activeMenu, setActiveMenu] = useState("user");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  return (
    <div className="sidebar flex-column flex-shrink-0 p-3 bg-light mb-3">
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use href="#bootstrap" />
        </svg>
        <span className="fs-4">Xin chào bạn !!!</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : "link-dark"}`
            }
            onClick={() => handleMenuClick("user")}
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#home" />
            </svg>
            Tài khoản của tôi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user_favorite"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : "link-dark"}`
            }
            onClick={() => handleMenuClick("favorite")}
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#test1" />
            </svg>
            Xe Yêu thích
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : "link-dark"}`
            }
            onClick={() => handleMenuClick("orders")}
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#test2" />
            </svg>
            Đơn hàng của tôi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user_repassword"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : "link-dark"}`
            }
            onClick={() => handleMenuClick("change_password")}
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#test3" />
            </svg>
            Đổi mật khẩu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : "link-dark"}`
            }
            onClick={() => handleMenuClick("customers")}
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#test4" />
            </svg>
            Customers
          </NavLink>
        </li>
        <li>
          <a
            style={{ padding: "16px", cursor: "pointer" }}
            onClick={handleLogout}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : "link-dark"}`
            }
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#test4" />
            </svg>
            Đăng xuất
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Side_bar;
