import React, { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import ModalPopup from "../event/popup";
// note:import data cho form booking
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// note: api car
import { getBooking, getCarDetails } from "../../../lib/Axiosintance";
import LocationDropdown from "./district_province";
// note: api post booking
import { addBookingUser } from "../../../lib/Axiosintance";
import { useAuth } from "../../Private/Auth";
import { useNavigate } from "react-router-dom";
import Loading from "../event/loading";
import { useBooking } from "../../Private/bookingContext";
import { getvoucher } from "../../../lib/Axiosintance";
import "dayjs/locale/vi";
dayjs.locale("vi");

function Booking() {
  // note: get booking
  const [bookedDates, setBookedDates] = useState([]);
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
  // note: tb lỗi
  const [error, setError] = useState("");
  // note: set value voucher
  const [voucher, setVoucher] = useState([]);
  // note:allow state user voucher
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  // note: handle data place
  const handleLocationChange = (province, district) => {
    setSelectedProvince(province);
    setSelectedDistrict(district);
  };
  // note: loadding
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDatePicker(false);
  };
  //note: show date/time
  const [showDatePicker, setShowDatePicker] = useState(false);
  //note: show voucher
  const [showVoucher, setshowVoucher] = useState(false);
  // note:  set value for dropdown and time
  const [openDropdown, setOpenDropdown] = useState(null);

  const { id: carId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

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
    // note: Giờ nhận và trả xe từ selectedTimes
    const nhanXeTime = selectedTimes.nhanXe;
    const traXeTime = selectedTimes.traXe;
    // note: Kết hợp ngày và giờ thành datetime
    const formattedStartDate = `${dayjs(startDate).format(
      "YYYY-MM-DD"
    )} ${nhanXeTime}`;
    const formattedEndDate = `${dayjs(endDate).format(
      "YYYY-MM-DD"
    )} ${traXeTime}`;

    console.log("Start Date:", formattedStartDate);
    console.log("End Date:", formattedEndDate);

    const bookingData = {
      car_id: carId,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      booking_date: new Date().toISOString(),
      city: selectedProvince ? selectedProvince.label : null,
      address: selectedDistrict ? selectedDistrict.label : null,
      total_cost: total_cost,
      total_cost_after_voucher: total_voucher,
      voucher_id: selectedVoucher ? selectedVoucher.voucher_id : null,
    };

    if (!bookingData.voucher_id) {
      delete bookingData.voucher_id;
    }

    console.log(bookingData);

    try {
      //note: Gọi hàm addBooking để thực hiện API call
      const response = await addBookingUser(bookingData, apiToken);
      console.log("response", response);

      const { booking } = response;
      localStorage.setItem("booking_id", booking.booking_id);
      if (response.message === "Booking thành công") {
        const totalCost = bookingData?.total_cost;
        const totalCostAfterVoucher =
          total_voucher ?? bookingData?.total_voucher;
        if (totalCost > 0 && totalCostAfterVoucher > 0) {
          console.log("Booking thành công, chuyển trang");
          setTimeout(() => {
            setIsLoading(false);
            navigate(`/payment_car/${booking.booking_id}`);
          }, 3000);
        } else {
          console.error(
            "Giá trị total hoặc total_cost_after_voucher bằng 0, không chuyển trang",
            { totalCost, totalCostAfterVoucher }
          );
        }
      } else {
        console.log("lõi ne", Error);
      }
    } catch (error) {
      console.error("Có lỗi khi đặt xe:", error.response?.data?.message);
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
  // note:  Gọi API để lấy thông tin chi tiết xe
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await getCarDetails(id);
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
    setError(""); // Xóa lỗi nếu ngày hợp lệ

    const nextDay = newStartDate.add(1, "day");
    if (isBookedDate(nextDay)) {
      setError(
        "* Ngày trả xe bị trùng với lịch đặt trước. Vui lòng chọn ngày khác."
      );
      return;
    }
    // Kiểm tra nếu ngày bắt đầu bị trùng với các ngày đã được đặt
    if (isBookedDate(newStartDate)) {
      setError(
        "* Xe bận trong khoảng thời gian trên. Vui lòng đặt xe khác hoặc thay đổi lịch trình thích hợp."
      );
      return;
    }

    //note: Cập nhật ngày kết thúc
    setEndDate(nextDay);
    setError(""); // Xóa lỗi nếu ngày hợp lệ
  };

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

  // Idea: voucher
  const handleToggleVoucher = (event) => {
    setshowVoucher(!showVoucher);
  };

  const handleRemoveVoucher = () => {
    setSelectedVoucher(null); // note: Hủy chọn voucher
  };
  //note: get data voucher

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await getvoucher();
        setVoucher(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVoucher();
  }, []);

  const handldetoggleTotalVoucher = (voucher) => {
    setSelectedVoucher(voucher);
  };
  // note: usememo giúp lưu lại giá trị tính toán
  // note: Tính toán giá giảm (memoized)
  const discountAmount = useMemo(() => {
    return selectedVoucher
      ? (total_cost * (selectedVoucher.discount_percentage || 0)) / 100
      : 0;
  }, [selectedVoucher, total_cost]);

  //note: Tổng tiền sau giảm giá (memoized)
  const total_voucher = useMemo(() => {
    return selectedVoucher ? total_cost - discountAmount : total_cost;
  }, [selectedVoucher, total_cost, discountAmount]);
  // note: getbooking
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBooking();
        setBookedDates(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  // Tính toán tất cả các ngày đã được đặt từ start_date đến end_date
  const bookedDatesArray = [];

  bookedDates.forEach((booking) => {
    const start = dayjs(booking.start_date);
    const end = dayjs(booking.end_date);

    for (
      let date = start;
      date.isBefore(end) || date.isSame(end, "day");
      date = date.add(1, "day")
    ) {
      bookedDatesArray.push(date.format("YYYY-MM-DD"));
    }
  });

  // Hàm kiểm tra ngày có bị đặt hay không
  const isBookedDate = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    return bookedDatesArray.includes(formattedDate);
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

        <div className="line-page"></div>
        <div className="price-item">
          <p>Tổng cộng</p>
          <p className="cost">
            <span>{formatPrice2(total_cost)} </span> x{" "}
            {calculateTotalDays(startDate, endDate)} ngày
          </p>
        </div>
        <div className="line-page"></div>
        <div className="promotion-radio__item" onClick={handleToggleVoucher}>
          <div className="custom-radio-voucher">
            <label for="code">
              <div className="promo-text">
                <div className="promo-text-main">
                  {/* Hiển thị mã giảm giá nếu có, ngược lại hiển thị SVG */}
                  {selectedVoucher ? (
                    <div className="d-flex gap-2">
                      <div className="wrap-svg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.3 10.8394C21.69 10.8394 22 10.5294 22 10.1394V9.20938C22 5.10938 20.75 3.85938 16.65 3.85938H7.35C3.25 3.85937 2 5.10938 2 9.20938V9.67938C2 10.0694 2.31 10.3794 2.7 10.3794C3.6 10.3794 4.33 11.1094 4.33 12.0094C4.33 12.9094 3.6 13.6294 2.7 13.6294C2.31 13.6294 2 13.9394 2 14.3294V14.7994C2 18.8994 3.25 20.1494 7.35 20.1494H16.65C20.75 20.1494 22 18.8994 22 14.7994C22 14.4094 21.69 14.0994 21.3 14.0994C20.4 14.0994 19.67 13.3694 19.67 12.4694C19.67 11.5694 20.4 10.8394 21.3 10.8394ZM9 8.87938C9.55 8.87938 10 9.32938 10 9.87938C10 10.4294 9.56 10.8794 9 10.8794C8.45 10.8794 8 10.4294 8 9.87938C8 9.32938 8.44 8.87938 9 8.87938ZM15 15.8794C14.44 15.8794 13.99 15.4294 13.99 14.8794C13.99 14.3294 14.44 13.8794 14.99 13.8794C15.54 13.8794 15.99 14.3294 15.99 14.8794C15.99 15.4294 15.56 15.8794 15 15.8794ZM15.9 9.47937L9.17 16.2094C9.02 16.3594 8.83 16.4294 8.64 16.4294C8.45 16.4294 8.26 16.3594 8.11 16.2094C7.82 15.9194 7.82 15.4394 8.11 15.1494L14.84 8.41938C15.13 8.12938 15.61 8.12938 15.9 8.41938C16.19 8.70938 16.19 9.18937 15.9 9.47937Z"
                            fill="#5FCF86"
                          ></path>
                        </svg>
                      </div>
                      <p>{selectedVoucher.voucher_code}</p>{" "}
                      <div className="close" onClick={handleRemoveVoucher}>
                        x
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex gap-2">
                      <div className="wrap-svg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.3 10.8394C21.69 10.8394 22 10.5294 22 10.1394V9.20938C22 5.10938 20.75 3.85938 16.65 3.85938H7.35C3.25 3.85937 2 5.10938 2 9.20938V9.67938C2 10.0694 2.31 10.3794 2.7 10.3794C3.6 10.3794 4.33 11.1094 4.33 12.0094C4.33 12.9094 3.6 13.6294 2.7 13.6294C2.31 13.6294 2 13.9394 2 14.3294V14.7994C2 18.8994 3.25 20.1494 7.35 20.1494H16.65C20.75 20.1494 22 18.8994 22 14.7994C22 14.4094 21.69 14.0994 21.3 14.0994C20.4 14.0994 19.67 13.3694 19.67 12.4694C19.67 11.5694 20.4 10.8394 21.3 10.8394ZM9 8.87938C9.55 8.87938 10 9.32938 10 9.87938C10 10.4294 9.56 10.8794 9 10.8794C8.45 10.8794 8 10.4294 8 9.87938C8 9.32938 8.44 8.87938 9 8.87938ZM15 15.8794C14.44 15.8794 13.99 15.4294 13.99 14.8794C13.99 14.3294 14.44 13.8794 14.99 13.8794C15.54 13.8794 15.99 14.3294 15.99 14.8794C15.99 15.4294 15.56 15.8794 15 15.8794ZM15.9 9.47937L9.17 16.2094C9.02 16.3594 8.83 16.4294 8.64 16.4294C8.45 16.4294 8.26 16.3594 8.11 16.2094C7.82 15.9194 7.82 15.4394 8.11 15.1494L14.84 8.41938C15.13 8.12938 15.61 8.12938 15.9 8.41938C16.19 8.70938 16.19 9.18937 15.9 9.47937Z"
                            fill="#5FCF86"
                          ></path>
                        </svg>
                      </div>
                      <p>Mã khuyến mãi</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="promo-price">
                {/* Kiểm tra trạng thái */}
                {selectedVoucher ? (
                  <div>
                    <p>
                      <strong>- {discountAmount?.toLocaleString()} VND</strong>
                    </p>
                  </div>
                ) : (
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8299 11.2897L10.5899 7.0497C10.497 6.95598 10.3864 6.88158 10.2645 6.83081C10.1427 6.78004 10.012 6.75391 9.87994 6.75391C9.74793 6.75391 9.61723 6.78004 9.49537 6.83081C9.37351 6.88158 9.26291 6.95598 9.16994 7.0497C8.98369 7.23707 8.87915 7.49052 8.87915 7.7547C8.87915 8.01889 8.98369 8.27234 9.16994 8.4597L12.7099 11.9997L9.16994 15.5397C8.98369 15.7271 8.87915 15.9805 8.87915 16.2447C8.87915 16.5089 8.98369 16.7623 9.16994 16.9497C9.26338 17.0424 9.3742 17.1157 9.49604 17.1655C9.61787 17.2152 9.74834 17.2405 9.87994 17.2397C10.0115 17.2405 10.142 17.2152 10.2638 17.1655C10.3857 17.1157 10.4965 17.0424 10.5899 16.9497L14.8299 12.7097C14.9237 12.6167 14.9981 12.5061 15.0488 12.3843C15.0996 12.2624 15.1257 12.1317 15.1257 11.9997C15.1257 11.8677 15.0996 11.737 15.0488 11.6151C14.9981 11.4933 14.9237 11.3827 14.8299 11.2897Z"
                        fill="#263D2A"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
        <div className="line-page"></div>
        <div className="price-item total">
          <p>Thành tiền</p>
          <p className="cost">
            <span>{formatPrice2(total_voucher)} / ngày</span>
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
                      shouldDisableDate={(date) => isBookedDate(date)} // Disable ngày đã được đặt
                    />
                  </DemoItem>
                  <DemoItem>
                    <DateCalendar
                      value={endDate}
                      minDate={startDate.add(1, "day")} // Đặt ngày trả xe không thể trước ngày nhận xe
                      onChange={(newValue) => setEndDate(newValue)}
                      shouldDisableDate={(date) => isBookedDate(date)}
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
              <div className="time-avail">
                <p>
                  {" "}
                  Quý khách hàng lưu ý: Trung tâm sẽ hỗ trợ nhận xe và trả xe{" "}
                  vào <br /> khoảng thời gian từ 9:00 sáng và đến 21:00 tối. Xin
                  cảm ơn
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
      {/* Popup voucher */}
      {showVoucher && (
        <div className="popup-overlay" onClick={() => setshowVoucher(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="group-title d-flex">
              <h5>Mã giảm giá</h5>
              <button
                className="btn btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="line-page"> </div>
            <div className="modal-body">
              <div className="add-promotion">
                {voucher.length > 0 ? (
                  voucher.map((vouchers, index) => (
                    <div
                      className="add-promotion__item "
                      key={vouchers.voucher_id}
                    >
                      <div className="wrap-svg">
                        <svg
                          width="42"
                          height="42"
                          viewBox="0 0 42 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.4"
                            d="M6.98057 25.6522L4.32059 22.9924C3.23559 21.9074 3.23559 20.1224 4.32059 19.0374L6.98057 16.3772C7.43557 15.9222 7.80307 15.0297 7.80307 14.3997V10.6373C7.80307 9.0973 9.06307 7.83725 10.6031 7.83725H14.3656C14.9956 7.83725 15.8881 7.4698 16.3431 7.0148L19.0031 4.35477C20.0881 3.26977 21.8731 3.26977 22.9581 4.35477L25.6181 7.0148C26.0731 7.4698 26.9656 7.83725 27.5956 7.83725H31.3581C32.8981 7.83725 34.1581 9.0973 34.1581 10.6373V14.3997C34.1581 15.0297 34.5256 15.9222 34.9806 16.3772L37.6406 19.0374C38.7256 20.1224 38.7256 21.9074 37.6406 22.9924L34.9806 25.6522C34.5256 26.1072 34.1581 26.9997 34.1581 27.6297V31.3922C34.1581 32.9322 32.8981 34.1922 31.3581 34.1922H27.5956C26.9656 34.1922 26.0731 34.5599 25.6181 35.0149L22.9581 37.6749C21.8731 38.7599 20.0881 38.7599 19.0031 37.6749L16.3431 35.0149C15.8881 34.5599 14.9956 34.1922 14.3656 34.1922H10.6031C9.06307 34.1922 7.80307 32.9322 7.80307 31.3922V27.6297C7.80307 26.9822 7.43557 26.0897 6.98057 25.6522Z"
                            fill="#68C187"
                          ></path>
                          <path
                            d="M26.247 28C25.267 28 24.4795 27.2125 24.4795 26.25C24.4795 25.2875 25.267 24.5 26.2295 24.5C27.192 24.5 27.9795 25.2875 27.9795 26.25C27.9795 27.2125 27.2095 28 26.247 28Z"
                            fill="#68C187"
                          ></path>
                          <path
                            d="M15.7675 17.5C14.7875 17.5 14 16.7125 14 15.75C14 14.7875 14.7875 14 15.75 14C16.7125 14 17.5 14.7875 17.5 15.75C17.5 16.7125 16.73 17.5 15.7675 17.5Z"
                            fill="#68C187"
                          ></path>
                          <path
                            d="M15.7525 27.5659C15.42 27.5659 15.0875 27.4436 14.825 27.1811C14.3175 26.6736 14.3175 25.8334 14.825 25.3259L25.3249 14.8259C25.8324 14.3184 26.6724 14.3184 27.1799 14.8259C27.6874 15.3334 27.6874 16.1735 27.1799 16.681L16.6799 27.1811C16.4174 27.4436 16.0849 27.5659 15.7525 27.5659Z"
                            fill="#68C187"
                          ></path>
                        </svg>
                      </div>
                      <div className="promotion-info">
                        <p className="name"> {vouchers.voucher_code} </p>
                        <p>Giảm {vouchers.discount_percentage}%.</p>
                        <div className="date warning">
                          <div className="wrap-svg">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 7.33398V10.4407"
                                stroke="#666666"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                                fill="#666666"
                              ></path>
                              <path
                                d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                                stroke="#666666"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </div>
                          <p style={{ color: "#f79009" }}>
                            hết hạn sau ngày{" "}
                            {new Date(
                              vouchers.expiration_date
                            ).toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}{" "}
                          </p>
                        </div>
                      </div>
                      <a
                        className="btn btn-primary"
                        onClick={() => handldetoggleTotalVoucher(vouchers)}
                      >
                        Áp dụng
                      </a>
                    </div>
                  ))
                ) : (
                  <p>No vouchers available</p>
                )}
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
