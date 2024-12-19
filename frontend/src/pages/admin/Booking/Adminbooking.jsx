import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import {
  getAllBookings,
  deleteBookingById,
  updateBooking,
  cancelBookingByAdmin,
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
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Trạng thái trang hiện tại
  const [statusFilter, setStatusFilter] = useState(""); // Trạng thái lọc
  const bookingsPerPage = 8; // Số booking mỗi trang
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

  // xác nhận hủy bởi admin
  const submitCancelBooking = async () => {
    if (!selectedBookingId || !cancelReason) {
      alert("Vui lòng chọn lý do hủy!");
      return;
    }

    try {
      await cancelBookingByAdmin(selectedBookingId, {
        cancel_reason: cancelReason,
        cancel_note: "Hủy bởi admin",
      });

      // Cập nhật trạng thái về 4
      await handleStatusChange(selectedBookingId, "4");

      alert("Booking đã được hủy thành công!");
    } catch (error) {
      console.error("Lỗi khi hủy booking:", error);
      alert("Hủy booking thất bại: " + error.message);
    } finally {
      setShowCancelModal(false);
      setSelectedBookingId(null);
      setCancelReason("");
    }
  };

  // Cập nhật trạng thái
  const handleStatusChange = async (
    bookingId,
    newStatus,
    isAdminCancel = false
  ) => {
    try {
      let updatedStatus = newStatus;
      let cancelNote = "";

      // Nếu trạng thái là hủy (4 hoặc 5), xác định lý do
      if (newStatus === "4" || newStatus === "5") {
        cancelNote = isAdminCancel ? "Hủy bởi admin" : "Hủy bởi user";
        updatedStatus = isAdminCancel ? "5" : "4"; // 5 cho admin, 4 cho user
      }

      const updatedBookingData = {
        booking_status: updatedStatus,
        cancel_note: cancelNote,
      };

      await updateBooking(bookingId, updatedBookingData);

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.booking_id === bookingId
            ? {
                ...booking,
                booking_status: updatedStatus,
                cancel_note: cancelNote,
              }
            : booking
        )
      );

      alert(
        updatedStatus === "4"
          ? "Trạng thái đã chuyển về 'Hủy bởi user'!"
          : updatedStatus === "5"
          ? "Trạng thái đã chuyển về 'Hủy bởi admin'!"
          : "Trạng thái đã được cập nhật!"
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

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy booking này bởi admin?")) {
      await handleStatusChange(bookingId, "5", true); // Hủy bởi admin
    }
  };

  // Áp dụng màu sắc dựa trên trạng thái
  // const getStatusStyle = (status) => {
  //   if (!status) {
  //     console.warn("Trạng thái không hợp lệ:", status); // Cảnh báo khi trạng thái không hợp lệ
  //     // return { backgroundColor: "#6c757d", color: "white" }; // Màu mặc định (xám)
  //   }

  //   switch (status) {
  //     case "1":
  //       return { backgroundColor: "white", color: "green" };
  //     case "2":
  //       return { backgroundColor: "white", color: "green" };
  //     case "3":
  //       return { backgroundColor: "white", color: "green" };
  //     case "4":
  //       return { backgroundColor: "white", color: "red" };
  //     case "5":
  //       return { backgroundColor: "white", color: "red" };
  //     default:
  //     // return { backgroundColor: "#198754", color: "white" }; // Default màu xanh
  //   }
  // };

  const getStatusStyle = (status) => {
    if (!status) {
      console.warn("Trạng thái không hợp lệ:", status); // Cảnh báo khi trạng thái không hợp lệ
      // return { backgroundColor: "#6c757d", color: "white" }; // Màu mặc định (xám)
    }
    switch (status) {
      case "1":
        return { backgroundColor: "white", color: "green" }; // Thành công
      case "3":
        return { backgroundColor: "white", color: "blue" }; // Đã thanh toán
      case "4":
        return { backgroundColor: "white", color: "orange" }; // Hủy bởi user
      case "5":
        return { backgroundColor: "white", color: "red" }; // Hủy bởi admin
      case "6":
        return { backgroundColor: "white", color: "green" }; // Hoàn thành
      case "7":
        return { backgroundColor: "white", color: "darkred" }; // Xác nhận hủy
      default:
      // return { backgroundColor: "#ccc", color: "black" }; // Mặc định
    }
  };

  const handleViewDetail = (BookingId) => {
    navigate(`/admin/DetailBooking/${BookingId}`);
  };

  // Phân trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Lọc trạng thái
  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi trạng thái lọc
  };

  // Lọc booking theo trạng thái
  const filteredBookings = statusFilter
    ? bookings.filter(
        (booking) => booking.booking_status === parseInt(statusFilter)
      ) // So sánh theo kiểu số
    : bookings;

  // Phân trang bookings
  const paginatedBookings = filteredBookings.slice(
    currentPage * bookingsPerPage,
    (currentPage + 1) * bookingsPerPage
  );

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
        <div className="d-flex ms-3 mb-4">
          <select
            className="form-select w-auto"
            onChange={handleStatusFilterChange}
            value={statusFilter}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="1">Booking thành công</option>
            <option value="3">Đã thanh toán</option>
            <option value="4">Hủy bởi user</option>
            <option value="5">Hủy bởi admin</option>
            <option value="6">Đã hoàn thành</option>
            <option value="6">Chờ xác nhận hủy</option>
          </select>
        </div>
        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            <table
              className="table"
              style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
            >
              <thead>
                <tr>
                  <th className="text-center">ID Booking</th>
                  <th className="text-center">Tên sản phẩm</th>
                  <th>Ngày đặt</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th className="text-center">Trạng thái</th>
                  <th>Lý do hủy</th>
                  <th className="text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(paginatedBookings) &&
                paginatedBookings.length > 0 ? (
                  paginatedBookings.map((booking) => (
                    <tr key={booking.booking_id}>
                      <td className="text-center">{booking.booking_id} | </td>
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
                          <option value="3">Đã thanh toán</option>
                          <option value="4">Hủy bởi user</option>
                          <option value="5">Hủy bởi admin</option>
                          <option value="6">Đã hoàn thành</option>
                          <option value="6">Chờ xác nhận hủy</option>
                        </select>
                      </td>
                      <td>
                        {booking.booking_status === "4" ||
                        booking.booking_status === "5"
                          ? booking.cancel_note
                          : "-"}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <select
                            className="form-select w-auto"
                            onChange={(e) => {
                              const { value } = e.target;
                              if (value === "3") {
                                handleSpecialStatus(booking.booking_id, "3");
                              } else if (value === "cancel") {
                                handleCancelBooking(booking.booking_id);
                              } else if (value === "4") {
                                handleStatusChange(booking.booking_id, "4");
                              } else if (value === "view") {
                                handleViewDetail(booking.booking_id);
                              }
                            }}
                            disabled={!isAdmin}
                          >
                            <option value="" disabled selected>
                              Chọn hành động
                            </option>
                            <option value="3">Xác nhận thanh toán</option>
                            <option value="cancel">Hủy booking</option>
                            <option value="4">Hủy bởi người dùng</option>
                            <option value="view">Xem chi tiết</option>
                          </select>
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

        {/* Phân trang */}
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={Math.ceil(filteredBookings.length / bookingsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>

      {/* Modal Hủy */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hủy Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            rows="4"
            className="form-control"
            placeholder="Nhập lý do hủy"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Đóng
          </Button>
          <Button
            variant="danger"
            onClick={() => handleCancelBooking(selectedBookingId)}
          >
            Hủy Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminBooking;
