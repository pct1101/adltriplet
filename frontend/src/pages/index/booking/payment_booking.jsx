import React, { useEffect, useState } from "react";
import "../../../css/index/payment.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Next_step from "../event/next_step";
import { useBooking } from "../../Private/bookingContext";
import dayjs from "dayjs";
import { useAuth } from "../../Private/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../../../lib/Axiosintance.js";
import { payment } from "../../../lib/Axiosintance.js";

const formatDate = (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "");
export default function Payment_booking() {
  const [userData, setUserData] = useState(null);
  const { booking_id } = useParams();
  console.log(booking_id);

  const [bookingData, setBookingData] = useState(null);

  // NOTE: get Booking_id
  useEffect(() => {
    const storedBookingId = localStorage.getItem("booking_id");
    setBookingData(storedBookingId);
  }, [booking_id]);

  // NOTE: handle post
  const handlePayment = async (event) => {
    event.preventDefault();
    const paymentData = {
      order_desc: "Thanh toan don hang " + booking_id,
      order_type: "billpayment",
      language: "vn",
      bank_code: "NCB",
      txtexpire: dayjs().add(1, "day").format("YYYYMMDDHHmmss"),
      txt_billing_mobile: userData?.phone,
      txt_billing_email: userData?.email,
      txt_billing_fullname: userData?.name,
      txt_inv_addr1: selectedDistrict ? selectedDistrict.label : "",
      txt_bill_city: selectedProvince ? selectedProvince.label : "",
      txt_inv_mobile: userData?.phone,
      txt_inv_email: userData?.email,
      txt_inv_customer: userData?.name,
      txt_inv_company: "ABC Co., Ltd",
      txt_inv_taxcode: "123456789",
      total_cost: totalCost * 100,
    };

    console.log("Payment data:", paymentData);
    try {
      const response = await payment(booking_id, paymentData);
      console.log("Payment response:", response);

      if (response?.data) {
        const paymentUrl = response.data;
        alert("Đang chuyển hướng tới cổng thanh toán...");
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Payment failed:", error);
      console.log("Error response:", error.response?.data);
      console.log("Error details:", error.response?.data || error.message);
      alert("Có lỗi xảy ra khi thực hiện thanh toán. Vui lòng thử lại sau.");
    }
  };

  // NOTE: get user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
      } catch (err) {
        console.log("Không thể tải thông tin người dùng");
      }
    };

    fetchData();
  }, []);

  const {
    bookings,
    startDate,
    endDate,
    selectedTimes,
    selectedProvince,
    selectedDistrict,
  } = useBooking();
  console.log(bookings);

  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

  // note: confirm user
  const { user } = useAuth();
  const apiToken = localStorage.getItem("remember_token");
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return;
  }
  if (!apiToken || apiToken.trim() === "") {
    console.error("Token không hợp lệ hoặc hết hạn.");
    //note: Có thể yêu cầu người dùng đăng nhập lại hoặc tự động làm mới token nếu đang dùng refresh token.
    return;
  }

  return (
    <div>
      {" "}
      <Header></Header>
      <div className="container-background">
        <div className="form-group-payment">
          {" "}
          <form className="payment-form" action="">
            <div className="row">
              <div className="col">
                <h1 className="title">Thông tin người dùng</h1>
                <Next_step></Next_step>
                <div className="inputBox">
                  <span>Họ và tên :</span>
                  <input
                    type="text"
                    value={userData?.name}
                    name="txt_inv_fullname"
                  />
                </div>
                <div className="inputBox">
                  <span>Di động :</span>
                  <input
                    type="number"
                    value={userData?.phone}
                    name="txt_inv_mobile"
                  />
                </div>
                <div className="inputBox">
                  <span>Email :</span>
                  <input
                    type="email"
                    name="txt_inv_email"
                    value={userData?.email}
                  />
                </div>
                <div className="inputBox">
                  <span>Thành phố :</span>
                  <input
                    type="text"
                    name="txt_inv_city"
                    value={selectedProvince ? selectedProvince.label : ""}
                  />{" "}
                </div>
                <div className="inputBox">
                  <span>Địa chỉ nhận xe :</span>
                  <input
                    type="text"
                    name="txt_inv_addr1"
                    value={selectedDistrict ? selectedDistrict.label : ""}
                  />
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="Xác nhận"
              className="submit-btn"
              onClick={handlePayment}
            />
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
                          src={`http://localhost:8000/storage/imgs/${bookings.car_image}`}
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
                <div className="custom-select">
                  {" "}
                  <select
                    id="mySelect"
                    onChange={handleSelectChange}
                    value={selectedOption}
                  >
                    {" "}
                    <option value="1">Thanh toán qua VNPAY</option>{" "}
                  </select>{" "}
                  <div className="select-icons">
                    {selectedOption === "1" && (
                      <img src="../upload/vnpay.png" alt="Selected" />
                    )}{" "}
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
