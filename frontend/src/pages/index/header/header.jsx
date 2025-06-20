import React, { useEffect, useState } from "react";
import "../../../css/index/header.css";
import "../../../css/index/index.css";
import { useAuth } from "../../Private/Auth";
import { getUserProfile } from "../../../lib/Axiosintance";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  const [error, setError] = useState(null);
  const { logout } = useAuth(); // Lấy hàm logout từ context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
      } catch (err) {
        setError("Không thể tải thông tin người dùng");
      }
    };

    fetchData();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    logout(); // Gọi hàm logout
    navigate("/login"); // Điều hướng người dùng về trang đăng nhập
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container header">
        <div className="logo">
          {" "}
          <a className="navbar-brand" href="/">
            <img src="/upload/logo.png" />
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
              <a className="nav-link active" href="/">
                Trang chủ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about_us">
                Về chúng tôi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/news">
                Tin tức{" "}
              </a>
            </li>

            <li className="nav-item" onClick={scrollToContact}>
              <a className="nav-link" href="#">
                Liên Hệ
              </a>
            </li>
          </ul>

          <div className="login ms-auto">
            {user ? (
              <div className="header-right">
                <div className="profile-box ml-15">
                  <button
                    className="dropdown-toggle bg-transparent border-0"
                    type="button"
                    id="profile"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="profile-info">
                      <div className="info">
                        <div className="image">
                          <img
                            src={
                              userData && userData.image
                                ? `/img/${userData.image}` // Sử dụng ảnh từ database nếu tồn tại
                                : "../upload/avatar-4.png" // Ảnh mặc định
                            }
                            alt=""
                          />
                        </div>
                        <div className="info-user-header">
                          <h6
                            style={{ margin: "0px" }}
                            className="text-start fw-500"
                          >
                            {" "}
                            {userData ? userData.name : "đang tải"}
                          </h6>
                          <p>Xin chào bạn</p>
                        </div>
                      </div>
                    </div>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profile"
                  >
                    <li className="divider"></li>
                    <li>
                      <a href="/user">
                        <i className="lni lni-user"></i>
                        Thông tin
                      </a>
                    </li>
                    <li>
                      <a href="#0">
                        <i className="lni lni-alarm"></i>
                        Thông báo
                      </a>
                    </li>

                    <li className="divider"></li>
                    <li>
                      <a href="#" onclick="" onClick={handleLogout}>
                        <i className="lni lni-exit"></i>
                        Đăng xuất
                      </a>
                      <form
                        className="d-none"
                        id="logout-form"
                        action="{{ route('logout') }}"
                        method="POST"
                      ></form>
                    </li>
                  </ul>
                </div>
              </div>
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
