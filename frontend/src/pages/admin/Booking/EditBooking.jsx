import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById, updateBooking } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    user_id: "",
    car_id: "",
    total_cost: "",
    booking_date: "",
    start_date: "",
    end_date: "",
    booking_status: "",
    city: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const data = await getBookingById(id);
        setBooking(data); // Cập nhật state với dữ liệu booking
        setLoading(false); // Kết thúc tải dữ liệu
      } catch (error) {
        console.error("Lỗi khi lấy thông tin booking:", error);
        setLoading(false);
      }
    };
    fetchBookingData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      user_id: booking.user_id,
      car_id: booking.car_id,
      total_cost: booking.total_cost,
      booking_date: booking.booking_date,
      start_date: booking.start_date,
      end_date: booking.end_date,
      booking_status: booking.booking_status,
      city: booking.city,
      address: booking.address,
    };

    try {
      await updateBooking(id, bookingData);
      alert("Booking đã được cập nhật thành công!");
      navigate("/admin/AdminBooking");
    } catch (error) {
      alert("Có lỗi khi cập nhật booking!");
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div>
      {" "}
      <Side_bar></Side_bar>
      <div className="main-wrapper section">
        <Header></Header>
        <h1 className="title">Chỉnh sửa Booking</h1>
        <div className="container-m">
          {" "}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="user_id" className="form-label">
                Id người dùng
              </label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                className="form-control"
                value={booking.user_id || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="car_id" className="form-label">
                Id Xe
              </label>
              <input
                type="text"
                id="car_id"
                name="car_id"
                className="form-control"
                value={booking.car_id || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="booking_date" className="form-label">
                Ngày Đặt
              </label>
              <input
                type="date"
                id="booking_date"
                name="booking_date"
                className="form-control"
                value={booking.booking_date || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="start_date" className="form-label">
                Ngày Bắt Đầu
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="form-control"
                value={booking.start_date || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="end_date" className="form-label">
                Ngày Kết Thúc
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="form-control"
                value={booking.end_date || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="booking_status" className="form-label">
                Trạng thái
              </label>
              <select
                id="booking_status"
                name="booking_status"
                className="form-control"
                value={booking.booking_status || ""}
                onChange={handleChange}
                required
              >
                <option value="pending">Chờ xác nhận</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Thành phố
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                value={booking.city || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                value={booking.address || ""}
                onChange={handleChange}
                required
              />
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

export default EditBooking;
