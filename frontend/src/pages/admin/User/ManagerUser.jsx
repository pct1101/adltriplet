import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../lib/Axiosintance"; // Import API call
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import ReactPaginate from "react-paginate";
import "../../../css/admin/css/user.css";


function UserList() {
  const [users, setUsers] = useState([]); // Khởi tạo `users` với mảng rỗng
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading để hiển thị trong khi đợi API
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [isAdmin, setIsAdmin] = useState(false); // Kiểm tra quyền admin
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [filterGender, setFilterGender] = useState("all");
  const [usersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  // Gọi API khi component được render
  useEffect(() => {
    fetchUsers();
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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleFilterChange = (e) => {
    setFilterGender(e.target.value);
    setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  const filteredUsers = users.filter((user) => {
    if (filterGender === "all") return true;
    if (filterGender === "male") return user.gender === "male";
    if (filterGender === "female") return user.gender === "female";
    if (filterGender === "admin") return user.role === "admin";
    if (filterGender === "user") return user.role === "user";
    return !user.gender || user.gender === "";
  });

  const offset = currentPage * usersPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  // Kiểm tra quyền admin
  // const checkUserRole = () => {
  //   const role = localStorage.getItem("userRole");
  //   setIsAdmin(role === "admin");
  // };

  // Điều hướng đến trang chỉnh sửa người dùng
  const editUser = (userId) => {
    navigate(`/admin/edit_user/${userId}`); // Điều hướng đến trang sửa user
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
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper section">
        <Header></Header>
        <div className="d-flex">
          <h2 className="title">Quản lý người dùng</h2>
          <button className=" btn ms-auto">
            <Link className="btn btn-primary" to="/admin/add_user">
              Thêm người dùng
            </Link>
          </button>
        </div>

        <div className="filter-section">
          <label htmlFor="genderFilter">Lọc theo giới tính: </label>
          <select
            id="genderFilter"
            value={filterGender}
            onChange={handleFilterChange}
          >
            <option value="all">Tất cả</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="unknown">Chưa cập nhật</option>
          </select>
        </div>
        <table className="table mt-3 ms-4">
          <thead>
            <tr>
              <th>Thông tin</th>
              <th>Địa chỉ</th>
              <th>Ngày sinh</th>
              <th>Trạng thái</th>
              <th>Ngày đăng ký</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="short-info-column">
                    <div className="row">
                      <div className="col-md-3">
                        <img
                          src="../img/anh1-x1.jpg"
                          className="w-100 rounded-circle"
                          alt=""
                        />
                        <div className="text-center">
                          <span class="badge text-bg-danger">
                            {user.gender == "female" && "Nữ"}
                          </span>
                        </div>
                        <div className="text-center">
                          <span class="badge text-bg-warning">
                            {user.gender == "other" && "Khác"}
                          </span>
                        </div>
                        <div className="text-center">
                          <span class="badge text-bg-primary">
                            {user.gender == "male" && "Nam"}
                          </span>
                        </div>
                        <div className="text-center">
                          <span class="badge text-bg-secondary">
                            {(!user.gender || user.gender === "") &&
                              "Chưa cập nhật"}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-9">
                        {user.name} |{" "}
                        <span
                          className={`badge ${user.role === "user"
                            ? "text-bg-warning"
                            : "text-bg-danger"
                            }`}
                        >
                          {user.role}
                        </span>
                        <div className="">
                          Mã: {user.id} | .Số điện thoại:{" "}
                          <span className="text-primary">
                            {user.phone || "Chưa cập nhật"}
                          </span>
                        </div>
                        <div className="">
                          Mail:{" "}
                          <span className="text-primary">
                            {user.email || "Chưa cập nhật"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="short-info-column2">
                    {user.address || "Chưa cập nhật"}
                  </td>
                  <td>{user.birth_date || "Chưa cập nhật"}</td>
                  <td>
                    {user.status === 1 ? (
                      <span class="badge text-bg-primary">On</span>
                    ) : (
                      <span class="badge text-bg-dark">Off</span>
                    )}
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => editUser(user.id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-info me-2"
                      onClick={() => navigate(`/admin/user/${user.id}`)}
                    >
                      Chi tiết
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
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default UserList;
