import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getAllBookings,
  deleteBookingById,
  updateBooking,
  cancelBookingByAdmin
} from "../../../lib/Axiosintance";

import Side_bar from "../component/side_bar";
import Header from "../component/header";
import "../../../css/admin/css/booking.css";
import Modal from "react-bootstrap/Modal"; // Thêm modal từ Bootstrap hoặc thư viện tương tự
import Button from "react-bootstrap/Button";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  // const [cancelNote, setCancelNote] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
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

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowCancelModal(true);
  };

  // Áp dụng màu sắc dựa trên trạng thái
  const getStatusStyle = (status) => {
    if (!status) {
      console.warn("Trạng thái không hợp lệ:", status); // Cảnh báo khi trạng thái không hợp lệ
      // return { backgroundColor: "#6c757d", color: "white" }; // Màu mặc định (xám)
    }

    switch (status) {
      case "1":
        return { backgroundColor: "white", color: "green" };
      case "2":
        return { backgroundColor: "white", color: "green" };
      case "3":
        return { backgroundColor: "white", color: "green" };
      case "4":
        return { backgroundColor: "white", color: "red" };
      case "5":
        return { backgroundColor: "white", color: "red" };
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
                  <th>Lý do hủy</th>
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

                      <td>
                        {booking.car ? booking.car.car_name : "Không có tên xe"}
                      </td>
                      {/* <td>
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(booking.start_date).toLocaleDateString()}
                      </td>
                      <td>{new Date(booking.end_date).toLocaleDateString()}</td> */}
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
                          {/* <option value="2" >Xác nhận thanh toán</option> */}

                          <option value="3">Đã thanh toán</option>
                          <option value="4">Hủy bởi user</option>
                          <option value="5">Hủy bởi admin</option>
                        </select>
                      </td>
                      {/* Hiển thị lý do hủy chỉ khi trạng thái là 5 */}
                      <td>
                        {booking.booking_status === "5"
                          ? booking.cancel_reason
                          : "-"}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-info me-2"
                          onClick={() =>
                            handleSpecialStatus(booking.booking_id, "3")
                          }
                          disabled={!isAdmin}
                        >
                          Xác nhận thanh toán
                        </button>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() =>
                            handleCancelBooking(booking.booking_id)
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

      {/* Modal Hủy */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hủy Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Chọn lý do hủy</label>
            <select
              className="form-select"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            >
              <option value="">-- Chọn lý do --</option>
              <option value="Khách hàng yêu cầu">Khách hàng yêu cầu</option>

              <option value="Xe không khả dụng">Xe không khả dụng</option>
              <option value="Lỗi thanh toán">Lỗi thanh toán</option>
              <option value="Không đủ tài liệu">Không đủ tài liệu</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          {/* <div className="mb-3">
            <label className="form-label">Ghi chú</label>
            <textarea
              className="form-control"
              value={cancelNote}
              onChange={(e) => setCancelNote(e.target.value)}
            ></textarea>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Đóng
          </Button>
          <Button variant="danger">Xác nhận hủy</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminBooking;
