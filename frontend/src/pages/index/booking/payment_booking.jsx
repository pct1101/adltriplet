import React, { useEffect, useState } from "react";
import "../../../css/index/payment.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Next_step from "../event/next_step";
import { useBooking } from "../../Private/bookingContext";
import dayjs from "dayjs";

const formatDate = (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "");

export default function Payment_booking() {
  const { bookings, startDate, endDate, selectedTimes } = useBooking();
  console.log(bookings);

  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    console.log("Booking details in Payment_booking:", bookings);
  }, [bookings]);

  const calculateTotalDays = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    return endDate.diff(startDate, "day");
  };
  const totalDays = calculateTotalDays(startDate, endDate);
  const totalCost = bookings?.rental_price * totalDays;
  const formatPrice2 = (price) => {
    if (typeof price === "number") {
      return `${price.toLocaleString("vi-VN")}đ`;
    }
    return "0 VND"; // Hoặc trả về một giá trị khác nếu price không hợp lệ
  };
  return (
    <div>
      {" "}
      <Header></Header>
      <div className="container-background">
        <div className="form-group-payment">
          {" "}
          <form className="payment-form" action="">
            <div class="row">
              <div class="col">
                <h3 class="title">Thanh toán và hoàn tất</h3>
                <Next_step></Next_step>
                <div class="inputBox">
                  <span>Họ và tên :</span>
                  <input type="text" />
                </div>
                <div class="inputBox">
                  <span>Di động :</span>
                  <input type="number" />
                </div>
                <div class="inputBox">
                  <span>Email :</span>
                  <input type="email" />
                </div>
                <div class="inputBox">
                  <span>Thành phố :</span>
                  <input type="text" />
                </div>
                <div class="inputBox">
                  <span>Địa chỉ :</span>
                  <input type="text" />
                </div>
              </div>
            </div>

            <input type="submit" value="Xác nhận" class="submit-btn" />
          </form>
          <div className="left-user">
            <div className="content-item">
              <div className="title">
                <div className="title-edit">
                  <h5>thông tin xe thuê</h5>
                </div>
              </div>
              <div className="card-car row">
                <div className="item-box">
                  <a href="#">
                    <div className="img-car">
                      <div className="car-img">
                        <img
                          className="scale-img"
                          src={`/img/${bookings.car_image}`}
                          alt="Car"
                        />
                      </div>
                    </div>
                  </a>
                  <div className="desc-car">
                    <div className="desc-name">
                      <p>{bookings?.car_name}</p>
                    </div>
                    <div className="days">
                      <div className="desc-days">
                        <div className="form-item">
                          <label>nhận xe </label>
                          <div className="wrap-date-time">
                            <div className="wrap-date">
                              <span className="value">
                                {formatDate(startDate)}
                              </span>{" "}
                            </div>
                            <div className="wrap-time">
                              <span className="value">
                                {selectedTimes.nhanXe}
                              </span>
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
                                {formatDate(endDate)}
                              </span>{" "}
                            </div>
                            <div className="wrap-time">
                              <span className="value">
                                {" "}
                                {selectedTimes.traXe}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="total-price-car">
                      <h6> Tổng ngày :</h6>
                      <span>{totalDays} ngày</span>
                    </div>
                    <div className="total-price-car">
                      <h6> Tổng tiền :</h6>
                      <span> {formatPrice2(totalCost)} </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-payment">
              <div className="title">
                <div className="title-edit">
                  <h5>Phương thức thanh toán</h5>
                </div>
              </div>
              <div className="inputBox">
                {" "}
                <select
                  id="mySelect"
                  onChange={handleSelectChange}
                  value={selectedOption}
                >
                  {" "}
                  <option value="1">
                    Thanh toán trực tiếp {selectedOption === "1" && "✔"}
                  </option>{" "}
                  <option value="2">
                    Thanh toán qua VNPAY {selectedOption === "2" && "✔"}
                  </option>{" "}
                </select>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
