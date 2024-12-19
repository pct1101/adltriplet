import React, { useEffect, useState } from "react";
import "../../../css/index/payment.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Next_step from "../event/next_step";
import { useBooking } from "../../Private/bookingContext";
import dayjs from "dayjs";
import { useAuth } from "../../Private/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingId, getUserProfile } from "../../../lib/Axiosintance.js";
import { payment } from "../../../lib/Axiosintance.js";
import { API_URL_IMG } from "../../../lib/Axiosintance.js";

export default function Payment_booking() {
  const [userData, setUserData] = useState(null);
  const { booking_id } = useParams();
  console.log("booking_id", booking_id);

  const [bookingData, setBookingData] = useState();
  console.log(bookingData);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await getBookingId(booking_id);
        // Gửi request để lấy thông tin chi tiết booking
        console.log(response);
        setBookingData(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (booking_id) {
      fetchBookingDetails();
    }
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
      total_cost_after_voucher: bookingData.total_cost_after_voucher,
    };
    console.log("Payment data:", paymentData);
    try {
      const response = await payment(booking_id, paymentData);
      console.log("Payment response:", response);

      if (response?.data) {
        const paymentUrl = response.data;
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
    startDate,
    endDate,
    selectedTimes,
    selectedProvince,
    selectedDistrict,
  } = useBooking();

  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end - start;
    const totalDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); //note: Số ngày giữa hai ngày
    return totalDays > 0 ? totalDays : 0;
  };

  const totalDays = calculateTotalDays(startDate, endDate);

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
  const formatRevenue = (bookingData) => {
    return bookingData.toLocaleString("vi-VN"); // Định dạng số theo chuẩn Việt Nam
  };
  const formattedRevenue = formatRevenue(
    Number(bookingData?.total_cost_after_voucher)
  );

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
                    value={bookingData?.city}
                  />{" "}
                </div>
                <div className="inputBox">
                  <span>Địa chỉ nhận xe :</span>
                  <input
                    type="text"
                    name="txt_inv_addr1"
                    value={bookingData?.address}
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
                          src={
                            bookingData &&
                            bookingData.car &&
                            bookingData.car.car_image
                              ? `${API_URL_IMG}/${bookingData.car.car_image}`
                              : "path/to/default_image.jpg"
                          }
                          alt="Car"
                        />
                      </div>
                    </div>
                  </a>
                  <div className="desc-car">
                    <div className="desc-name">
                      <p> {bookingData?.car?.car_name} </p>
                    </div>
                    <div className="days">
                      <div className="desc-days">
                        <div className="form-item">
                          <label>nhận xe </label>
                          <div className="wrap-date-time">
                            <div className="wrap-date">
                              <span className="value">
                                {bookingData?.start_date}
                              </span>{" "}
                            </div>
                            <div className="wrap-time">
                              <span className="value"></span>
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
                                {bookingData?.end_date}
                              </span>{" "}
                            </div>
                            <div className="wrap-time">
                              <span className="value"> </span>
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
                      <span> {formattedRevenue} </span>
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
