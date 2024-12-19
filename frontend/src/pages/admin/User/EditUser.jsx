import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../lib/Axiosintance"; // API tương ứng với người dùng
import Header from "../component/header";
import Side_bar from "../component/side_bar";

function EditUser() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Điều hướng sau khi cập nhật thành công
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
  });
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Lấy dữ liệu user theo id
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(id); // Lấy thông tin user theo id
        setUser(data); // Cập nhật state với dữ liệu user
        setLoading(false); // Kết thúc tải dữ liệu
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setLoading(false); // Trong trường hợp lỗi cũng kết thúc trạng thái loading
      }
    };
    fetchUserData();
  }, [id]);

  // Xử lý khi có thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    };
    console.log(userData);

    try {
      await updateUser(id, userData); // Gọi API để cập nhật thông tin người dùng
      alert("Thông tin người dùng đã được cập nhật thành công!");
      navigate("/admin/user"); // Điều hướng trở về danh sách người dùng sau khi thành công
    } catch (error) {
      alert("Có lỗi khi cập nhật thông tin người dùng!");
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div>
      <Side_bar />
      <div className="main-wrapper section">
        <Header />
        <div className="d-flex">
          <h1 className="title">Quản lý Booking</h1>
        </div>
        <div className="container-m">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={user.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={user.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                value={user.phone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Vai trò
              </label>
              <select
                id="role"
                name="role"
                className="form-control"
                value={user.role}
                onChange={handleChange}
                required
              >
                <option value="user">Người dùng</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Trạng thái
              </label>
              <select
                id="status"
                name="status"
                className="form-control"
                value={user.status || ""}
                onChange={handleChange}
                required
              >
                <option value="1">Hoạt động</option>
                <option value="0">Bị khóa</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
