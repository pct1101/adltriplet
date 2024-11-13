import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBookings, deleteBookingById } from "../../../lib/Axiosintance";
import Side_bar from "../component/side_bar";
import Header from "../component/header";

function AdminBooking() {
  const [bookings, setBookings] = useState([]); // Khởi tạo bookings là một mảng rỗng
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    fetchBookings();
    checkUserRole();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings(); // Lấy toàn bộ danh sách booking
      console.log("Toàn bộ response: ", response); // Log toàn bộ response để kiểm tra

      // Kiểm tra dữ liệu trả về, nếu dữ liệu trả về là mảng thì cập nhật state bookings
      if (Array.isArray(response) && response.length > 0) {
        setBookings(response); // Cập nhật danh sách bookings
      } else if (response && response.data && Array.isArray(response.data)) {
        setBookings(response.data); // Nếu dữ liệu nằm trong response.data và là mảng
      } else {
        console.error("Dữ liệu trả về không đúng định dạng:", response);
        setBookings([]); // Nếu không phải mảng, đặt state là mảng rỗng
      }
    } catch (error) {
      console.error("Không thể lấy danh sách booking:", error);
      setBookings([]); // Đảm bảo state bookings luôn là mảng rỗng nếu có lỗi
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
    const apiToken = localStorage.getItem("authToken"); // Lấy api_token từ localStorage
    if (window.confirm("Bạn có chắc chắn muốn xóa booking này?")) {
      try {
        await deleteBookingById(bookingId, apiToken);
        setBookings(
          bookings.filter((booking) => booking.booking_id !== bookingId)
        ); // Cập nhật lại danh sách
        alert("Booking đã được xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa booking:", error);
        alert("Thất bại trong việc xóa booking: " + error.message);
      }
    }
  };

  const editBooking = (BookingId) => {
    navigate(`/admin/EditBooking/${BookingId}`); // Điều hướng đến trang sửa và truyền carId
  };

  return (
    <div>
      <Side_bar></Side_bar>
      <div className="main-wrapper section p-2">
        <Header></Header>
        <div className="d-flex">
          {" "}
          <h1 className="ms-4">Quản lý Booking</h1>
          <button className="btn ms-auto">
            <Link className="btn btn-primary" to="/admin/AddBooking">
              Thêm Booking
            </Link>
          </button>
        </div>
        <div className="card rounded-0 border-0 shadow-sm p-0 m-3">
          <div className="card-body p-0">
            {" "}
            <table className="table">
              <thead>
                <tr>
                  <th>ID Đơn hàng</th>
                  <th>ID người đặt</th>
                  <th>Tên sản phẩm</th>
                  <th>Ngày đặt</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {/* Kiểm tra nếu bookings là một mảng và không rỗng */}
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
                      <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                      <td>
                        {booking.booking_status === 1
                          ? "Đang chờ"
                          : "Đã hoàn thành"}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => editBooking(booking.booking_id)}
                        >
                          Sửa
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
                    <td colSpan="8" className="text-center">
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
