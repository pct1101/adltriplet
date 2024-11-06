import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../css/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate(); // Sử dụng navigate để chuyển hướng

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem("apiToken");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");

    // Điều hướng người dùng về trang đăng nhập
    navigate("/");
  };
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h3 className="admin-logo">Admin Panel</h3>
        <ul className="admin-menu">
          <li>
            <Link to="/admin/products">Quản lý sản phẩm</Link>
          </li>{" "}
          {/* Đường dẫn đúng đến trang Quản lý sản phẩm */}
          <li>
            <Link to="/admin/AddCar">Thêm sản phẩm</Link>
          </li>{" "}
          {/* Đường dẫn đúng đến trang Quản lý sản phẩm */}
          <li>
            <Link to="/admin/orders">Quản lý Đơn hàng</Link>
          </li>
          <li>
            <Link to="/admin/users">Quản lý Người dùng</Link>
          </li>
          <li>
            <Link to="/admin/analytics">Phân tích</Link>
          </li>
          <li>
            <Link to="/admin/settings">Cài đặt</Link>
          </li>
          <li>
            <Link to="/">Quay lại trang chủ</Link>
          </li>
        </ul>
      </div>

      <div className="admin-main-content">
        <div className="admin-header">
          <h2>Dashboard</h2>
          <div className="admin-profile">
            <span>Xin chào, Admin</span>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </div>
        <div className="admin-content">
          <h3>Chào mừng đến trang quản lý</h3>
          <p>Chọn một mục bên trái để quản lý nội dung.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
