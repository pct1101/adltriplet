import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import { getAllCars } from "../../../lib/Axiosintance";
// note:import data cho form booking
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useBooking } from "../../Private/bookingContext";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { Link } from "react-router-dom";
import { API_URL_IMG } from "../../../lib/Axiosintance";

function Find_car() {
  // note: car
  const [cars, setcars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null);
  //note: show date/time
  const [showDatePicker, setShowDatePicker] = useState(false);
  // note: open modal
  const [openModal, setOpenModal] = useState(false);
  // note:close
  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDatePicker(false);
  };
  //   note: scroll
  const [isFixed, setIsFixed] = useState(false); // Trạng thái để điều khiển lớp CSS
  const [scrollPos, setScrollPos] = useState(0); // Vị trí cuộn hiện tại

  // note: formdate
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedTimes,
    setSelectedTimes,
  } = useBooking();

  // note:Toggle none/block dropdown
  const handleToggleDropdown = (dropdownName) => {
    //note: open dropdown or none
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // note:  show data handleToggleDatePicker
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

  // note: fetch car
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getAllCars();
        setcars(response.data.cars);
      } catch (error) {
        error("ko thể lấy đuộcxe");
      }
    };

    fetchCars();
  }, []);

  // note: selected car
  useEffect(() => {
    if (Array.isArray(cars) && cars.length > 0) {
      const defaultCar = cars.find((car) => car.car_id === 1) || cars[0];
      setSelectedCar(defaultCar);
    }
  }, [cars]);

  const handleSelectCar = (car) => {
    setSelectedCar(car); // Cập nhật xe được chọn
    setOpenDropdown(false); // Đóng dropdown sau khi chọn
  };

  //  note: formatdate
  const formatDate = (date) => {
    const validDate = dayjs(date);

    //note: Kiểm tra xem đối tượng dayjs có hợp lệ không
    if (validDate.isValid()) {
      return validDate.format("DD/MM/YYYY"); //note: nếu hợp lệ, định dạng theo dạng DD/MM/YYYY
    }

    return "Ngày không hợp lệ"; // note:nếu không hợp lệ, trả về thông báo lỗi
  };

  //note:  all days user book
  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end - start;
    const totalDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); //note: Số ngày giữa hai ngày
    return totalDays > 0 ? totalDays : 0;
  };
  //   note: format price
  const formatPrice = (price) => {
    // Chuyển đổi số thành định dạng "xxxK" nếu số > 1000
    if (price >= 1000) {
      return `${(price / 1000).toLocaleString("vi-VN")}K`;
    }
    return `${price.toLocaleString("vi-VN")} VND/ngày`; // Format cho số dưới 1000
  };

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  //   note: scroll
  // Hàm để xử lý sự kiện cuộn
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 100) {
      // Nếu cuộn xuống 100px hoặc hơn
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }

    setScrollPos(currentScrollPos);
  };

  useEffect(() => {
    // Lắng nghe sự kiện cuộn trang
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener khi component bị hủy
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="find-car">
        <Header></Header>{" "}
        <div
          className={`search-option ${isFixed ? "search-option-fixed" : ""}`}
        >
          <div className="search">
            <div className="search-form sd">
              <div className="search-form__item address">
                <div className="title d-flex">
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.75C8.31 2.75 5.3 5.76 5.3 9.45C5.3 14.03 11.3 20.77 11.55 21.05C11.79 21.32 12.21 21.32 12.45 21.05C12.71 20.77 18.7 14.03 18.7 9.45C18.7 5.76 15.69 2.75 12 2.75Z"
                        stroke="#767676"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M12.3849 11.7852C13.6776 11.5795 14.5587 10.3647 14.3529 9.07204C14.1472 7.77936 12.9325 6.89824 11.6398 7.104C10.3471 7.30976 9.46597 8.52449 9.67173 9.81717C9.87749 11.1099 11.0922 11.991 12.3849 11.7852Z"
                        stroke="#767676"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <p>Hãng xe</p>
                </div>
                <div className="choose" onClick={toggleDropdown}>
                  <div className="choose-item has-arrow" for="1">
                    <div className="here-autocomplete">
                      <p className="address pointer ">
                        {" "}
                        <div
                          className={`dropdown-time ${
                            openDropdown ? "show" : "hide"
                          }`}
                        >
                          {cars.map((car, index) => (
                            <div
                              className="custom-radio"
                              key={index}
                              onClick={() => handleSelectCar(car)}
                            >
                              <input
                                type="radio"
                                id={`car${index}`}
                                name="car"
                                checked={selectedCar?.car_id === car.car_id}
                                readOnly
                              />
                              <label htmlFor={`car${index}`}>
                                {car.car_name}
                              </label>
                            </div>
                          ))}
                        </div>
                        {selectedCar ? selectedCar.car_name : "Chọn xe"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="line line-address-time"></div>
              <div className="search-form__item">
                <div className="title  d-flex">
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.86 4.81V2.75"
                        stroke="#767676"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M17.14 4.81V2.75"
                        stroke="#767676"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M18.05 3.78003H5.95C4.18 3.78003 2.75 5.21003 2.75 6.98003V18.06C2.75 19.83 4.18 21.26 5.95 21.26H18.06C19.83 21.26 21.26 19.83 21.26 18.06V6.98003C21.25 5.21003 19.82 3.78003 18.05 3.78003Z"
                        stroke="#767676"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M2.75 7.8999H21.25"
                        stroke="#767676"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M18 15.49C18.5523 15.49 19 15.0423 19 14.49C19 13.9377 18.5523 13.49 18 13.49C17.4477 13.49 17 13.9377 17 14.49C17 15.0423 17.4477 15.49 18 15.49Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M14 15.49C14.5523 15.49 15 15.0423 15 14.49C15 13.9377 14.5523 13.49 14 13.49C13.4477 13.49 13 13.9377 13 14.49C13 15.0423 13.4477 15.49 14 15.49Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M10 15.49C10.5523 15.49 11 15.0423 11 14.49C11 13.9377 10.5523 13.49 10 13.49C9.44772 13.49 9 13.9377 9 14.49C9 15.0423 9.44772 15.49 10 15.49Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M6 15.49C6.55228 15.49 7 15.0423 7 14.49C7 13.9377 6.55228 13.49 6 13.49C5.44772 13.49 5 13.9377 5 14.49C5 15.0423 5.44772 15.49 6 15.49Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M14 18.97C14.5523 18.97 15 18.5223 15 17.97C15 17.4177 14.5523 16.97 14 16.97C13.4477 16.97 13 17.4177 13 17.97C13 18.5223 13.4477 18.97 14 18.97Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M10 18.97C10.5523 18.97 11 18.5223 11 17.97C11 17.4177 10.5523 16.97 10 16.97C9.44772 16.97 9 17.4177 9 17.97C9 18.5223 9.44772 18.97 10 18.97Z"
                        fill="#767676"
                      ></path>
                      <path
                        d="M6 18.97C6.55228 18.97 7 18.5223 7 17.97C7 17.4177 6.55228 16.97 6 16.97C5.44772 16.97 5 17.4177 5 17.97C5 18.5223 5.44772 18.97 6 18.97Z"
                        fill="#767676"
                      ></path>
                    </svg>
                  </div>
                  <p>Đặt lịch</p>
                </div>
                <div className="choose" onClick={handleToggleDatePicker}>
                  {" "}
                  <span>
                    {" "}
                    {selectedTimes.nhanXe}, {formatDate(startDate)} -{" "}
                    {selectedTimes.traXe}, {formatDate(endDate)}{" "}
                  </span>
                </div>
              </div>
              <a className="btn btn-primary" target="">
                Tìm Xe
              </a>
            </div>
          </div>
        </div>
        {showDatePicker && (
          <div
            className="popup-overlay"
            onClick={() => setShowDatePicker(false)}
          >
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
                        locale="vi" // Đảm bảo locale là tiếng Việt
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </DemoItem>
                    <DemoItem>
                      <DateCalendar
                        value={endDate}
                        minDate={startDate.add(1, "day")} // Đặt ngày trả xe không thể trước ngày nhận xe
                        locale="vi"
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
                            <label htmlFor={`traXe${index}`}>
                              {option.time}
                            </label>{" "}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="time-avail">
                  <p>
                    {" "}
                    Quý khách hàng lưu ý: Trung tâm sẽ hỗ trợ nhận xe và trả xe
                    vào <br /> khoảng thời gian từ 9:00 sáng và đến 21:00 tối.
                    Xin cảm ơn
                  </p>
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
      </div>
      <div className="container">
        <div className="container" style={{ margin: "8rem 0 2rem 0" }}>
          <div className="col4-mg20">
            {cars
              .filter((car) => car.car_id >= 1) // Lọc các sản phẩm xe có id lớn hơn hoặc = 1
              .splice(0, 100)
              .map((car) => (
                <div className="item item-car">
                  <div className="item-box">
                    <div className="img-car">
                      <div className="fix-img">
                        {" "}
                        <Link to={`/detai_product/${car.car_id}`}>
                          <img
                            src={`${API_URL_IMG}${car.car_image}`}
                            className="scale-img"
                            alt={car.car_name}
                          />
                        </Link>
                      </div>
                    </div>
                    <span className="discount">Giảm 16%</span>
                    <div className="decs-car">
                      <div className="desc-tag">
                        <span className="tag-item transmission">
                          Số tự động
                        </span>
                        <span className="tag-item non-mortgage">
                          Giao xe tận nơi
                        </span>
                      </div>
                      <div className="desc-name">
                        <p> {car.car_name} </p>
                      </div>
                      <div className="desc-address-price"></div>
                      <div className="line-page"></div>
                      <div className="desc-info-price">
                        <div className="info">
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
                              style={{ marginRight: " 4px" }}
                            >
                              <g clip-path="url(#clip0_1087_41996)">
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
                                  d="M14.9062 3.83154H7.40625C6.80316 3.83154 6.3125 4.3222 6.3125 4.92529V13.9686C6.3125 14.5186 6.72066 14.9749 7.25 15.051V15.5309C7.25 15.7898 7.45987 15.9997 7.71875 15.9997C7.97763 15.9997 8.1875 15.7898 8.1875 15.5309V15.0623H14.125V15.5309C14.125 15.7898 14.3349 15.9997 14.5938 15.9997C14.8526 15.9997 15.0625 15.7898 15.0625 15.5309V15.051C15.5918 14.9749 16 14.5186 16 13.9686V4.92529C16 4.32217 15.5093 3.83154 14.9062 3.83154ZM9.125 13.3436C9.125 13.6024 8.91513 13.8123 8.65625 13.8123C8.39737 13.8123 8.1875 13.6024 8.1875 13.3436V5.55029C8.1875 5.29142 8.39737 5.08154 8.65625 5.08154C8.91513 5.08154 9.125 5.29142 9.125 5.55029V13.3436ZM13.6562 13.8123C13.3974 13.8123 13.1875 13.6024 13.1875 13.3436V5.55029C13.1875 5.29142 13.3974 5.08154 13.6562 5.08154C13.9151 5.08154 14.125 5.29142 14.125 5.55029V13.3436C14.125 13.6024 13.9151 13.8123 13.6562 13.8123Z"
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
                          <span className="info">100+ chuyến</span>
                        </div>
                        <div className="wrap-price">
                          <div className="price">
                            <span className="price-origin"></span>
                            <span className="price-special ">
                              <span>{formatPrice(car.rental_price)}</span>
                            </span>
                            /ngày
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>{" "}
      <Footer></Footer>
    </div>
  );
}

export default Find_car;
