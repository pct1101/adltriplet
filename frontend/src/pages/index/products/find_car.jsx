import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import { getAllCars, searchCars, searchSeats } from "../../../lib/Axiosintance";
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
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Slider } from "@mui/material";
// note: slide
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { API_URL_LOGO } from "../../../lib/Axiosintance";

function Find_car() {
  // note:findcar
  const location = useLocation();

  const [searchResultss, setSearchResults] = useState([]);

  const searchResults = location.state?.results || [];
  const [reset, setReset] = useState("");

  // note: set state seats
  const [selectedSeats, setSelectedSeats] = useState([]);
  // note: set state số sàn/số tự động
  const [SelectedTranmission, setSelectedTranmission] = useState([]);

  // note: set state brand
  const [SelectedBrand, setSelectedBrand] = useState([]);
  // note: tìm kiếm theo chỗ ngồi
  const [filteredCars, setFilteredCars] = useState(searchResults);

  // note: car
  const [cars, setcars] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);
  //note: show date/time
  const [showDatePicker, setShowDatePicker] = useState(false);
  //note: show seats
  const [showseats, setShowSeats] = useState(false);
  //note: show transmission_type
  const [showtransmission_type, setshowtransmission_type] = useState(false);
  //note: show change_price
  const [show_price, setshow_price] = useState(false);
  //note: show brand
  const [showBrand, setshowBrand] = useState(false);
  //note: show brand
  const [showModelCar, setshowModelCar] = useState(false);

  // note: open modal
  const [openModal, setOpenModal] = useState(false);
  // note: handlechange
  const [minPrice, setMinPrice] = useState(300000);
  const [maxPrice, setMaxPrice] = useState(3000000);

  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2024);
  // note: swiper
  const [swiperRef, setSwiperRef] = useState(null);
  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );

  // note:close
  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDatePicker(false);
    setShowSeats(false);
    setshowtransmission_type(false);
    setshow_price(false);
    setshowBrand(false);
    setshowModelCar(false);
  };
  //   note: scroll
  const [isFixed, setIsFixed] = useState(false); // Trạng thái để điều khiển lớp CSS
  const [scrollPos, setScrollPos] = useState(0); // Vị trí cuộn hiện tại

  const [error, setError] = useState("");

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
  //note: handle showPopup
  const handleToggleSeats = () => {
    setShowSeats(!showseats);
  };
  const handleToggleTransmission_type = () => {
    setshowtransmission_type(!showtransmission_type);
  };
  const handleTogglePrice = () => {
    setshow_price(!show_price);
  };
  const handleToggleBrand = () => {
    setshowBrand(!showBrand);
  };
  const handleToggleModelCar = () => {
    setshowModelCar(!showModelCar);
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
  // note: handleChangePrice
  const handleChangePrice = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };
  // note: handleChange
  const handleChangeYears = (event, newValue) => {
    setMinYear(newValue[0]);
    setMaxYear(newValue[1]);
  };
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

  const resetItem = () => {
    setReset("");
    setFilteredCars(location.state?.results || []);
    handleSelectSeats();
    handleSelectBrand();
    handleSelectTranmission();
    setMinPrice(300000); // Đặt về giá trị mặc định (nếu giá trị nhỏ nhất là 0)
    setMaxPrice(3000000);
    setMinYear(2000);
    setMaxYear(2024);
  };

  //note: Hàm nhóm xe theo số chỗ ngồi
  const groupCarsBySeats = () => {
    const groupedCars = {};
    cars.forEach((car) => {
      const seats = car.seats; // Lấy số chỗ ngồi từ mỗi xe
      if (!groupedCars[seats]) {
        groupedCars[seats] = [];
      }
      groupedCars[seats].push(car);
    });
    return groupedCars;
  };

  const groupedCars = groupCarsBySeats();

  //note: Hàm hiển thị các xe theo số chỗ ngồi đã chọn
  const handleSelectSeats = (seats) => {
    if (selectedSeats === seats) {
      // Nếu loại xe đã được chọn, thì bỏ chọn
      setSelectedSeats(null);
    } else {
      // Nếu loại xe chưa được chọn, thì chọn loại xe đó và bỏ loại xe cũ
      setSelectedSeats(seats);
    }
  };

  //note: Hàm nhóm xe theo loại xe(xe sàn, xe tự động)
  const groupCarsByTranmission_Type = () => {
    const groupCarsByTranmission = {};

    cars.forEach((car) => {
      const transmission_type = car.transmission_type; // Lấy số chỗ ngồi từ mỗi xe
      if (!groupCarsByTranmission[transmission_type]) {
        groupCarsByTranmission[transmission_type] = [];
      }
      groupCarsByTranmission[transmission_type].push(car);
    });
    return groupCarsByTranmission;
  };
  const groupCarsByTranmission = groupCarsByTranmission_Type();
  console.log(groupCarsByTranmission);

  //note: Hàm hiển thị các xe theo  loại xe(xe sàn, xe tự động)
  const handleSelectTranmission = (transmission_type) => {
    if (SelectedTranmission === transmission_type) {
      setSelectedTranmission(null);
    } else {
      setSelectedTranmission(transmission_type);
    }
  };

  //note: Hàm nhóm xe theo brand
  const groupCarsByBrand_name = () => {
    const groupCarsByBrand = {};
    cars.forEach((car) => {
      const brand_name = car.brand.brand_name; // Lấy số chỗ ngồi từ mỗi xe
      if (!groupCarsByBrand[brand_name]) {
        groupCarsByBrand[brand_name] = [];
      }
      groupCarsByBrand[brand_name].push(car);
    });
    return groupCarsByBrand;
  };

  const groupCarsByBrand = groupCarsByBrand_name();

  //note: Hàm hiển thị các xe theo brand
  const handleSelectBrand = (brand_name) => {
    setSelectedBrand(brand_name);
  };

  // note: navigate
  const navigate = useNavigate();

  // note: search
  const handleSearch = async () => {
    try {
      if (!startDate || !endDate) {
        setError("Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc!");
        return;
      }
      const formatDate = (date) => new Date(date).toISOString().split("T")[0];
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      // Gọi hàm tìm kiếm
      const results = await searchCars(startDate, endDate);

      if (results?.cars?.length > 0) {
        const params = new URLSearchParams({
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        });
        navigate(`/find_car?${params.toString()}`, {
          state: { results: results.cars },
        });
      } else {
        console.log("Không tìm thấy xe phù hợp.");
      }
      setSearchResults(results.data); // Lưu kết quả vào state
      setError(""); // Xóa lỗi
    } catch (error) {
      setError("Không thể tìm kiếm xe. Vui lòng thử lại sau.");
    }
    handleCloseModal();
  };
  // note: lọc
  useEffect(() => {
    const filterCarsBySeats = () => {
      const seatsNumber = Number(selectedSeats) || 0;
      // Bắt đầu với kết quả gốc
      let filtered = searchResults;
      //note: Lọc theo seats
      if (seatsNumber) {
        filtered = filtered.filter((car) => car.seats === seatsNumber);
      }

      //note:Tiếp tục lọc theo transmission_type
      if (SelectedTranmission?.target?.value) {
        filtered = filtered.filter(
          (car) => car.transmission_type === SelectedTranmission.target.value
        );
      }

      //note: Tiếp tục lọc theo Brand
      if (SelectedBrand?.target?.value) {
        filtered = filtered.filter(
          (car) => car.brand?.brand_name === SelectedBrand.target.value
        );
      }

      // note: lọc theo giá min/max
      if (minPrice !== undefined && maxPrice !== undefined) {
        filtered = filtered.filter(
          (car) => car.rental_price >= minPrice && car.rental_price <= maxPrice
        );
      }

      // note: lọc theo năm
      filtered = filtered.filter((car) => {
        return Number(car.model) >= minYear && Number(car.model) <= maxYear;
      });

      setFilteredCars(filtered);
    };

    filterCarsBySeats();
  }, [
    searchResults,
    selectedSeats,
    SelectedTranmission,
    minPrice,
    maxPrice,
    SelectedBrand,
    minYear,
    maxYear,
  ]);

  return (
    <div>
      <div className="find-car">
        <Header></Header>{" "}
        <div
          className={`search-option ${isFixed ? "search-option-fixed" : ""}`}
        >
          <div className="search">
            <div className="search-form sd">
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
                  <div className="choose" onClick={handleToggleDatePicker}>
                    {" "}
                    <div className="time-date">
                      {" "}
                      {selectedTimes.nhanXe}, {formatDate(startDate)} -{" "}
                      {selectedTimes.traXe}, {formatDate(endDate)}{" "}
                    </div>
                  </div>
                </div>
                <div className="filter-container">
                  <div className="filter-dropdown">
                    <div
                      className="item-dropdown reset-item "
                      onClick={resetItem}
                    >
                      <div className="item-dropdown__wrap">
                        <div className="wrap-svg">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.39014 14.64L8.03014 12"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M5.39 14.64L2.75 12"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M18.6102 9.78027L15.9702 12.4203"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M18.6104 9.78027L21.2504 12.4203"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M18.6102 10.2803V15.7703C18.6102 17.3303 17.3402 18.6003 15.7802 18.6003H8.22021"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M5.39014 14.3101V8.22012C5.39014 6.66012 6.66014 5.39014 8.22014 5.39014H15.7701"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="slide-drop">
                      <Swiper
                        modules={[Virtual, Navigation, Pagination]}
                        onSwiper={setSwiperRef}
                        slidesPerView={3}
                        centeredSlides={false}
                        virtual
                      >
                        <SwiperSlide>
                          <div
                            className="item-dropdown "
                            onClick={handleToggleSeats}
                          >
                            <div className="item-dropdown__wrap">
                              <div className="wrap-svg">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M8.87 15.7197H14.77"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <p>Loại xe </p>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide>
                          <div
                            className="item-dropdown "
                            onClick={handleToggleBrand}
                          >
                            {" "}
                            <div className="item-dropdown__wrap">
                              <div className="wrap-svg">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21.25 11.9998C21.25 14.3198 20.39 16.4598 18.97 18.0698C17.55 19.6998 15.57 20.8298 13.33 21.1398C12.9 21.2098 12.46 21.2398 12 21.2398C11.54 21.2398 11.11 21.2098 10.67 21.1398C8.43 20.8298 6.45 19.6998 5.03 18.0698C3.61 16.4598 2.75 14.3198 2.75 11.9998C2.75 9.67977 3.61 7.53977 5.03 5.92977C6.45 4.29977 8.43 3.16977 10.67 2.85977C11.1 2.78977 11.54 2.75977 12 2.75977C12.46 2.75977 12.89 2.78977 13.33 2.85977C15.57 3.16977 17.55 4.29977 18.97 5.92977C20.39 7.53977 21.25 9.67977 21.25 11.9998Z"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M11.67 21.1496C11.03 20.4796 8 17.1696 8 11.9996C8 6.82961 11.03 3.51961 11.67 2.84961"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M12.33 21.1496C12.97 20.4796 16 17.1696 16 11.9996C16 6.82961 12.97 3.51961 12.33 2.84961"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M2.75 12H21.25"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <p>Hãng xe</p>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide>
                          <div
                            className="item-dropdown "
                            onClick={handleToggleTransmission_type}
                          >
                            <div className="item-dropdown__wrap">
                              <div className="wrap-svg">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="18"
                                    cy="6"
                                    r="1.5"
                                    stroke="black"
                                  ></circle>
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="1.5"
                                    stroke="black"
                                  ></circle>
                                  <circle
                                    cx="12"
                                    cy="6"
                                    r="1.5"
                                    stroke="black"
                                  ></circle>
                                  <circle
                                    cx="12"
                                    cy="18"
                                    r="1.5"
                                    stroke="black"
                                  ></circle>
                                  <circle
                                    cx="6"
                                    cy="6"
                                    r="1.5"
                                    stroke="black"
                                  ></circle>
                                  <path
                                    d="M7.57715 20V16H5.99902C5.69694 16 5.43913 16.054 5.22559 16.1621C5.01074 16.2689 4.84733 16.4206 4.73535 16.6172C4.62207 16.8125 4.56543 17.0423 4.56543 17.3066C4.56543 17.5723 4.62272 17.8008 4.7373 17.9922C4.85189 18.1823 5.0179 18.3281 5.23535 18.4297C5.4515 18.5312 5.71322 18.582 6.02051 18.582H7.07715V17.9023H6.15723C5.99577 17.9023 5.86165 17.8802 5.75488 17.8359C5.64811 17.7917 5.56868 17.7253 5.5166 17.6367C5.46322 17.5482 5.43652 17.4382 5.43652 17.3066C5.43652 17.1738 5.46322 17.0618 5.5166 16.9707C5.56868 16.8796 5.64876 16.8105 5.75684 16.7637C5.86361 16.7155 5.99837 16.6914 6.16113 16.6914H6.73145V20H7.57715ZM5.41699 18.1797L4.42285 20H5.35645L6.3291 18.1797H5.41699Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    d="M18 8V12M18 16V12M12 8V16M6 8V11.5C6 11.7761 6.22386 12 6.5 12H18"
                                    stroke="black"
                                    stroke-linecap="round"
                                  ></path>
                                </svg>
                              </div>
                              <p>Truyền động</p>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide>
                          <div
                            className="item-dropdown "
                            onClick={handleTogglePrice}
                          >
                            <div className="item-dropdown__wrap">
                              <div className="wrap-svg">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.7932 3.23242H14.1665"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M1.83325 3.23242H10.0532"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M11.4266 4.59305C12.185 4.59305 12.7999 3.98415 12.7999 3.23305C12.7999 2.48194 12.185 1.87305 11.4266 1.87305C10.6681 1.87305 10.0532 2.48194 10.0532 3.23305C10.0532 3.98415 10.6681 4.59305 11.4266 4.59305Z"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M12.7932 12.7656H14.1665"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M1.83325 12.7656H10.0532"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M11.4266 14.1263C12.185 14.1263 12.7999 13.5174 12.7999 12.7663C12.7999 12.0151 12.185 11.4062 11.4266 11.4062C10.6681 11.4062 10.0532 12.0151 10.0532 12.7663C10.0532 13.5174 10.6681 14.1263 11.4266 14.1263Z"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M5.94653 8H14.1665"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M1.83325 8H3.20658"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M4.57328 9.36063C5.33175 9.36063 5.94664 8.75173 5.94664 8.00063C5.94664 7.24952 5.33175 6.64062 4.57328 6.64062C3.81481 6.64062 3.19995 7.24952 3.19995 8.00063C3.19995 8.75173 3.81481 9.36063 4.57328 9.36063Z"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <p>Mức giá</p>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide>
                          <div
                            className="item-dropdown "
                            onClick={handleToggleModelCar}
                          >
                            <div className="item-dropdown__wrap">
                              <div className="wrap-svg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  style={{ marginRight: "8px" }}
                                >
                                  <path d="M4 9.5a.5.5 0 0 1 .5.5h7a.5.5 0 0 1 .5.5v.5H4v-.5a.5.5 0 0 1 .5-.5ZM4 8V7h8v1H4Z" />
                                  <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h9A1.5 1.5 0 0 1 14 5.5v4a.5.5 0 0 1-.5.5h-1v.5a1 1 0 0 1-1 1h-.5v.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-.5H4a1 1 0 0 1-1-1v-.5H2.5a.5.5 0 0 1-.5-.5v-4Zm11 0a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v3h10v-3ZM4 10h8v.5H4V10Z" />
                                </svg>
                              </div>
                              <p>Đời xe</p>
                            </div>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
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
                      onClick={handleSearch}
                    >
                      Tiếp tục
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showseats && (
          <div className="popup-overlay" onClick={() => setShowSeats(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="group-title d-flex">
                <h5>Loại xe</h5>
                <button
                  className="btn btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="line-page"> </div>
              <div className="modal-body">
                <div className="modal-confirm-body carfinding-options-body">
                  {" "}
                  <div className="vehicle-types">
                    {Object.keys(groupedCars).map((seats) => (
                      <div
                        className={`custom-checkbox-selected ${
                          selectedSeats === seats ? "selected" : ""
                        }`}
                        key={seats}
                        onClick={() => handleSelectSeats(seats)}
                      >
                        <input
                          type="checkbox"
                          id={`${seats}`}
                          value={seats}
                          checked={selectedSeats === seats}
                        />
                        <label className="none-label">
                          <div className="vehicle-types__item">
                            <div className="vehicle-types__item--img">
                              <img
                                loading="lazy"
                                src="https://n1-cstg.mioto.vn/m/vehicle-types/4-mini-v2.png"
                              />
                            </div>
                            <p className="name">
                              {seats} chỗ <span>(Mini)</span>
                            </p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="wrap-btn">
                  <a
                    className="btn btn-primary btn--m"
                    onClick={handleCloseModal}
                  >
                    Áp dụng
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {showtransmission_type && (
          <div
            className="popup-overlay"
            onClick={() => setshowtransmission_type(false)}
          >
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="group-title d-flex">
                <h5>Truyền động</h5>
                <button
                  className="btn btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="line-page"> </div>
              <div className="modal-body">
                <div className="modal-confirm-body carfinding-options-body">
                  <div className="transmission">
                    {Object.keys(groupCarsByTranmission).map(
                      (transmission_type) => (
                        <div
                          className="custom-radio"
                          onClick={handleSelectTranmission}
                        >
                          <input
                            type="radio"
                            id={`${transmission_type}`}
                            name="checkbox-trans"
                            value={transmission_type}
                          />
                          <label htmlFor={`${transmission_type}`}>
                            {transmission_type}{" "}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="wrap-btn">
                  <a
                    className="btn btn-primary btn--m"
                    onClick={handleCloseModal}
                  >
                    Áp dụng
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {show_price && (
          <div className="popup-overlay" onClick={() => setshow_price(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="group-title d-flex">
                <h5>Mức giá</h5>
                <button
                  className="btn btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="line-page"> </div>
              <div className="modal-body">
                <div className="advanced-filter__item">
                  <p className="title">Mức giá</p>
                  <div className="range-slider space">
                    {" "}
                    <Box sx={{ width: 600 }}>
                      {/* controlled: */}
                      <Slider
                        value={[minPrice, maxPrice]}
                        onChange={handleChangePrice}
                        min={300000}
                        max={3000000}
                        valueLabelFormat={(value) =>
                          `${value.toLocaleString()}`
                        }
                      />
                    </Box>
                  </div>
                  <div className="range-value two-item">
                    <div className="range-value__item">
                      <span>Giá thấp nhất</span>
                      <p> {minPrice.toLocaleString()} </p>
                    </div>
                    <div className="line"></div>
                    <div className="range-value__item">
                      <span>Giá cao nhất</span>
                      <p> {maxPrice.toLocaleString()} </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="wrap-btn">
                  <a
                    className="btn btn-primary btn--m"
                    onClick={handleCloseModal}
                  >
                    Áp dụng
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {showBrand && (
          <div className="popup-overlay" onClick={() => setshowBrand(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="group-title d-flex">
                <h5>Hãng xe</h5>
                <button
                  className="btn btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="line-page"> </div>
              <div className="modal-body">
                <div className="modal-confirm-body carfinding-options-body">
                  {" "}
                  <div className="vehicle-makes">
                    {Object.keys(groupCarsByBrand).map((brand) => (
                      <div className="custom-radio" onClick={handleSelectBrand}>
                        <input
                          type="radio"
                          id={`${brand}`}
                          name="r_vMakepc"
                          value={brand}
                        />
                        <label htmlFor={`${brand}`}>
                          <img
                            loading="lazy"
                            src={`https://api.thuexetulai.online/brand_logo/${brand}.png`}
                            alt=" "
                          />
                          <p>
                            {brand}{" "}
                            <span className="note">
                              {" "}
                              ({groupCarsByBrand[brand].length} xe)
                            </span>
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="wrap-btn">
                  <a
                    className="btn btn-primary btn--m"
                    onClick={handleCloseModal}
                  >
                    Áp dụng
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModelCar && (
          <div className="popup-overlay" onClick={() => setshowModelCar(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="group-title d-flex">
                <h5>Đời xe</h5>
                <button
                  className="btn btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="line-page"> </div>
              <div className="modal-body">
                <div className="advanced-filter__item">
                  <p className="title">Theo năm</p>
                  <div className="range-slider space">
                    {" "}
                    <Box sx={{ width: 600 }}>
                      {/* controlled: */}
                      <Slider
                        value={[minYear, maxYear]}
                        onChange={handleChangeYears}
                        min={2000}
                        max={2024}
                        valueLabelFormat={(value) => `${value}`}
                      />
                    </Box>
                  </div>
                  <div className="range-value two-item">
                    <div className="range-value__item">
                      <span>Tối thiểu</span>
                      <p> {minYear} </p>
                    </div>
                    <div className="line"></div>
                    <div className="range-value__item">
                      <span>tối đa</span>
                      <p> {maxYear} </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="wrap-btn">
                  <a className="btn btn-primary btn--m">Áp dụng</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="container" style={{ margin: "10rem 0 2rem 0" }}>
          <div className="col4-mg20">
            {(searchResults.length > 0
              ? filteredCars
              : selectedSeats.length > 0
            ).map((car) => (
              <div className="item item-car" key={car.car_id}>
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
                  <div className="decs-car">
                    <div className="desc-tag">
                      <span className="tag-item transmission">Số tự động</span>
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
