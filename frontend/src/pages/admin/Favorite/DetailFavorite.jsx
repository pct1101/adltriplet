import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFavoriteDetails, updateFavorite } from "../../../lib/Axiosintance"; // Hàm lấy và cập nhật chi tiết favorite từ API
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function AdminFavoriteDetails() {
  const { userId, carId } = useParams(); // Lấy userId và carId từ URL
  const [favorite, setFavorite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Quản lý trạng thái chỉnh sửa
  const [editedFavorite, setEditedFavorite] = useState(null); // Dữ liệu chỉnh sửa
  const navigate = useNavigate();

  // Lấy thông tin chi tiết của favorite khi component được load
  useEffect(() => {
    fetchFavoriteDetails();
  }, [userId, carId]); // Khi userId hoặc carId thay đổi

  const fetchFavoriteDetails = async () => {
    try {
      const response = await getFavoriteDetails(userId, carId); // Gửi request lấy chi tiết favorite từ API
      setFavorite(response); // Lưu thông tin favorite vào state
      setEditedFavorite({ ...response }); // Khởi tạo giá trị chỉnh sửa
      setLoading(false); // Đánh dấu kết thúc loading
    } catch (error) {
      console.error("Không thể lấy chi tiết favorite:", error);
      setLoading(false);
    }
  };

  // Hàm xử lý thay đổi dữ liệu chỉnh sửa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFavorite((prevState) => ({
      ...prevState,
      car: {
        ...prevState.car,
        [name]: value,
      },
    }));
  };

  // Hàm xử lý lưu lại thay đổi
  const handleSave = async () => {
    try {
      await updateFavorite(userId, carId, editedFavorite); // Gửi yêu cầu cập nhật lên server
      setFavorite(editedFavorite); // Cập nhật lại dữ liệu yêu thích
      setIsEditing(false); // Kết thúc chế độ chỉnh sửa
      alert("Cập nhật yêu thích thành công!");
    } catch (error) {
      console.error("Không thể cập nhật yêu thích:", error);
      alert("Cập nhật thất bại!");
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <Side_bar></Side_bar>{" "}
      <div className="main-wrapper section">
        <Header></Header>
        <h1 className="title">Chi tiết Favorite</h1>
        <div className="container-m">
          {" "}
          {favorite ? (
            <div>
              {isEditing ? (
                <div>
                  <h3>Chỉnh sửa thông tin yêu thích</h3>
                  <form>
                    <div className="form-group">
                      <label>Tên xe</label>
                      <input
                        type="text"
                        className="form-control"
                        name="car_name"
                        value={editedFavorite.car.car_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Ngày yêu thích</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date_favorite"
                        value={editedFavorite.date_favorite}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Biển số xe</label>
                      <input
                        type="text"
                        className="form-control"
                        name="license_plate"
                        value={editedFavorite.car.license_plate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mô tả xe</label>
                      <textarea
                        className="form-control"
                        name="car_description"
                        value={editedFavorite.car.car_description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Giá thuê</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rental_price"
                        value={editedFavorite.car.rental_price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mileage</label>
                      <input
                        type="number"
                        className="form-control"
                        name="mileage"
                        value={editedFavorite.car.mileage}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={handleSave}
                    >
                      Lưu thay đổi
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <h3>{favorite.car.car_name}</h3>
                  <p>
                    <strong>Ngày yêu thích:</strong> {favorite.date_favorite}
                  </p>
                  <p>
                    <strong>Biển số xe:</strong> {favorite.car.license_plate}
                  </p>
                  <p>
                    <strong>Mô tả xe:</strong> {favorite.car.car_description}
                  </p>
                  <p>
                    <strong>Giá thuê:</strong> {favorite.car.rental_price}
                  </p>
                  <p>
                    <strong>Mileage:</strong> {favorite.car.mileage} km
                  </p>
                  <p>
                    <strong>Người yêu thích:</strong> {favorite.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {favorite.user.email}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {favorite.user.address}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {favorite.user.phone}
                  </p>
                  <button
                    className="btn btn-info mt-3"
                    onClick={() => setIsEditing(true)} // Bật chế độ chỉnh sửa
                  >
                    Chỉnh sửa
                  </button>
                </div>
              )}
              <button
                className="btn btn-secondary mt-3"
                onClick={() => navigate("/admin/favorite")}
              >
                Quay lại danh sách
              </button>
            </div>
          ) : (
            <div>Không tìm thấy dữ liệu favorite</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminFavoriteDetails;
