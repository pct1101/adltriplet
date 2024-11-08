import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../lib/Axiosintance"; // Import API call

function UserList() {
  const [users, setUsers] = useState([]); // Khởi tạo `users` với mảng rỗng
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading để hiển thị trong khi đợi API
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [isAdmin, setIsAdmin] = useState(false); // Kiểm tra quyền admin
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Gọi API khi component được render
  useEffect(() => {
    fetchUsers();
    checkUserRole();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true); // Bắt đầu quá trình load dữ liệu
      const userList = await getAllUsers(); // Gọi API lấy danh sách user
      if (Array.isArray(userList)) {
        setUsers(userList); // Lưu dữ liệu người dùng vào state nếu là mảng
      } else {
        throw new Error("Dữ liệu trả về không phải là mảng");
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      setError("Lỗi khi tải dữ liệu người dùng."); // Lưu lỗi nếu có
    } finally {
      setIsLoading(false); // Kết thúc quá trình load dữ liệu
    }
  };

  // Kiểm tra quyền admin
  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    setIsAdmin(role === "admin");
  };

  // Điều hướng đến trang chỉnh sửa người dùng
  const editUser = (userId) => {
    navigate(`/admin/EditUser/${userId}`); // Điều hướng đến trang sửa user
  };

  // Xóa người dùng
  const deleteUser = async (userId) => {
    const apiToken = localStorage.getItem("api_token"); // Lấy api_token từ localStorage

    if (window.confirm("Bạn có muốn xóa người dùng này chứ?")) {
      try {
        setUsers(users.filter((user) => user.id !== userId)); // Cập nhật danh sách người dùng sau khi xóa
        alert("Người dùng đã được xóa thành công!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Thất bại trong việc xóa người dùng: " + error.message);
      }
    }
  };

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div className="container mt-5">
      <h1>Quản lý người dùng</h1>
      <button>
        <Link className="btn btn-primary" to="/admin/AddUser">
          Thêm người dùng
        </Link>
      </button>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || "Không có"}</td>
                <td>{user.role}</td>
                <td>{user.status === 1 ? "Hoạt động" : "Bị khóa"}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => editUser(user.id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                    disabled={!isAdmin} // Vô hiệu hóa nút xóa nếu không phải admin
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Không có người dùng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
