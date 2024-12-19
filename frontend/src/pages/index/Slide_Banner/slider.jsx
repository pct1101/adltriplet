import Carousel from "react-bootstrap/Carousel";
import "../../../css/index/slider.css";
import { useEffect, useState } from "react";
import { getAllCars, searchCars } from "../../../lib/Axiosintance";
// note:import data cho form booking
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useBooking } from "../../Private/bookingContext";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useNavigate } from "react-router-dom";

dayjs.locale("vi");
function Slider() {
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

  // note: formdate
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedTimes,
    setSelectedTimes,
  } = useBooking();

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

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
        setcars(response.data);
      } catch (error) {
        console.log("ko thể lấy đuộcxe", error);
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

  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const navigate = useNavigate();

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
  };

  return (
    <div className="banner-section" style={{ marginBottom: "-115px" }}>
      <div className="container-slider">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img src="/upload/slide 3.jpeg" alt="First slide" />
            <Carousel.Caption>
              <h3>Cùng Bạn Đến Mọi Hành Trình</h3>
              <hr />
              <p>
                Trải nghiệm sự khác biệt từ hơn 8000 xe gia đình đời mới khắp
                Việt Nam
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img src="/upload/slide 2.jpeg" alt="Second slide" />
            <Carousel.Caption>
              <h3>ADL TRIPBEL T</h3>
              <hr />
              <p>Hỗ trợ tận tình, giao xe tận nơi</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="/upload/slide 1.webp" alt="Third slide" />
            <Carousel.Caption>
              <h3>Siêu xe chất, ưu đãi 50% với các thành viên VIP</h3>
              <hr />
              <p>
                Dành tặng 50 combo ưu đã đầu tiên cho khách hàng đặt xe sớm nhất
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="search-option">
        <div className="search">
          <div className="search-form sd">
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
            <a className="btn btn-primary" target="" onClick={handleSearch}>
              Tìm Xe
            </a>
          </div>
        </div>
      </div>
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
                  Quý khách hàng lưu ý: Trung tâm sẽ hỗ trợ nhận xe và trả xe
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
    </div>
  );
}

export default Slider;
