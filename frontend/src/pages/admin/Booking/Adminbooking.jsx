import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBookings, deleteBookingById, updateBooking  } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";

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
  // HÀM CHỈNH SỬA TRẠNG THÁI
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const updatedBookingData = { booking_status: newStatus };
      const updatedBooking = await updateBooking(bookingId, updatedBookingData);
      // Cập nhật lại trạng thái booking trong state sau khi thành công
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.booking_id === bookingId
            ? { ...booking, booking_status: newStatus }
            : booking
        )
      );
      alert("Trạng thái booking đã được cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái booking:", error);
      alert("Thất bại trong việc cập nhật trạng thái booking: " + error.message);
    }
  };


  // const editBooking = (BookingId) => {
  //   navigate(`/admin/EditBooking/${BookingId}`);
  // };

  const handleViewDetail = (BookingId) => {
    navigate(`/admin/DetailBooking/${BookingId}`);
  };
  // CSS cho các badge
  const badgeStyle = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "250px",
    height: "30px",
    fontSize: "14px",
    borderRadius: "15px",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper section">
        <Header></Header>
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
                  <th>ID Đơn hàng</th>
                  <th>ID người đặt</th>
                  <th>Tên sản phẩm</th>
                  <th>Ngày đặt</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Trạng thái thanh toán</th>
                  <th className="text-start">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.booking_id}>
                      <td>{booking.booking_id}</td>
                      <td>{booking.user_id}</td>
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
                        {new Date(booking.end_date).toLocaleDateString()}
                      </td>
                      <td>
                        <select
                          value={booking.booking_status}
                          onChange={(e) =>
                            handleStatusChange(booking.booking_id, e.target.value)
                          }
                          disabled={!isAdmin}
                          className="form-control"
                        >
                          <option value={1} className="btn btn-primary">Booking thành công</option>
                          <option value={2}>Đã thanh toán</option>
                          <option value={3}>Xác nhận thanh toán</option>
                          <option value={4}>Chờ xác nhận thanh toán</option>
                          <option value={3}>Xác nhận thanh toán</option>
                          <option value={5}>Hủy bởi admin</option>
                          {/* <option value={4}>Hủy bởi user</option> */}
                          {/* <option value={0}>Không xác định</option> */}
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-info me-2"
                          onClick={() => handleViewDetail(booking.booking_id)}
                          disabled={!isAdmin}
                        >
                          Chi tiết
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteBooking(booking.booking_id)}
                          disabled={!isAdmin}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Không có booking nào
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
