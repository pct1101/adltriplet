import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllBookings,
  deleteBookingById,
  updateBooking,
} from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";
import "../../../css/admin/css/booking.css";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    checkUserRole();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      if (Array.isArray(response)) {
        setBookings(response);
        console.log(response);
      } else if (response && response.data && Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        console.error("Dữ liệu trả về không đúng định dạng:", response);
        setBookings([]);
      }
    } catch (error) {
      console.error("Không thể lấy danh sách booking:", error);
      setBookings([]);
    }
  };

  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    const apiToken = localStorage.getItem("authToken");
    if (window.confirm("Bạn có chắc chắn muốn xóa booking này?")) {
      try {
        await deleteBookingById(bookingId, apiToken);
        setBookings(
          bookings.filter((booking) => booking.booking_id !== bookingId)
        );
        alert("Booking đã được xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa booking:", error);
        alert("Thất bại trong việc xóa booking: " + error.message);
      }
    }
  };

  // Cập nhật trạng thái
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const updatedBookingData = { booking_status: newStatus };
      await updateBooking(bookingId, updatedBookingData);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.booking_id === bookingId
            ? { ...booking, booking_status: newStatus }
            : booking
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái booking:", error);
    }
  };

  // Hàm xử lý cho hai nút "Hủy bởi admin" và "Xác nhận thanh toán"
  const handleSpecialStatus = async (bookingId, specialStatus) => {
    await handleStatusChange(bookingId, specialStatus);
    alert(
      specialStatus === "3"
        ? "Trạng thái đã được chuyển thành 'Xác nhận thanh toán'!"
        : "Booking đã bị hủy bởi admin!"
    );
  };

  // Áp dụng màu sắc dựa trên trạng thái
  const getStatusStyle = (status) => {
    if (!status) {
      console.warn("Trạng thái không hợp lệ:", status); // Cảnh báo khi trạng thái không hợp lệ
      return { backgroundColor: "#6c757d", color: "white" }; // Màu mặc định (xám)
    }

    switch (status) {
      case "1":
        return { backgroundColor: "#198754", color: "white" };
      case "2":
        return { backgroundColor: "#0d6efd", color: "white" };
      case "3":
        return { backgroundColor: "#fd7e14", color: "white" };
      case "4":
        return { backgroundColor: "#ffc107", color: "black" };
      case "5":
        return { backgroundColor: "#dc3545", color: "white" };
      default:
        return { backgroundColor: "#198754", color: "white" }; // Default màu xanh
    }
  };

  const handleViewDetail = (BookingId) => {
    navigate(`/admin/DetailBooking/${BookingId}`);
  };

  return (
    <div>
      <Side_bar />
      <div className="main-wrapper section">
        <Header />
        <div className="d-flex">
          <h1 className="title">Quản lý Booking</h1>
          <button className="btn ms-auto">
            <Link className="btn btn-primary" to="/admin/AddBooking">
              Thêm Booking
            </Link>
          </button>
        </div>
        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>ID Booking</th>
                  <th>Tên sản phẩm</th>
                  <th>Ngày đặt</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th className="text-center">Trạng thái thanh toán</th>
                  <th className="text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.booking_id}>
                      <td>{booking.booking_id}</td>
                      <td>
                        {booking.car ? booking.car.car_name : "Không có tên xe"}
                      </td>
                      <td>
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(booking.start_date).toLocaleDateString()}
                      </td>
                      <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                      <td>
                        <select
                          value={booking.booking_status}
                          onChange={(e) =>
                            handleStatusChange(
                              booking.booking_id,
                              e.target.value
                            )
                          }
                          style={getStatusStyle(booking.booking_status)}
                          className="form-select text-center"
                        >
                          <option value="1">Booking thành công</option>
                          <option value="2">Đã thanh toán</option>
                          <option value="4">Chờ xác nhận </option>
                          <option value="3">Xác nhận </option>
                          <option value="5">Hủy bởi admin</option>
                        </select>
                      </td>
                      <td>
                        <div className="d-flex">
                          {" "}
                          <button
                            className="btn btn-info me-2"
                            onClick={() =>
                              handleSpecialStatus(booking.booking_id, "3")
                            }
                            disabled={!isAdmin}
                          >
                            Xác nhận
                          </button>
                          <button
                            className="btn btn-danger me-2"
                            onClick={() =>
                              handleSpecialStatus(booking.booking_id, "5")
                            }
                            disabled={!isAdmin}
                          >
                            Hủy booking
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleViewDetail(booking.booking_id)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Không có booking
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBooking;
