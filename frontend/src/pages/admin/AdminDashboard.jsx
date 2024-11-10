import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../css/admin/css/admin.css";
import { useAuth } from "../Private/Auth";
import Footer from "../admin/component/footer";
import Header from "../admin/component/header";
import Side_bar from "./component/side_bar";
//css
import "../../css/admin/css/bootstrap.min.css";
import "../../css/admin/css/main.css";
import "../../css/admin/css/fullcalendar.css";
import "../../css/admin/css/lineicons.css";
import "../../css/admin/css/materialdesignicons.min.css";
// import live
import AdminProducts from "./ControllerProduct/products";

const AdminDashboard = () => {
  const { logout } = useAuth(); // Lấy hàm logout từ context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Gọi hàm logout
    navigate("/login"); // Điều hướng người dùng về trang đăng nhập
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper">
        <Header></Header>
        <AdminProducts></AdminProducts>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
