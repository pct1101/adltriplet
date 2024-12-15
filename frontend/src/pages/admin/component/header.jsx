import React from "react";
import "../../../css/admin/css/bootstrap.min.css";
import "../../../css/admin/css/main.css";
import "../../../css/admin/css/fullcalendar.css";
import "../../../css/admin/css/lineicons.css";
import "../../../css/admin/css/materialdesignicons.min.css";
import { useAuth } from "../../Private/Auth";
import { useNavigate } from "react-router-dom";
import "../../../css/reponsive.css";

function Header() {
  const { logout } = useAuth(); // Lấy hàm logout từ context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Gọi hàm logout
    navigate("/login"); // Điều hướng người dùng về trang đăng nhập
  };
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-6">
            <div className="header-left d-flex align-items-center">
              <div className="menu-toggle-btn mr-15">
                <button
                  id="menu-toggle"
                  className="main-btn primary-btn btn-hover"
                >
                  <i className="lni lni-chevron-left me-2"></i>
                  Menu
                </button>
              </div>
              <div className="header-search d-none d-md-flex w-100">
                <form action="#">
                  <input type="text" placeholder="Search..." />
                  <button>
                    <i className="lni lni-search-alt"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-6">
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
                          src="https://n1-astg.mioto.vn/g/2024/10/04/17/aA9ESIVq66pc84S2PGAPgA.jpg"
                          alt=""
                        />
                      </div>
                      <div>
                        <h6 className="text-start fw-500">{userRole}</h6>
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
                    <a href="#0">
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
                  <li>
                    <a href="#0">
                      <i className="lni lni-inbox"></i>
                      Tin nhắn
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="lni lni-cog"></i> Cài đặt
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
