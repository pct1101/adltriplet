import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingById } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function AdminBookingDetails() {
  const { bookingId } = useParams(); // Lấy bookingId từ URL
  const [booking, setBooking] = useState(null); // Dữ liệu booking
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const navigate = useNavigate();

  // Lấy chi tiết booking khi component được load
  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await getBookingById(bookingId); // Gửi request lấy chi tiết booking
      setBooking(response.booking); // Lưu dữ liệu booking
      setLoading(false); // Đánh dấu kết thúc loading
    } catch (error) {
      console.error("Không thể lấy chi tiết booking:", error);
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <Side_bar />
      <div className="main-wrapper section">
        <Header />
        <h1 className="title">Chi tiết Booking</h1>
        <div className="container-m">
          {booking ? (
            <div className="row">
              {/* Cột bên trái: Thông tin người dùng */}
              <div className="col-md-6">
                <h3>Thông tin Người đặt</h3>
                <p>
                  <strong>Tên:</strong> <a className="text-bold text-decoration-none">{booking.user.name}</a>
                </p>
                <p>
                  <strong>Email:</strong> {booking.user.email}
                </p>
                <p>
                  <strong>Giới tính:</strong> {booking.user.gender}
                </p>
                <p>
                  <strong>Ngày sinh:</strong> {booking.user.birth_date}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {booking.user.phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {booking.user.address}
                </p>
              </div>

              {/* Cột bên phải: Thông tin xe */}
              <div className="col-md-6">
                <h3>Thông tin Xe</h3>
                <p>
                  <strong>Tên xe:</strong> {booking.car.car_name}
                </p>
                <p>
                  <strong>Biển số:</strong> {booking.car.license_plate}
                </p>
                <p>
                  <strong>Quãng đường đã đi:</strong> {booking.car.mileage} km
                </p>
                <p>
                  <strong>Mô tả:</strong> {booking.car.car_description}
                </p>
                <p>
                  <strong>Giá thuê:</strong> {booking.car.rental_price} VND
                </p>
                <p>
                  <strong>Trạng thái xe:</strong>{" "}
                  {booking.car.car_status === 1 ? "Hoạt động" : "Không hoạt động"}
                </p>
              </div>

            </div>
          ) : (
            <div>Không tìm thấy dữ liệu Booking</div>
          )}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate("/admin/booking")}
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminBookingDetails;
