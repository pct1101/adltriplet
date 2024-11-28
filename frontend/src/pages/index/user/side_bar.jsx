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
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
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
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.25 8.7196C21.25 9.8796 20.81 11.0496 19.92 11.9396L18.44 13.4196L12.07 19.7896C12.04 19.8196 12.03 19.8296 12 19.8496C11.97 19.8296 11.96 19.8196 11.93 19.7896L4.08 11.9396C3.19 11.0496 2.75 9.8896 2.75 8.7196C2.75 7.54961 3.19 6.37961 4.08 5.48961C5.86 3.71961 8.74 3.71961 10.52 5.48961L11.99 6.9696L13.47 5.48961C15.25 3.71961 18.12 3.71961 19.9 5.48961C20.81 6.37961 21.25 7.53961 21.25 8.7196Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
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
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.31055 14.6992L10.8105 16.1992L14.8105 12.1992"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V15.9995C21 19.9995 20 21.9995 15 21.9995H9C4 21.9995 3 19.9995 3 15.9995V9.99953C3 5.43953 4.67 4.19953 8 4.01953"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
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
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            Đổi mật khẩu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user_car"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : "link-dark"}`
            }
            onClick={() => handleMenuClick("customers")}
          >
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M8.86914 15.7207H14.7691"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6.68914 17.4603C7.83237 17.4603 8.75914 16.5335 8.75914 15.3903C8.75914 14.2471 7.83237 13.3203 6.68914 13.3203C5.54591 13.3203 4.61914 14.2471 4.61914 15.3903C4.61914 16.5335 5.54591 17.4603 6.68914 17.4603Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M17.0798 17.4603C18.223 17.4603 19.1498 16.5335 19.1498 15.3903C19.1498 14.2471 18.223 13.3203 17.0798 13.3203C15.9365 13.3203 15.0098 14.2471 15.0098 15.3903C15.0098 16.5335 15.9365 17.4603 17.0798 17.4603Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            Xe của tôi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gplx"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active1" : "link-dark"}`
            }
            onClick={() => handleMenuClick("gplx")}
          >
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M8.86914 15.7207H14.7691"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6.68914 17.4603C7.83237 17.4603 8.75914 16.5335 8.75914 15.3903C8.75914 14.2471 7.83237 13.3203 6.68914 13.3203C5.54591 13.3203 4.61914 14.2471 4.61914 15.3903C4.61914 16.5335 5.54591 17.4603 6.68914 17.4603Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M17.0798 17.4603C18.223 17.4603 19.1498 16.5335 19.1498 15.3903C19.1498 14.2471 18.223 13.3203 17.0798 13.3203C15.9365 13.3203 15.0098 14.2471 15.0098 15.3903C15.0098 16.5335 15.9365 17.4603 17.0798 17.4603Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            GPLX
          </NavLink>
        </li>
        <li>
          <a className="nav-link link-dark logout" onClick={handleLogout}>
            <div className="wrap-svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2.75005H18.12C18.9125 2.71472 19.6868 2.99475 20.2734 3.52886C20.86 4.06297 21.2111 4.80768 21.25 5.60005V18.4C21.2111 19.1924 20.86 19.9371 20.2734 20.4712C19.6868 21.0054 18.9125 21.2854 18.12 21.25H12"
                  stroke="#F04438"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15 12H2.78003"
                  stroke="#F04438"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M2.75 12L6.75 16"
                  stroke="#F04438"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M2.75 12L6.75 8"
                  stroke="#F04438"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            Đăng xuất
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Side_bar;
