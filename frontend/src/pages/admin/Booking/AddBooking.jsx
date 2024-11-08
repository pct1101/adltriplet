import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBooking } from "../../../lib/Axiosintance"; // Giả sử bạn đã có API này

function AdminAddBooking() {
  const [bookingDate, setBookingDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [bookingStatus, setBookingStatus] = useState("1");
  const [userId, setUserId] = useState("");
  const [carId, setCarId] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("1");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Nếu cần thiết cho việc chỉnh sửa booking

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = () => {
    const role = localStorage.getItem("userRole");
    const apiToken = localStorage.getItem("authToken");

    // Console.log hiển thị giá trị đã lấy thành công :
    console.log("User Role from localStorage:", role);
    console.log("API Token from localStorage:", apiToken);

    if (!role || role !== "admin") {
      setIsAdmin(false);
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/"); // Điều hướng về trang chủ nếu không có quyền
    } else {
      setIsAdmin(true);
    }
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      booking_date: bookingDate,
      start_date: startDate,
      end_date: endDate,
      total_cost: totalCost,
      booking_status: bookingStatus,
      user_id: userId,
      car_id: carId,
      address: address,
      city: city,
      state: state,
    };

    try {
      await addBooking(bookingData); // Gọi API để thêm booking
      alert("Đã thêm đơn đặt hàng mới thành công!"); // Thông báo thành công
      navigate("/admin/AddBooking"); // Điều hướng đến trang danh sách booking sau khi thêm thành công
    } catch (error) {
      console.error("Error while adding booking:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Cập Nhật Booking" : "Thêm Booking Mới"}</h2>
      {isAdmin ? (
        <form onSubmit={handleAddBooking}>
          <div className="mb-3">
            <label className="form-label">Ngày Đặt:</label>
            <input
              type="date"
              className="form-control"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày Bắt Đầu:</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày Kết Thúc:</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tổng Chi Phí:</label>
            <input
              type="number"
              className="form-control"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Trạng Thái:</label>
            <select
              className="form-select"
              value={bookingStatus}
              onChange={(e) => setBookingStatus(e.target.value)}
            >
              <option value="1">Đang xử lý</option>
              <option value="2">Hoàn thành</option>
              <option value="3">Hủy</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">ID Người Dùng:</label>
            <input
              type="number"
              className="form-control"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ID Xe:</label>
            <input
              type="number"
              className="form-control"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa Chỉ:</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Thành Phố:</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tình Trạng:</label>
            <select
              className="form-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="1">Chưa giao</option>
              <option value="2">Đã giao</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? "Cập Nhật Booking" : "Thêm Booking"}
          </button>
        </form>
      ) : (
        <p>Bạn không có quyền truy cập vào trang này.</p>
      )}
    </div>
  );
}

export default AdminAddBooking;
