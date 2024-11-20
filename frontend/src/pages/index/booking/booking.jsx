import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import ModalPopup from "../event/popup";
// note:import data cho form booking
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// note: api car
import { getCarDetails } from "../../../lib/Axiosintance";
import LocationDropdown from "./district_province";
// note: api post booking
import { addBookingUser } from "../../../lib/Axiosintance";
import { useAuth } from "../../Private/Auth";
import { useNavigate } from "react-router-dom";
import Loading from "../event/loading";
import { useBooking } from "../../Private/bookingContext";

function Booking() {
  const {
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
    bookings,
    setBookings,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedTimes,
    setSelectedTimes,
  } = useBooking();

  // note: handle dữ liệu địa điểm
  const handleLocationChange = (province, district) => {
    setSelectedProvince(province);
    setSelectedDistrict(district);
  };
  // note: loadding
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Quản lý trạng thái hiển thị modal
  const [modalMessage, setModalMessage] = useState(""); // Lưu trữ thông điệp modal
  const [modalType, setModalType] = useState("");
  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDatePicker(false);
  };

  //note:    set value for booking
  const [showDatePicker, setShowDatePicker] = useState(false);

  // note:  set value for dropdown and time
  const [openDropdown, setOpenDropdown] = useState(null);

  const { id: carId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const formattedStartDate = startDate.toISOString().split("T")[0]; // note:YYYY-MM-DD
  const formattedEndDate = endDate.toISOString().split("T")[0]; //note: YYYY-MM-DD
  const handleBookingSubmit = async () => {
    setIsLoading(true);

    const apiToken = localStorage.getItem("remember_token");
    if (!user) {
      navigate("/login");
      return;
    }
    if (!apiToken || apiToken.trim() === "") {
      console.error("Token không hợp lệ hoặc hết hạn.");
      //note: Có thể yêu cầu người dùng đăng nhập lại hoặc tự động làm mới token nếu đang dùng refresh token.
      return;
    }
    const carDetails = await getCarDetails(carId);

    const bookingData = {
      car_id: carId,
      car_name: carDetails.name,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      rental_price: total_cost,
      booking_date: new Date().toISOString(),
      city: selectedProvince ? selectedProvince.label : null,
      address: selectedDistrict ? selectedDistrict.label : null,
    };

    try {
      //note: Gọi hàm addBooking để thực hiện API call
      const response = await addBookingUser(bookingData, apiToken);
      const { booking } = response;
      localStorage.setItem("booking_id", booking.booking_id);
      if (response.message === "Booking thành công") {
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/payment_car/${booking.booking_id}`);
        }, 3000);
      }
    } catch (error) {
      console.error("Có lỗi khi đặt xe:", error);

      //note: Lấy thông báo lỗi từ error (có thể từ error.response hoặc error.message)
      setModalMessage(error.response?.data?.message);
      setModalType("error"); //note: Loại thông báo lỗi
      setOpenModal(true); // note:Mở modal khi có lỗi
      setIsLoading(false); // note: kết thúc tải
    }
  };
  // note:Toggle none/block dropdown
  const handleToggleDropdown = (dropdownName) => {
    //note: open dropdown or none
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };
  //note:set time
  const generateTimeOptions = (startHour, startMinute) => {
    const times = [];
    let hour = startHour;
    let minute = startMinute >= 30 ? 30 : 0;
    while (hour < 21 || (hour === 21 && minute === 0)) {
      times.push(
        `${hour < 10 ? "0" + hour : hour}:${minute === 0 ? "00" : "30"}`
      );
      if (minute === 0) {
        minute = 30;
      } else {
        minute = 0;
        hour += 1;
      }
    }
    return times;
  };
  // note:  xử lý realtime nhanXe
  const nhanXeOptions = generateTimeOptions(9, 0);
  //   xử lý realtime traXe
  const traXeOptions = generateTimeOptions(9, 0).map((time) => ({
    time,
    disabled:
      dayjs(time, "HH:mm").isBefore(dayjs("09:00", "HH:mm")) ||
      dayjs(time, "HH:mm").isAfter(dayjs("21:00", "HH:mm")),
  }));
  // note:  xử lý khi nhấn vào time
  const handleTimeSelect = (dropdown, time) => {
    const selectedTime = dayjs(time, "HH:mm");
    const startTime = dayjs("09:00", "HH:mm");
    const endTime = dayjs("21:00", "HH:mm");
    if (selectedTime.isBefore(startTime) || selectedTime.isAfter(endTime)) {
      alert(
        "Xe chỉ hỗ trợ giao nhận từ 09:00-21:00. Vui lòng điều chỉnh lại giờ nhận trả xe thích hợp."
      );
      return;
    }
    if (dropdown === "nhanXe") {
      setSelectedTimes((prev) => ({
        ...prev,
        nhanXe: time,
      }));
    } else {
      setSelectedTimes((prev) => ({ ...prev, traXe: time }));
    }
    setOpenDropdown(null);
  };

  const { id } = useParams();
  console.log(id);
  // note:  Gọi API để lấy thông tin chi tiết xe
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await getCarDetails(id);
        console.log(response.data.car);
        setBookings(response.data.car); // note:Cập nhật để lấy dữ liệu của thuộc tính car
      } catch (error) {
        console.error("Error fetching car details", error);
      }
    };
    fetchCarDetails();
  }, [id]);

  // note:   format days
  const formatDate = (date) => {
    const validDate = dayjs(date);

    //note: Kiểm tra xem đối tượng dayjs có hợp lệ không
    if (validDate.isValid()) {
      return validDate.format("DD/MM/YYYY"); //note: nếu hợp lệ, định dạng theo dạng DD/MM/YYYY
    }

    return "Ngày không hợp lệ"; // note:nếu không hợp lệ, trả về thông báo lỗi
  };
  // note:  show data
  const handleToggleDatePicker = (event) => {
    setShowDatePicker(!showDatePicker);

    //note: Lấy giá trị từ input và chuyển đổi thành dayjs
    const newStartDate = dayjs(event.target.value); //note: Chuyển chuỗi thành dayjs

    //note: Kiểm tra nếu ngày bắt đầu hợp lệ
    if (!newStartDate.isValid()) {
      console.error("Invalid start date");
      return;
    }
    setStartDate(newStartDate);
    const nextDay = newStartDate.add(1, "day");

    //note: Cập nhật ngày kết thúc
    setEndDate(nextDay);
  };
  // note: tính toán các thứ
  //note:  all days user book

  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end - start;
    const totalDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); //note: Số ngày giữa hai ngày
    return totalDays > 0 ? totalDays : 0;
  };

  // Số ngày thuê
  const totalDays = calculateTotalDays(startDate, endDate);

  // Tính đơn giá thuê
  const total_cost = (bookings?.rental_price || 0) * totalDays;
  //   price
  const formatPrice = (price) => {
    // Chuyển đổi số thành định dạng "xxxK" nếu số > 1000
    if (price >= 1000) {
      return `${(price / 1000).toLocaleString("vi-VN")}K/ngày`;
    }
    return `${price.toLocaleString("vi-VN")} VND/ngày`; // Format cho số dưới 1000
  };
  const formatPrice2 = (price) => {
    if (typeof price === "number") {
      return `${price.toLocaleString("vi-VN")}đ`;
    }
    return "0 VND"; // Hoặc trả về một giá trị khác nếu price không hợp lệ
  };

  return (
    <div>
      <div className="price-booking">
        <div className="price-discount">
          <p className="origin">
            <span>{bookings?.rental_price}</span>
          </p>
          <span className="tag-item discount">-14%</span>
        </div>
        <h4 style={{ fontWeight: "600" }}>
          <span className=""> {formatPrice(bookings?.rental_price ?? 0)}</span>
        </h4>
      </div>
      <div className="date-time-form " onClick={handleToggleDatePicker}>
        <div className="form-item">
          <label>Nhận xe </label>
          <div className="wrap-date-time">
            <div className="wrap-date">
              <span className="value">{formatDate(startDate)}</span>{" "}
            </div>
            <div className="wrap-time">
              <span className="value">{selectedTimes.nhanXe}</span>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="form-item">
          <label>Trả xe</label>
          <div className="wrap-date-time">
            <div className="wrap-date">
              <span className="value">{formatDate(endDate)}</span>{" "}
            </div>
            <div className="wrap-time">
              <span className="value">{selectedTimes.traXe}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown-form pointer ">
        <label className="pointer">Địa điểm giao nhận xe</label>
        <div className="wrap-form">
          <span className="value">
            {" "}
            <LocationDropdown onLocationChange={handleLocationChange} />
          </span>
        </div>
      </div>
      <div className="line-page"></div>
      <div className="price-container">
        <div className="price-item">
          <p className="df-align-center">
            <span>Đơn giá thuê</span>
          </p>
          <p className="cost">
            <span>{formatPrice2(bookings?.rental_price)} / ngày</span>
          </p>
        </div>
        <div className="price-item">
          <p className="df-align-center">
            {" "}
            <span>Bảo hiểm thuê xe</span>{" "}
          </p>
          <p className="cost">
            <span>86 520đ/ ngày</span>
          </p>
        </div>
        <div className="line-page"></div>
        <div className="price-item">
          <p>Tổng cộng</p>
          <p className="cost">
            <span>1 050 840đ </span>x 1 ngày
          </p>
        </div>
        <div className="price-item">
          <p>Mã giảm giá</p>
        </div>
        <div className="line-page"></div>
        <div className="price-item total">
          <p>Thành tiền</p>
          <p className="cost">
            <span>{formatPrice2(total_cost)} / ngày</span>
          </p>
        </div>
        {isLoading && <Loading />}
        <button
          className="btn btn-primary btn--m width-100 d-flex"
          onClick={handleBookingSubmit}
        >
          <div className="wrap-svg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9733 7.70015L8.46667 14.2668C8.29334 14.5268 8.01335 14.6668 7.71335 14.6668C7.62002 14.6668 7.52667 14.6535 7.43334 14.6268C7.05334 14.5068 6.79335 14.1668 6.79335 13.7735V10.0135C6.79335 9.86015 6.64667 9.72682 6.46667 9.72682L3.78001 9.6935C3.44001 9.6935 3.12668 9.50016 2.97335 9.20682C2.82668 8.92016 2.84668 8.5735 3.03335 8.30017L7.53335 1.7335C7.76001 1.40016 8.18001 1.25349 8.56668 1.37349C8.94668 1.49349 9.20668 1.83349 9.20668 2.22682V5.98683C9.20668 6.14017 9.35335 6.2735 9.53335 6.2735L12.22 6.30682C12.56 6.30682 12.8733 6.49349 13.0267 6.79349C13.1733 7.08016 13.1533 7.42682 12.9733 7.70015Z"
                fill="#FFC634"
              ></path>
            </svg>
          </div>
          Chọn thuê{" "}
        </button>
      </div>
      {/* Popup Date Picker */}
      {showDatePicker && (
        <div className="popup-overlay" onClick={() => setShowDatePicker(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="group-title d-flex">
              <h5>Thời gian</h5>
              <button
                className="btn btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="line-page"> </div>
            <div className="modal-calendar modal-body">
              {" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                  <DemoItem>
                    <DateCalendar
                      value={startDate}
                      minDate={dayjs()} // Đặt ngày nhỏ nhất cho ngày nhận xe là hôm nay
                      onChange={(newValue) => setStartDate(newValue)}
                    />
                  </DemoItem>
                  <DemoItem>
                    <DateCalendar
                      value={endDate}
                      minDate={startDate.add(1, "day")} // Đặt ngày trả xe không thể trước ngày nhận xe
                      onChange={(newValue) => setEndDate(newValue)}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              <div className="time-choose ">
                <div
                  className="time-choose__item"
                  onClick={() => handleToggleDropdown("nhanXe")}
                >
                  <div>
                    <p className="title-time">Nhận xe</p>
                    <p className="active-time">{selectedTimes.nhanXe}</p>
                  </div>
                  <div
                    className={`dropdown-time ${
                      openDropdown === "nhanXe" ? "show" : "hide"
                    }`}
                  >
                    {nhanXeOptions.map((time, index) => (
                      <div className="custom-radio" key={index}>
                        <input
                          type="radio"
                          id={`nhanXe${index}`}
                          name="r-startTime-nhanXe"
                          value={time}
                          checked={selectedTimes.nhanXe === time}
                          onChange={() => handleTimeSelect("nhanXe", time)}
                        />
                        <label htmlFor={`nhanXe${index}`}>{time}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="wrap-svg">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.63 21.2498H12.38C7.34001 21.2498 3.26001 17.1598 3.26001 12.1298V11.8798C3.26001 6.83977 7.35001 2.75977 12.38 2.75977H12.63C17.67 2.75977 21.75 6.84977 21.75 11.8798V12.1298C21.75 17.1598 17.66 21.2498 12.63 21.2498Z"
                      stroke="#AAAAAA"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M9.40991 12H15.5699"
                      stroke="#AAAAAA"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M15.5899 11.9993L13.1299 9.5293"
                      stroke="#AAAAAA"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M15.5899 12L13.1299 14.47"
                      stroke="#AAAAAA"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="time-choose">
                  <div
                    className="time-choose__item"
                    onClick={() => handleToggleDropdown("traXe")}
                  >
                    <div>
                      <p className="title-time">Trả xe</p>
                      <p className="active-time">{selectedTimes.traXe}</p>
                    </div>
                    <div
                      className={`dropdown-time ${
                        openDropdown === "traXe" ? "show" : "hide"
                      }`}
                    >
                      {traXeOptions.map((option, index) => (
                        <div className="custom-radio" key={index}>
                          {" "}
                          <input
                            type="radio"
                            id={`traXe${index}`}
                            name={`r-startTime-${index}`}
                            value={option.time}
                            disabled={option.disabled}
                            onChange={() =>
                              handleTimeSelect("traXe", option.time)
                            }
                          />{" "}
                          <label htmlFor={`traXe${index}`}>{option.time}</label>{" "}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="info-time">
                <div className="info-time__item">
                  <p className="time">
                    {" "}
                    {selectedTimes.nhanXe}, {formatDate(startDate)} -{" "}
                    {selectedTimes.traXe}, {formatDate(endDate)}{" "}
                  </p>
                  <p className="df-align-center total">
                    Thời gian thuê:{" "}
                    <span
                      className="fontWeight-6 text-primary"
                      style={{ margin: "0px 2px" }}
                    >
                      {calculateTotalDays(startDate, endDate)} ngày
                    </span>
                  </p>
                </div>
                <div className="wrap-btn">
                  <a
                    className="btn btn--s btn-primary"
                    onClick={handleCloseModal}
                  >
                    Tiếp tục
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hiển thị ModalPopup khi openModal là true */}
      <ModalPopup
        open={openModal}
        handleClose={handleCloseModal}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
}

export default Booking;
