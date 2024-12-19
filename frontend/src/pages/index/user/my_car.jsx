import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import Side_bar from "./side_bar";
import Header from "../header/header";
import {
  getBooking,
  updateBookingByUser,
  cancelUserBooking,
} from "../../../lib/Axiosintance";
import dayjs from "dayjs";
import "../../../css/index/mycar.css";
import { API_URL_IMG } from "../../../lib/Axiosintance";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";


function My_car() {
  const [bookingData, setbookingData] = useState(null);
  console.log(bookingData);

  const [startDateFormatted, setStartDateFormatted] = useState(null);
  const [endDateFormatted, setEndDateFormatted] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Dữ liệu sau khi lọc
  const [selectedStatus, setSelectedStatus] = useState("0"); // Giá trị mặc định là "Tất cả"
  const [isUpdating, setIsUpdating] = useState(false); // Trạng thái đang cập nhật
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 3;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const displayedCars = filteredData
    ? filteredData.slice(
        currentPage * carsPerPage,
        (currentPage + 1) * carsPerPage
      )
    : [];

  useEffect(() => {
    const fecthBookingData = async () => {
      try {
        const data = await getBooking();
        setbookingData(data);
      } catch (error) {
        console.log(error.data.message);
      }
    };
    fecthBookingData();
  }, []);

  // Lọc dữ liệu khi thay đổi trạng thái
  useEffect(() => {
    if (selectedStatus === "0") {
      setFilteredData(bookingData); // Nếu chọn "Tất cả", hiển thị toàn bộ dữ liệu
    } else {
      const filtered = bookingData.filter(
        (booking) => booking.booking_status === parseInt(selectedStatus) // So khớp chính xác trạng thái
      );
      setFilteredData(filtered);
    }
  }, [selectedStatus, bookingData]); // Lọc lại khi trạng thái hoặc dữ liệu booking thay đổi

  // Xử lý sự kiện khi người dùng thay đổi trạng thái
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const cancelReasons = [
    "Tôi muốn đặt xe khác",
    "Tôi muốn đổi lại khung thời gian đặt xe",
    "Tôi không còn nhu cầu thuê xe",
    "Lý do khác",
  ];

  const handleCancelBooking = async () => {
    if (!cancelReason) {
      alert("Vui lòng chọn lý do hủy.");
      return;
    }

    if (!selectedBookingId) {
      console.error("Booking ID không hợp lệ:", selectedBookingId);
      return;
    }

    try {
      setIsCanceling(true);

      // Gọi API hủy booking với lý do hủy
      await cancelUserBooking(selectedBookingId, cancelReason);

      // Cập nhật trạng thái của chuyến trong cả danh sách đã lọc và danh sách gốc
      const updateBookingStatus = (data) =>
        data.map((booking) =>
          booking.id === selectedBookingId
            ? {
                ...booking,
                booking_status: 7, // Trạng thái chờ xác nhận
                cancel_reason: cancelReason,
              }
            : booking
        );

      setFilteredData((prev) => updateBookingStatus(prev));
      setbookingData((prev) => updateBookingStatus(prev));

      alert("Yêu cầu hủy chuyến đã được gửi, vui lòng chờ hệ thống xác nhận.");

      // Reset lại các giá trị sau khi hủy
      setSelectedBookingId(null);
      setCancelReason("");
    } catch (error) {
      console.error("Lỗi khi hủy booking:", error);
      alert("Có lỗi xảy ra khi hủy booking.");
    } finally {
      setIsCanceling(false);
    }
  };

  useEffect(() => {
    if (bookingData && bookingData[0]?.start_date) {
      const startDate = bookingData[0].start_date;
      const endDate = bookingData[0].end_date;
      const startDateFormatted = dayjs(startDate).format("DD-MM-YYYY HH:mm");
      const endDateFormatted = dayjs(endDate).format("DD-MM-YYYY HH:mm");
      // Lưu giá trị đã định dạng vào state
      setStartDateFormatted(startDateFormatted);
      setEndDateFormatted(endDateFormatted);
    } else {
      console.log("Start date not found or invalid");
    }
  }, [bookingData]);

  const formatPrice = (price) => {
    // Chuyển đổi số thành định dạng "xxxK" nếu số > 1000
    if (price >= 1000) {
      return `${(price / 1000).toLocaleString("vi-VN")}K/ngày`;
    }
    return `${price.toLocaleString("vi-VN")} VND/ngày`; // Format cho số dưới 1000
  };
  const navigate = useNavigate();

  const handleUrls = (booking_id) => {
    const bookingItem = bookingData.find(
      (item) => item.booking_id === booking_id
    );
    console.log(bookingItem);

    if (bookingItem) {
      console.log("Trạng thái booking: ", bookingItem.booking_status);
      console.log("booking id", bookingItem.booking_id);

      if (bookingItem.booking_status === 1) {
        // navigate(`/payment_car/${booking_id}`);
      } else {
        setMessage("Trạng thái không cho phép điều hướng đến thanh toán!");
        setOpen(true);
      }
      if (bookingItem.booking_status === 2) {
        setMessage("Vui lòng chờ xác nhận thanh toán!");
        setOpen(true);
      }
      if (bookingItem.booking_status === 3) {
        setMessage("Vui lòng chờ xác nhận thanh toán!");
        setOpen(true);
      }
    } else {
      setMessage("Không tìm thấy thông tin đặt xe!");
      setOpen(true);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="container user">
        <div className="background-login-signup"></div>
        <div className="group-user">
          <div className="right-user">
            <Side_bar></Side_bar>
          </div>

          <div className="left-user">
            <div className="content-item user-car">
              <div className="title">
                <div className="title-edit">
                  <h5>Danh sách xe</h5>
                  <div className="filter-status">
                    <p>Trạng thái: </p>
                    <div className="custom-select">
                      <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="0">Tất cả</option>
                        <option value="1">Chưa thanh toán</option>
                        <option value="2">Đã thanh toán</option>
                        <option value="3">Đã thanh toán</option>
                        <option value="4">Đã hủy</option>
                        <option value="5">Hủy bởi admin</option>
                        <option value="6">Đã hoàn thành</option>
                        <option value="7">Vui lòng chờ xác nhận</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {displayedCars && displayedCars.length > 0 ? (
                displayedCars.map((booking) => (
                  <div className="card-car row" key={booking.id}>
                    <div className="item-box">
                      <a href="#">
                        <div className="img-car">
                          <div className="car-img">
                            <img
                              className="scale-img"
                              src={` ${API_URL_IMG}/${booking.car.car_image}`}
                              alt="Car"
                            />
                          </div>
                        </div>
                      </a>
                      <div className="desc-car">
                        <div
                          className="note success w-250px"
                          style={{
                            backgroundColor:
                              booking.booking_status === 7
                                ? "#ffc107" // Vàng - Chờ xác nhận
                                : booking.booking_status === 1
                                  ? "orange" // Booking thành công
                                  : booking.booking_status === 2
                                    ? "#000080" // Đã thanh toán
                                    : booking.booking_status === 3
                                      ? "#green" // Đã thanh toán
                                      : booking.booking_status === 4 || booking.booking_status === 5
                                        ? "#dc3545" // Hủy bởi người dùng hoặc admin
                                        : "#198754", // Trạng thái khác
                            color: booking.booking_status === 7 ? "black" : "white",
                            fontSize: ".550rem",
                          }}
                        >
                          {booking.booking_status === 1
                            ? "Chưa thanh toán"
                            : booking.booking_status === 2
                            ? "Xác nhận thanh toán"
                            : booking.booking_status === 3
                            ? "Đã thanh toán"
                            : booking.booking_status === 4
                            ? "Đã hủy"
                            : booking.booking_status === 5
                            ? "Hủy bởi admin"
                            : booking.booking_status === 6
                            ? "Đã hoàn thành"
                            : booking.booking_status === 7
                            ? "Chờ xác nhận"
                            : "Trạng thái không xác định"}
                        </div>

                        {/* <div className="desc-name">
                          Lý do : {booking.cancel_reason}
                        </div> */}
                        {booking.booking_status === 7 && (
                          <div className="desc-name">
                            Lý do hủy: {booking.cancel_reason}
                          </div>
                        )}
                        <div className="desc-name">
                          <p> {booking.car.car_name} </p>
                        </div>

                        <div className="desc-info">
                          <div className="wrap-svg">
                            <svg
                              className="star-rating"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z"
                                fill="#FFC634"
                              ></path>
                            </svg>
                          </div>
                          <span className="info">5.0</span>
                          <span className="dot">•</span>
                          <div className="wrap-svg">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ marginRight: "4px" }}
                            >
                              <g clipPath="url(#clip0_1087_41996)">
                                <path
                                  d="M10.0625 1.21875C10.0625 1.06369 10.1887 0.9375 10.3438 0.9375H11.9688C12.1238 0.9375 12.25 1.06369 12.25 1.21875V2.89422H13.1875V1.21875C13.1875 0.546719 12.6408 0 11.9688 0H10.3438C9.67172 0 9.125 0.546719 9.125 1.21875V2.89422H10.0625V1.21875Z"
                                  fill="#5FCF86"
                                ></path>
                                <path
                                  d="M5.69806 15.0623C5.49325 14.7441 5.375 14.3673 5.375 13.9686V6.94092H1.09375C0.490656 6.94092 0 7.43157 0 8.03467V13.9686C0 14.5186 0.408156 14.9749 0.9375 15.051V15.5309C0.9375 15.7898 1.14737 15.9997 1.40625 15.9997C1.66513 15.9997 1.875 15.7898 1.875 15.5309V15.0623H5.69806V15.0623ZM1.875 8.65967C1.875 8.40079 2.08487 8.19092 2.34375 8.19092C2.60263 8.19092 2.8125 8.40079 2.8125 8.65967V13.3436C2.8125 13.6024 2.60263 13.8123 2.34375 13.8123C2.08487 13.8123 1.875 13.6024 1.875 13.3436V8.65967Z"
                                  fill="#5FCF86"
                                ></path>
                                <path
                                  d="M4.375 5.26562C4.375 5.11056 4.50119 4.98438 4.65625 4.98438H5.375V4.92547C5.375 4.61094 5.44687 4.31291 5.57506 4.04688H4.65625C3.98422 4.04688 3.4375 4.59359 3.4375 5.26562V6.00359H4.375V5.26562Z"
                                  fill="#5FCF86"
                                ></path>
                                <path
                                  d="M14.9062 3.83154H7.40625C6.80316 3.83154 6.3125 4.3222 6.3125 4.92529V13.9686C6.3125 14.5186 6.72066 14.9749 7.25 15.051V15.5309C7.25 15.7898 7.45987 15.9997 7.71875 15.9997C7.97763 15.9997 8.1875 15.7898 8.1875 15.5309V15.0623H14.125V15.5309C14.125 15.7898 14.3349 15.9997 14.5938 15.9997C14.8526 15.9997 15.0625 15.7898 15.0625 15.5309V15.051C15.5918 14.9749 16 14.5186 16 13.9686V4.92529C16 4.32217 15.5093 3.83154 14.9062 3.83154ZM9.125 13.3436C9.125 13.6024 8.91513 13.8123 8.65625 13.8123C8.39737 13.8123 8.1875 13.6024 8.1875 13.3436V5.55029C8.1875 5.29142 8.39737 5.08154 8.65625 5.08154C8.91513 5.08154 9.125 5.29142 9.125 5.55029V13.3436ZM13.6562 13.8123C13.3974 13.8123 13.1875 13.6024 13.1875 13.3436V8.65967C13.1875 8.40079 13.3974 8.19092 13.6562 8.19092C13.9151 8.19092 14.125 8.40079 14.125 8.65967V13.3436C14.125 13.6024 13.9151 13.8123 13.6562 13.8123Z"
                                  fill="#5FCF86"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1087_41996">
                                  <rect
                                    width="16"
                                    height="16"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <span className="info">{booking.city} </span>
                        </div>

                        <div className="days">
                          <div className="desc-days">
                            <div className="form-item">
                              <label>nhận xe </label>
                              <div className="wrap-date-time">
                                <div className="wrap-date">
                                  <span className="value">
                                    {booking.start_date}
                                  </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="desc-days">
                            {" "}
                            <div className="form-item">
                              <label>trả xe </label>
                              <div className="wrap-date-time">
                                <div className="wrap-date">
                                  <span className="value">
                                    {" "}
                                    <span className="value">
                                      {booking.end_date}
                                    </span>{" "}
                                  </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="profile">
                        <div className="avatar avatar--s has-five-star">
                          <img
                            loading="lazy"
                            src="https://n1-astg.mioto.vn/g/2024/07/26/15/56q_jNBZ7lXK_FW4c2B3cQ.jpg"
                          />
                        </div>
                        <div className="price">
                          <span className="price-special">
                            {" "}
                            {formatPrice(booking.total_cost)}{" "}
                          </span>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleUrls(booking.booking_id)}
                        >
                          Xem chi tiết
                        </button>
                        {
                          booking.booking_status !== 4 && booking.booking_status !== 7 && booking.booking_status !== 6 && (
                            <button className="btn btn-danger"
                              onClick={() => {
                                setSelectedBookingId(booking.booking_id);
                                setIsCanceling(true);
                              }}
                            >
                              Hủy chuyến
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Vui lòng chờ</p>
              )}
              {/* Modal chọn lý do hủy */}
              {isCanceling && (
                <div className="cancel-modal">
                  <h5>Chọn lý do hủy chuyến</h5>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  >
                    <option value="">-- Chọn lý do --</option>
                    {cancelReasons.map((reason, index) => (
                      <option key={index} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                  <div>
                    <button onClick={handleCancelBooking}>Xác nhận hủy</button>
                    <button onClick={() => setIsCanceling(false)}>
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              )}
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={Math.ceil((filteredData?.length || 0) / carsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />{" "}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
      {/* Snackbar for showing alerts */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          message={message}
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          onClick={handleClose}
        >
          {" "}
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default My_car;
