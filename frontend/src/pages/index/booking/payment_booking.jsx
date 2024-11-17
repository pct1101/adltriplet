import React, { useEffect, useState } from "react";
import "../../../css/index/payment.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Next_step from "../event/next_step";

function Payment_booking() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
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
                  <span>name on card :</span>
                  <input type="text" placeholder="mr. john deo" />
                </div>
                <div class="inputBox">
                  <span>credit card number :</span>
                  <input type="number" placeholder="1111-2222-3333-4444" />
                </div>
                <div class="inputBox">
                  <span>exp month :</span>
                  <input type="text" placeholder="january" />
                </div>

                <div class="flex">
                  <div class="inputBox">
                    <span>exp year :</span>
                    <input type="number" placeholder="2022" />
                  </div>
                  <div class="inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234" />
                  </div>
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
                          src={"/img/hyundai-1-anhchinh.jpg"}
                          alt="Car"
                        />
                      </div>
                    </div>
                  </a>
                  <div className="desc-car">
                    <div className="desc-name">
                      <p>Tên xe 1</p>
                    </div>
                    <div className="days">
                      <div className="desc-days">
                        {" "}
                        <label> Nhận xe :</label>
                        <span>19/1/2000</span>
                      </div>
                      <div className="desc-days">
                        {" "}
                        <label> Trả xe :</label>
                        <span>19/1/2004</span>
                      </div>
                    </div>
                    <div className="total-price-car">
                      <h6> Tổng tiền :</h6>
                      <span>6.000.000</span>
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

export default Payment_booking;
