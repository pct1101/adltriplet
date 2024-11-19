import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../../lib/Axiosintance"; // Import API
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function UserDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [user, setUser] = useState(null); // Lưu thông tin user
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate(); // Điều hướng

  // Gọi API khi component được render
  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const userDetails = await getUserById(id); // Gọi API lấy thông tin user
      setUser(userDetails); // Lưu thông tin user vào state
    } catch (error) {
      console.error("Failed to fetch user details", error);
      setError("Không thể tải thông tin người dùng.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper">
        <Header></Header>
        <div className="container mt-4">
          <h1>Chi tiết người dùng</h1>
          {user ? (
            <div className="card p-3">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src={`/img/${
                      user ? user.image : "đang load"
                    }`} // Thay đổi bằng ảnh của user nếu API có trường ảnh
                    alt={user.name}
                    className="img-fluid rounded-circle"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
                <div className="col-md-8">
                  <h3>{user.name}</h3>
                  <p>
                    <strong>Email:</strong> {user.email || "Chưa cập nhật"}
                  </p>
                  <p>
                    <strong>Điện thoại:</strong>{" "}
                    {user.phone || "Chưa cập nhật"}
                  </p>
                  <p>
                    <strong>Giới tính:</strong>{" "}
                    {user.gender === "male"
                      ? "Nam"
                      : user.gender === "female"
                      ? "Nữ"
                      : user.gender === "other"
                      ? "Khác"
                      : "Chưa cập nhật"}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật"}
                  </p>
                  <p>
                    <strong>Ngày sinh:</strong>{" "}
                    {user.birth_date || "Chưa cập nhật"}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    {user.status === 1 ? (
                      <span className="badge bg-success">Kích hoạt</span>
                    ) : (
                      <span className="badge bg-danger">Không kích hoạt</span>
                    )}
                  </p>
                  <p>
                    <strong>Ngày đăng ký:</strong>{" "}
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                className="btn btn-secondary mt-3"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </button>
            </div>
          ) : (
            <div>Không tìm thấy thông tin người dùng.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
