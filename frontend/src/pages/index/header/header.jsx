import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/header.css";
import "../../../css/index.css";

function Header() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
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
              <a className="nav-link" href="/about_us">
                Về chúng tôi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Thuê Xe
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                Tin tức{" "}
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
            {authToken ? (
              <>
                <div className="tb" style={{ margin: "10px 15px 1px 1px" }}>
                  {" "}
                  <img className="scale-img" src="/upload/tb.png" />
                </div>
                <a
                  href="/user"
                  className="dropdown-profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="avatar avatar--s">
                    <img
                      loading="lazy"
                      src="https://n1-astg.mioto.vn/g/2024/10/04/17/aA9ESIVq66pc84S2PGAPgA.jpg"
                      alt="Thịnh Hồ"
                    />
                  </div>
                  <ul className="nav-item" style={{ marginBottom: "0" }}>
                    <span className="name ">{userRole}</span>
                  </ul>
                  <div className="wrap-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M16.8998 9.20039C16.4998 8.80039 15.8998 8.80039 15.4998 9.20039L11.9998 12.7004L8.4998 9.20039C8.0998 8.80039 7.4998 8.80039 7.0998 9.20039C6.6998 9.60039 6.6998 10.2004 7.0998 10.6004L11.2998 14.8004C11.4998 15.0004 11.6998 15.1004 11.9998 15.1004C12.2998 15.1004 12.4998 15.0004 12.6998 14.8004L16.8998 10.6004C17.2998 10.2004 17.2998 9.60039 16.8998 9.20039Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                </a>
              </>
            ) : (
              <>
                <ul className="signup-icon mb-2 mb-lg-0">
                  <a className="nav-link active" href="/SignUp">
                    Đăng Ký
                  </a>
                </ul>
                <ul className="signin-icon mb-2 mb-lg-0">
                  <a className="nav-link active" href="/Login">
                    Đăng Nhập
                  </a>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
