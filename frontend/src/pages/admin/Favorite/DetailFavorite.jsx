import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFavoriteDetails, updateFavorite } from "../../../lib/Axiosintance"; // Hàm lấy và cập nhật chi tiết favorite từ API
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function AdminFavoriteDetails() {
  const { userId, carId } = useParams(); // Lấy userId và carId từ URL
  const [favorite, setFavorite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedFavorite, setEditedFavorite] = useState(null); // Dữ liệu chỉnh sửa
  const navigate = useNavigate();

  // Lấy thông tin chi tiết của favorite khi component được load
  useEffect(() => {
    fetchFavoriteDetails();
  }, [userId, carId]); // Khi userId hoặc carId thay đổi

  const fetchFavoriteDetails = async () => {
    try {
      const response = await getFavoriteDetails(userId, carId); // Gửi request lấy chi tiết favorite từ API
      console.log(response);
      setFavorite(response); // Lưu thông tin favorite vào state

      setEditedFavorite({ ...response }); // Khởi tạo giá trị chỉnh sửa
      setLoading(false); // Đánh dấu kết thúc loading
    } catch (error) {
      console.error("Không thể lấy chi tiết favorite:", error);
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <Side_bar />
      <div className="main-wrapper section">
        <Header />
        <h1 className="title">Chi tiết Favorite</h1>
        <div className="container-m">
          {favorite ? (
            <div className="row">
              {/* Cột bên trái: Thông tin người dùng */}
              <div className="col-md-6">
                <h3>Thông tin người dùng</h3>
                <p>
                  <strong>Tên:</strong> {favorite.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {favorite.user.email}
                </p>
                <p>
                  <strong>Giới tính:</strong> {favorite.user.gender}
                </p>
                <p>
                  <strong>Ngày sinh:</strong> {favorite.user.birth_date}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {favorite.user.phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {favorite.user.address}
                </p>
                {/* <p>
                  <strong>Vai trò:</strong> {favorite.user.role}
                </p> */}
              </div>

              {/* Cột bên phải: Thông tin xe */}
              <div className="col-md-6">
                <h3>Thông tin xe</h3>
                <p>
                  <strong>Tên xe:</strong> {favorite.car.car_name}
                </p>
                <p>
                  <strong>Ngày yêu thích:</strong> {favorite.date_favorite}
                </p>
                <p>
                  <strong>Biển số:</strong> {favorite.car.license_plate}
                </p>
                <p>
                  <strong>Mô tả:</strong> {favorite.car.car_description}
                </p>
                <p>
                  <strong>Giá thuê:</strong> {favorite.car.rental_price} VND
                </p>
                <p>
                  <strong>Quãng đường đã đi:</strong> {favorite.car.mileage} km
                </p>
                <p>
                  <strong>Trạng thái xe:</strong>{" "}
                  {favorite.car.car_status === 1
                    ? "Hoạt động"
                    : "Không hoạt động"}
                </p>
              </div>
            </div>
          ) : (
            <div>Không tìm thấy dữ liệu favorite</div>
          )}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate("/admin/favorite")}
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminFavoriteDetails;
